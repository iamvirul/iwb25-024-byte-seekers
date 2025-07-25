import backend.common as Common;
import backend.db as DB;
import backend.mappers as Mappers;
import backend.utils as Utils;

import ballerina/http;
import ballerina/persist;

listener http:Listener landMicroservice = new (9070);

configurable string blockchain_url = ?;
configurable string blockchain_api_key = ?;

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

    private function creatLandOwner(DB:LandOwnerInsert landOwnerInsert) returns error|int {
        transaction {
            int[]|persist:Error landOwnerID = self.dbClient->/landowners.post([landOwnerInsert]);
            if landOwnerID is persist:Error {
                if landOwnerID is persist:AlreadyExistsError {
                    rollback;
                    return error(Utils:LAND_OWNER_ALREADY_EXISTS);
                } else {
                    rollback;
                    return error(Utils:FAILED_TO_REGISTER_LAND_OWNER);
                }
            } else {
                check commit;
                return landOwnerID[0];
            }

        }
    }

    resource function post land/register(@http:Payload Common:LandCreate requestLandInsert) returns http:Response|error|http:Unauthorized {
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
            int[]|persist:Error landInsertID = self.dbClient->/lands.post([landInsert]);
            if landInsertID is persist:Error {
                if landInsertID is persist:AlreadyExistsError {
                    response.statusCode = 409;
                    response = Utils:setErrorResponse(response, Utils:LAND_ALREADY_EXISTS);
                } else {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_REGISTER_LAND);

                }
            }

            error|int fromLandOwnerResult = self.creatLandOwner(requestLandInsert.from_owner);
            error|int toLandOwnerResult = self.creatLandOwner(requestLandInsert.to_owner);
            if fromLandOwnerResult is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, fromLandOwnerResult.message());
            }

            if toLandOwnerResult is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, toLandOwnerResult.message());
            }

            json blockchainPayload = {
                "LandID": landInsertID is int[] ? landInsertID[0] : 0,
                "FromOwnerID": fromLandOwnerResult is int ? fromLandOwnerResult : 0,
                "ToOwnerID": toLandOwnerResult is int ? toLandOwnerResult : 0,
                "TransferDate": "2025-07-23T10:00:00Z",
                "VerifiedBy": "hi"
            };

            map<string> blockchainHeaders = {
                "x-api-key": blockchain_api_key
            };
            http:Client blockchainClient = check new (blockchain_url);
            http:Response|http:ClientError blockchain_response = blockchainClient->post("/transfer",blockchainPayload,blockchainHeaders);
            if blockchain_response is http:Response {
                json blockchainResponsePayload = check blockchain_response.getJsonPayload();
                if blockchainResponsePayload.success is false {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, "Failed to transfer land on blockchain");
                }
            } else {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, "Failed to connect to blockchain service");
            }
            response.statusCode = 201;
            response = Utils:setSuccessResponse(response, "Land registered successfully");
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
}
