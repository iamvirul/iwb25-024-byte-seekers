import backend.common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/http;
import ballerina/persist;
import ballerina/time;

listener http:Listener landOwnerMicroservice = new (9098);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    },
    auth: [{
            jwtValidatorConfig: {
                issuer: "byteseekers",
                audience: Utils:LAND_OWNER,
                signatureConfig: {
                    certFile: "resources/certificates/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OWNER]
        }]
}

service /land_owner on landOwnerMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get getLegelOfficers() returns error|http:Response {
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

    resource function post createDispute(@http:Payload common:RequestDispute requestDispute) returns http:Response|error {
        http:Response response = new;
        common:ValidationResult validateLandInsert = Utils:validateDisputeInsert(requestDispute);
        if !validateLandInsert.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLandInsert.errors);
            return response;
        }

        string caseId = Utils:getUniqueIDByCurrentTime();
        
        common:Land|persist:Error landResult = self.dbClient->/lands/[requestDispute.landsId](common:Land);
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
        common:LegalOfficer|persist:Error legalOfficerResult = self.dbClient->/legalofficers/[requestDispute.legalOfficerId](common:LegalOfficer);
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
        DB:DisputeInsert disputeInsert = {
            witnessName: requestDispute.witnessName,
            disputesDetails: requestDispute.disputesDetails,
            landsId: requestDispute.landsId,
            legalOfficerId: requestDispute.legalOfficerId,
            status: DB:PENDING,
            caseId: caseId,
            estimateTime: "",
            createdAt: time:utcNow()
        };
        int[]|persist:Error disputeResult = self.dbClient->/disputes.post([disputeInsert]);
        if disputeResult is persist:Error {
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, Utils:FAILED_TO_REGISTER_LAND);
            return response;
        }
        response.statusCode = 201;
        response = Utils:setSuccessResponse(response, {
            "message": Utils:LAND_INSERT_SUCCESS,
            "case_id": disputeInsert.caseId
        });
        return response;
    }
}
