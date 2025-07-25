import backend.common as Common;
import backend.db as DB;
import backend.utils as Utils;
import backend.mappers as Mappers;

import ballerina/http;
import ballerina/persist;

listener http:Listener landMicroservice = new (9095);

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
                audience: Utils:LAND_OFFICER,
                signatureConfig: {
                    certFile: "resources/certificates/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OFFICER]
        }
    ]
}

service /land_officer on landMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function post land/register(@http:Payload Common:LandCreate requestLandInsert ) returns http:Response|error|http:Unauthorized {
        requestLandInsert.landId = Utils:generateShortId();
        http:Response response = new;
        DB:LandInsert landInsert = Mappers:landInsertMapper(requestLandInsert);
        Common:ValidationResult validateLandInsert = Utils:validateLandInsert(landInsert);
        if !validateLandInsert.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLandInsert.errors);
            return response;
        }
        transaction {
            int[]|persist:Error unionResult = self.dbClient->/lands.post([landInsert]);
            if unionResult is persist:Error {
                if unionResult is persist:AlreadyExistsError {
                    response.statusCode = 409;
                    response = Utils:setErrorResponse(response, Utils:LAND_ALREADY_EXISTS);
                }
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, Utils:FAILED_TO_REGISTER_LAND);
            }
            check commit;
        }
        return response;
    }

    resource function get land/all() returns error|http:Response {
        http:Response response = new;
        Common:Land[] lands = [];
        stream<Common:Land, persist:Error?> landsResult = self.dbClient->/lands(Common:Land);

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

    resource function get land/[int id]() returns error|http:Response {
        http:Response response = new;
        if id <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_LAND_ID);
            return response;
        }
        Common:Land|persist:Error landResult = self.dbClient->/lands/[id](Common:Land);

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
        Common:Land land = landResult;
        response.statusCode = 200;
        response = Utils:setSuccessResponse(
                response,
                {
                    "land": land.toJson()
                });
        return response;
    }

    function creatLandOwner(DB:LandOwnerInsert landOwnerInsert) returns error|int {
        error landError = error("Some error occurred while creating land owner");
        transaction {
            int[]|persist:Error landOwnerID = self.dbClient->/landowners.post([landOwnerInsert]);
            if landOwnerID is persist:Error {
                if landOwnerID is persist:AlreadyExistsError {
                    landError = error(Utils:LAND_OWNER_ALREADY_EXISTS);
                }
                landError = error(Utils:FAILED_TO_REGISTER_LAND_OWNER);
            }
            check commit;
            if landOwnerID is int[] {
                return landOwnerID[0];
            }
            return landError;
        }
    }
}
