import backend.common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/http;
// import ballerina/io;
import ballerina/persist;
import ballerina/sql;

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

service /legal_officer on legalOfficerMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get disputes/[int id]() returns error|http:Response {
        http:Response response = new;
        if id <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_LEGAL_OFFICER_ID);
            return response;
        }
        common:LegalOfficer|persist:Error legalOfficerResult = self.dbClient->/legalofficers/[id].get(common:LegalOfficer);
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
        common:DisputeWithDocs[] disputes = [];
        DB:DisputeDocument[] tempDocs = [];
        sql:ParameterizedQuery query = `legal_officer_id = ${id}`;
        stream<DB:Dispute, persist:Error?> disputeResult = self.dbClient->/disputes(DB:Dispute, query);
        check from var dispute in disputeResult
            do {
                tempDocs = [];
                sql:ParameterizedQuery docQuery = `disputes_id = ${dispute.id}`;
                stream<DB:DisputeDocument, persist:Error?> disputeDoc = self.dbClient->/disputedocuments(DB:DisputeDocument, docQuery);
                check from var disDoc in disputeDoc
                    do {
                        tempDocs.push(disDoc);
                    };
                check disputeDoc.close();

                DB:Land|persist:Error landResult = self.dbClient->/lands/[dispute.landsId].get(DB:Land);
                if landResult is persist:Error {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LAND);
                    return response;
                }
                DB:Land land = landResult;

                sql:ParameterizedQuery transferQuery = `lands_id = ${dispute.landsId} ORDER BY transferDate DESC LIMIT 1`;
                stream<common:LandTransferChain, persist:Error?> transferResult = self.dbClient->/landtransferchains(common:LandTransferChain, transferQuery);
                common:LandTransferChain? latestTransfer = ();
                check from var transfer in transferResult
                    do {
                        latestTransfer = transfer;
                    };
                check transferResult.close();

                DB:LandOwner? currentOwner = ();
                if latestTransfer is DB:LandTransferChain {
                    DB:LandOwner|persist:Error ownerResult = self.dbClient->/landowners/[latestTransfer.toLandOwnersId].get(DB:LandOwner);
                    if ownerResult is DB:LandOwner {
                        currentOwner = ownerResult;
                    }
                }

                disputes.push({
                    dispute: dispute,
                    documents: tempDocs,
                    land: land,
                    currentOwner: currentOwner
                });
            };
        check disputeResult.close();
        if disputes.length() == 0 {
            response.statusCode = 404;
            response = Utils:setErrorResponse(response, Utils:NO_LANDS_FOUND);
        } else {
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"disputes": disputes.toJson()});
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
        sql:ParameterizedQuery query = `case_id = ${updateRequest.caseId}`;
        stream<DB:Dispute, persist:Error?> disputeStream = self.dbClient->/disputes(DB:Dispute, query);

        check from var dispute in disputeStream
            do {
                DB:DisputeUpdate updateDispute = {
                    estimateTime: updateRequest.estimateTime
                };
                DB:Dispute|persist:Error updateResult = self.dbClient->/disputes/[dispute.id].put(updateDispute);
                if updateResult is persist:Error {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_UPDATE_DISPUTE);
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

}
