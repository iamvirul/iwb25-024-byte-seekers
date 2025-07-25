import backend.common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/http;
import ballerina/persist;


listener http:Listener landMicroservice = new (9095);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    },
    auth: [{
            jwtValidatorConfig: {
                issuer: "byteseekers",
                audience: Utils:LAND_OFFICER,
                signatureConfig: {
                    certFile: "resources/certificates/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OFFICER]
        }]
}

service /land on landMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function post register(@http:Payload DB:LandInsert landInsert) returns http:Response|error|http:Unauthorized {
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

    resource function get getAllLands() returns error|http:Response {
        http:Response response = new;
        common:Land[] lands = [];
        stream<common:Land, persist:Error?> landsResult = self.dbClient->/lands(common:Land);

        check from var land in landsResult
            do {
                lands.push(land);
            };
        check landsResult.close();
        if lands.length() == 0 {
            response.statusCode = 404;
            response = Utils:setErrorResponse(response, Utils:NO_LANDS_FOUND);
        } else {
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"lands": lands.toJson()});
        }
        return response;
    }

    resource function get getLandById/[int id]() returns error|http:Response {
        http:Response response = new;
        if id <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_LAND_ID);
            return response;
        }
        common:Land|persist:Error landResult = self.dbClient->/lands/[id](common:Land);

        if landResult is persist:Error {
            if landResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:LAND_NOT_FOUND);
            } else {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LANDS);
            }
            return response;
        }
        common:Land land = landResult;
        response.statusCode = 200;
        response = Utils:setSuccessResponse(
                response,
                {
                    "land": land.toJson()
                });
        return response;
    }
}
