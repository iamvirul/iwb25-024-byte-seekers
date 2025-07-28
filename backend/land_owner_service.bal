import backend.common;
import backend.db as DB;
import backend.mappers as Mappers;
import backend.rabbitmq as RabbitMQ;
import backend.utils as Utils;
import backend.interceptors as Interceptors;

import ballerina/http;
import ballerina/jwt;
import ballerina/persist;
import ballerina/regex;

listener http:Listener landOwnerMicroservice = new (9098);

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
                audience: Utils:LAND_OWNER,
                signatureConfig: {
                    certFile: "resources/certificates/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OWNER]
        }
    ]
}

service http:InterceptableService /land_owner on landOwnerMicroservice {
    private final DB:Client dbClient;

    public function createInterceptors() returns http:Interceptor|http:Interceptor[] {
        return new Interceptors:RequestInterceptor();
    }

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get legal_officers() returns error|http:Response {
        http:Response response = new;
        common:LegalOfficer[] legalOfficers = [];
        stream<common:LegalOfficer, persist:Error?> legalOfficerResult = self.dbClient->/legalofficers(common:LegalOfficer);

        check from var legalOfficer in legalOfficerResult
            do {
                legalOfficers.push(legalOfficer);
            };
        check legalOfficerResult.close();
        if legalOfficers.length() == 0 {
            response.statusCode = 404;
            response = Utils:setErrorResponse(response, Utils:NO_LANDS_FOUND);
        } else {
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"legal_officers": legalOfficers.toJson()});
        }
        return response;
    }

    resource function post dispute/add(http:Request req, @http:Header string Authorization) returns http:Response|error {
        http:Response response = new;
        string token = regex:replace(Authorization, "Bearer ", "");
        [jwt:Header, jwt:Payload]|jwt:Error validateToken = Utils:validateToken(token);
        if validateToken is jwt:Error {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid token");
            return response;
        }
        string? email = validateToken[1].sub;
        if req.getContentType().startsWith("multipart/form-data") {
            //parse multipart form data
            common:DisputeForm|error parsed = Utils:parseDisputeMultipartFormData(req.getBodyParts());
            if parsed is error {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, Utils:INVALID_MULTIPART_REQUEST);
                return response;
            }
            //validate parsed data
            common:ValidationResult validateDispute = Utils:validateDisputeFormData(parsed);
            if !validateDispute.isValid {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, validateDispute.errors);
                return response;
            }
            string caseId = Utils:getUniqueIDByCurrentTime();
            //check if land and legal officer exist
            common:Land|persist:Error landResult = self.dbClient->/lands/[parsed.landsId](common:Land);
            if landResult is persist:Error {
                if landResult is persist:NotFoundError {
                    response.statusCode = 404;
                    response = Utils:setErrorResponse(response, Utils:LAND_NOT_FOUND);
                } else {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LAND);
                }
                return response;
            }
            //check if legal officer exists
            common:LegalOfficer|persist:Error legalOfficerResult = self.dbClient->/legalofficers/[parsed.legalOfficerId](common:LegalOfficer);
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
            DB:User|persist:Error userResult = self.dbClient->/users/[parsed.userId](DB:User);
            if userResult is persist:Error {
                if userResult is persist:NotFoundError {
                    response.statusCode = 404;
                    response = Utils:setErrorResponse(response, Utils:USER_NOT_FOUND);
                } else {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_USER);
                }
                return response;
            }
            if userResult.email != email {
                response.statusCode = 401;
                response = Utils:setErrorResponse(response, Utils:INVALID_USER_ID);
                return response;
            }

            DB:DisputeInsert disputeInsert = Mappers:disputeInsertMapper(parsed, caseId);
            common:DisputeMessage disputeMessage = {disputeInsert, documents: parsed.documents};
            //publish dispute message to RabbitMQ
            error? publishDisputeMessageResult = RabbitMQ:publishDisputeMessage(disputeMessage);
            if publishDisputeMessageResult is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, Utils:FAILED_TO_QUEUE_DISPUTE);
                return response;
            }
            response.statusCode = 201;
            response = Utils:setSuccessResponse(response, {"message": "Dispute added successfully", "case_id": disputeInsert.caseId});
            return response;
        }
        else {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_CONTENT_TYPE);
            return response;
        }
    }

    resource function get disputes/[int userId]()  returns error|http:Response{
        http:Response response = new;
        common:UserDisputesWithDocs[] disputes = [];
        DB:DisputeDocument[] tempDocs = [];
        DB:DisputeComment[] tempComments = [];
        stream<DB:Dispute, persist:Error?> disputeResult = self.dbClient->/disputes(DB:Dispute, `users_id = ${userId}`);
        check from var dispute in disputeResult
            do {
                tempDocs = [];
                stream<DB:DisputeDocument, persist:Error?> disputeDoc = self.dbClient->/disputedocuments(DB:DisputeDocument, `disputes_id = ${dispute.id}`);
                check from var disDoc in disputeDoc
                    do {
                        tempDocs.push(disDoc);
                    };
                check disputeDoc.close();

                tempComments = [];
                stream<DB:DisputeComment, persist:Error?> disputeComment = self.dbClient->/disputecomments(DB:DisputeComment, `disputes_id = ${dispute.id}`);
                check from var disComment in disputeComment
                    do {
                        tempComments.push(disComment);
                    };
                check disputeComment.close();

                DB:Land|persist:Error landResult = self.dbClient->/lands/[dispute.landsId](DB:Land);
                if landResult is persist:Error {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LAND);
                    return response;
                }
                DB:Land land = landResult;
                DB:User|persist:Error userResult = self.dbClient->/users/[dispute.usersId](DB:User);
                if userResult is persist:Error {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_USER);
                    return response;
                }

                common:LegalPrecedentWithLegalClauses[] legalPrecedent = [];
                stream<DB:LegalPrecedent, persist:Error?> legalPrecedentResult = self.dbClient->/legalprecedents(DB:LegalPrecedent, `disputes_id = ${dispute.id}`);
                check from var legalPrecedentIn in legalPrecedentResult
                    do {
                        DB:LegalClause[] legalClauses = [];
                        stream<DB:LegalClause, persist:Error?> legalClauseResult = self.dbClient->/legalclauses(DB:LegalClause, `legal_precedents_id = ${legalPrecedentIn.id}`);
                        check from var legalClause in legalClauseResult
                            do {
                                legalClauses.push(legalClause);
                            };
                        check legalClauseResult.close();
                        legalPrecedent.push({
                            id: legalPrecedentIn.id,
                            year: legalPrecedentIn.year,
                            headline: legalPrecedentIn.headline,
                            court: legalPrecedentIn.court,
                            decision: legalPrecedentIn.decision,
                            summary: legalPrecedentIn.summary,
                            disputesId: legalPrecedentIn.disputesId,
                            legalClauses: legalClauses
                        });
                    };
                check legalPrecedentResult.close();

                disputes.push({
                    dispute: dispute,
                    documents: tempDocs,
                    land: land,
                    user: userResult.firstName + " " + userResult.lastName,
                    comments: tempComments,
                    legalPrecedent: legalPrecedent
                });
            };
        check disputeResult.close();
        if disputes.length() == 0 {
            response.statusCode = 404;
            response = Utils:setErrorResponse(response, Utils:NO_DISPUTES_FOUND);
            return response;
        } else {
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"disputes": disputes.toJson()});
            return response;
        }
    }
}

