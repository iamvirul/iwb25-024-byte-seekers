import backend.common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/http;
import ballerina/jwt;
import ballerina/persist;
import ballerina/sql;

http:JwtValidatorConfig legalOfficerValidator = {
    issuer: "byteseekers",
    audience: Utils:LEGAL_OFFICER,
    signatureConfig: {certFile: "resources/certificates/public.crt"}
};

http:ListenerJwtAuthHandler legalOfficerHandler = new (legalOfficerValidator);

listener http:Listener legalOfficerMicroservice = new (9092);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    }
}

service /legal_officer on legalOfficerMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get getDisputes/[int id](@http:Header string Authorization) returns error|http:Response {
        http:Response response = new;
        jwt:Payload|http:Unauthorized authn = legalOfficerHandler.authenticate(Authorization);
        if authn is http:Unauthorized {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, Utils:UNAUTHORIZED_REQUEST);
            return response;
        }
        if id <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_LEGAL_OFFICER_ID);
            return response;
        }
        common:LegalOfficer|persist:Error legalOfficerResult = self.dbClient->/legalofficers/[id](common:LegalOfficer);
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
        common:Dispute[] disputes = [];
        sql:ParameterizedQuery query = `legal_officer_id = ${id}`;
        stream<common:Dispute, persist:Error?> disputeResult = self.dbClient->/disputes(common:Dispute,query);

        check from var dispute in disputeResult
            do {
                disputes.push(dispute);
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

}
