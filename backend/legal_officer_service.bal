import backend.common;
import backend.db as DB;
import backend.interceptors as Interceptors;
import backend.mappers as Mapper;
import backend.rabbitmq as RabbitMQ;
import backend.utils as Utils;

import ballerina/http;
// import ballerina/jwt;
import ballerina/persist;
// import ballerina/regex;
import ballerina/sql;
import ballerina/time;

listener http:Listener legalOfficerMicroservice = new (9080);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    },
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "byteseekers",
                audience: Utils:LEGAL_OFFICER,
                signatureConfig: {
                    certFile: "resources/certificates/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LEGAL_OFFICER]
        }
    ]
}

service http:InterceptableService /legal_officer on legalOfficerMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    public function createInterceptors() returns Interceptors:RequestInterceptor {
        return new Interceptors:RequestInterceptor();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get data/[int legalOfficerId]() returns error|http:Response {
        http:Response response = new;
        if legalOfficerId <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_LEGAL_OFFICER_ID);
            return response;
        }
        common:LegalOfficer|persist:Error legalOfficerResult = self.dbClient->/legalofficers/[legalOfficerId].get(common:LegalOfficer);
        if legalOfficerResult is persist:Error {
            if legalOfficerResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:LEGAL_OFFICER_NOT_FOUND);
            } else {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LEGAL_OFFICER);
            }
            return response;
        }
        DB:DisputeWithRelations[] disputes = [];
        DB:LegalPrecedentWithRelations[] precedents = [];
        sql:ParameterizedQuery query = `legalOfficerId = ${legalOfficerId}`;
        stream<DB:DisputeWithRelations, persist:Error?> disputeResult = self.dbClient->/disputes(DB:DisputeWithRelations, query);
        check from var result in disputeResult
            do {
                stream<DB:LegalPrecedentWithRelations, persist:Error?> precedentResult = self.dbClient->/legalprecedents(DB:LegalPrecedentWithRelations, `disputesId = ${result.id}`);
                check from var precedent in precedentResult
                    do {
                        precedents.push(precedent);
                    };
                check precedentResult.close();
                disputes.push(result);
            };
        check disputeResult.close();

        stream<common:CountResult, persist:Error?> pendingResultStream = self.dbClient->queryNativeSQL(`SELECT COUNT(*) AS total FROM disputes WHERE legalOfficerId = ${legalOfficerId} AND status = 'PENDING'`, common:CountResult);
        stream<common:CountResult, persist:Error?> rejectedResultStream = self.dbClient->queryNativeSQL(`SELECT COUNT(*) AS total FROM disputes WHERE legalOfficerId = ${legalOfficerId} AND status = 'REJECTED'`, common:CountResult);
        stream<common:CountResult, persist:Error?> resolvedResultStream = self.dbClient->queryNativeSQL(`SELECT COUNT(*) AS total FROM disputes WHERE legalOfficerId = ${legalOfficerId} AND status = 'RESOLVED'`, common:CountResult);
        stream<common:CountResult, persist:Error?> lpResultStream = self.dbClient->queryNativeSQL(`SELECT COUNT(*) AS total FROM legal_precedents lp JOIN disputes d ON lp.disputesId = d.id WHERE d.legalOfficerId = ${legalOfficerId}`, common:CountResult);

        record {|common:CountResult value;|}? pendingResult = check pendingResultStream.next();
        _ = check pendingResultStream.close();
        record {|common:CountResult value;|}? rejectedResult = check rejectedResultStream.next();
        _ = check rejectedResultStream.close();
        record {|common:CountResult value;|}? resolvedResult = check resolvedResultStream.next();
        _ = check resolvedResultStream.close();
        record {|common:CountResult value;|}? lpResult = check lpResultStream.next();
        _ = check lpResultStream.close();

        if pendingResult is record {|common:CountResult value;|} && rejectedResult is record {|common:CountResult value;|} && resolvedResult is record {|common:CountResult value;|} && lpResult is record {|common:CountResult value;|} {
            common:LegalOfficerStats stats = {pending: pendingResult.value.total, rejected: rejectedResult.value.total, resolved: resolvedResult.value.total, legalPrecedents: lpResult.value.total};
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"precedents": precedents.toJson(), "disputes": disputes.toJson(), "stats": stats.toJson()});
        } else {
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_STATS);
        }
        return response;
    }

    resource function post dispute/estimate_time/add(common:UpdateDisputeEstimateTime updateRequest) returns error|http:Response {
        http:Response response = new;
        common:ValidationResult validateLandInsert = Utils:validateDisputeEstimateTime(updateRequest);
        if !validateLandInsert.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLandInsert.errors);
            return response;
        }
        sql:ParameterizedQuery query = `caseId = ${updateRequest.caseId}`;
        stream<DB:Dispute, persist:Error?> disputeStream = self.dbClient->/disputes(DB:Dispute, query);
        check from var dispute in disputeStream
            do {
                error? publishDisputeEstimateTimeMessage = RabbitMQ:publishDisputeEstimateTimeMessage({dispute: dispute, estimateTime: updateRequest.estimateTime});
                if publishDisputeEstimateTimeMessage is error {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, {"message": Utils:FAILED_TO_QUEUE_DISPUTE_ESTIMATE_TIME});
                    return response;
                }
                response.statusCode = 200;
                response = Utils:setSuccessResponse(response, {"message": Utils:DISPUTE_ESTIMATE_TIME_UPDATED});
                return response;
            };
        check disputeStream.close();
        response.statusCode = 404;
        response = Utils:setErrorResponse(response, Utils:INVALID_CASE_ID);
        return response;
    }

    resource function post comment/add(common:RequestDsiputeComment updateRequest) returns error|http:Response {
        http:Response response = new;
        common:ValidationResult validateLandInsert = Utils:validateDisputeComment(updateRequest);
        if !validateLandInsert.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLandInsert.errors);
            return response;
        }

        sql:ParameterizedQuery query = `caseId = ${updateRequest.caseId}`;
        stream<DB:Dispute, persist:Error?> disputeStream = self.dbClient->/disputes(DB:Dispute, query);
        check from var dispute in disputeStream
            do {
                DB:DisputeCommentInsert disputeComment = {
                    comment: updateRequest.comment,
                    createdAt: time:utcNow(),
                    disputesId: dispute.id
                };
                error? publishDisputeCommentMessage = RabbitMQ:publishDisputeCommentMessage({dispute: disputeComment, retryCount: 0});
                if publishDisputeCommentMessage is error {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, {"message": Utils:FAILED_TO_QUEUE_DISPUTE_COMMENT});
                    return response;
                }
                response.statusCode = 200;
                response = Utils:setSuccessResponse(response, {"message": "Comment added successfully"});
                return response;
            };
        check disputeStream.close();
        response.statusCode = 404;
        response = Utils:setErrorResponse(response, Utils:INVALID_CASE_ID);
        return response;
    }

    resource function post precedents/add(common:RequestPrecedent requestPrecedent) returns error|http:Response {
        http:Response response = new;
        common:ValidationResult validateLandInsert = Utils:validateLegalPrecedent(requestPrecedent);
        if !validateLandInsert.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLandInsert.errors);
            return response;
        }
        sql:ParameterizedQuery query = `caseId = ${requestPrecedent.caseId}`;
        stream<DB:Dispute, persist:Error?> disputeStream = self.dbClient->/disputes(DB:Dispute, query);
        DB:Dispute? dispute = ();
        var result = check disputeStream.next();
        _ = check disputeStream.close();
        if result is record {|DB:Dispute value;|} {
            dispute = result.value;
        }
        if dispute is DB:Dispute {
            DB:LegalPrecedentInsert|error precedentInsert = Mapper:legalPrecedentInsertMapper(requestPrecedent, dispute);
            if precedentInsert is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, Utils:FAILED_TO_ADD_PRECEDENT);
                return response;
            }
            error? publishLegalPrecedentMessage = RabbitMQ:publishLegalPrecedentMessage({legalPrecedent: precedentInsert, legalClauses: requestPrecedent.legalClauses});
            if publishLegalPrecedentMessage is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, {"message": Utils:FAILED_TO_QUEUE_PRECEDENT});
                return response;
            }
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"message": "Precedent added successfully"});
            return response;
        } else {
            response.statusCode = 404;
            response = Utils:setErrorResponse(response, Utils:INVALID_CASE_ID);
            return response;
        }
    }
}
