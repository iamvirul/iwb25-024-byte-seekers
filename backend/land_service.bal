import ballerina/http;
import backend.db as DB;
import backend.common;
import ballerina/persist;
import backend.utils as Utils;
import ballerina/jwt;

http:JwtValidatorConfig landOwnerValidator = {
    issuer: "byteseekers",
    audience: Utils:LAND_OFFICER,
    signatureConfig: {certFile: "resources/certificates/public.crt"}
};

http:ListenerJwtAuthHandler landOfficerHandler = new (landOwnerValidator);

listener http:Listener landMicroservice = new (9095);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    }
}

service /land on landMicroservice {
     private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function post register(@http:Payload DB:LandInsert landInsert , @http:Header string Authorization) returns http:Response|error | http:Unauthorized {
        jwt:Payload|http:Unauthorized authn = landOfficerHandler.authenticate(Authorization);
        if authn is http:Unauthorized {
            return authn;
        }
        landInsert.landId = Utils:generateShortId();
        http:Response response = new;
        common:ValidationResult validateLandInsert = Utils:validateLandInsert(landInsert);
        if !validateLandInsert.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLandInsert.errors);
            return response;
        }
        int[]|persist:Error unionResult = self.dbClient->/lands.post([landInsert]);
        if unionResult is persist:Error {
            if unionResult is persist:AlreadyExistsError {
                response.statusCode = 409;
                response = Utils:setErrorResponse(response, Utils:LAND_ALREADY_EXISTS);
            } 
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, Utils:FAILED_TO_REGISTER_LAND);
        }
        if unionResult is int[] {
            response.statusCode = 201;
            response = Utils:setSuccessResponse(response, {"landId": unionResult[0]});
        }
        return response;
    }
}