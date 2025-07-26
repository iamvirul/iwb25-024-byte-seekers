import backend.common as Common;
import backend.db as DB;
import backend.mappers as Mappers;
import backend.utils as Utils;

import ballerina/http;
import ballerina/persist;
import ballerina/time;

listener http:Listener landMicroservice = new (9070);

configurable string blockchain_url = ?;
configurable string blockchain_api_key = ?;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT"],
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
            boolean isFromOwnerProvided = requestLandInsert.from_owner is (DB:LandOwnerInsert);
            int fromLandOwnerResult = 0;
            if requestLandInsert.from_owner is (DB:LandOwnerInsert) {
                fromLandOwnerResult = check self.creatLandOwner(<DB:LandOwnerInsert>requestLandInsert.from_owner);
            }
            error|int toLandOwnerResult = self.creatLandOwner(requestLandInsert.to_owner);

            if toLandOwnerResult is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, toLandOwnerResult.message());
            }

             time:Utc utc = check time:utcFromString(requestLandInsert.transferDate);

            Common:LandInsertResponse rawPayload = {
                "LandID": landInsertID is int[] ? landInsertID[0] : 0,
                "FromOwnerID": isFromOwnerProvided ? fromLandOwnerResult : (),
                "ToOwnerID": toLandOwnerResult is int ? toLandOwnerResult : 0,
                "TransferDate": time:utcToString(utc),
                "VerifiedBy": requestLandInsert.verified_by is string ?  requestLandInsert.verified_by is "" ? "unknown" : requestLandInsert.verified_by : "unknown"
            };
            json payload = rawPayload.toJson();

            map<string> blockchainHeaders = {
                "x-api-key": blockchain_api_key
            };
            http:Client blockchainClient = check new (blockchain_url);
            http:Response|http:ClientError blockchain_response = blockchainClient->post("/transfer", payload, blockchainHeaders);
            if blockchain_response is http:ClientError {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, "Failed to connect to blockchain service");
            }
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

    resource function post land/documents/add/[int landId](http:Request req) returns http:Response|error {
        http:Response response = new;
        if req.getContentType().startsWith("multipart/form-data") {
            Common:FileRecord[]|error parseLandDocuments = Utils:parseLandDocumentMultipartFormData(req.getBodyParts());
            if parseLandDocuments is error {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, parseLandDocuments.message());
                return response;
            }
            Common:ValidationResult validateDocument = Utils:validateLandDocument(parseLandDocuments);
            if !validateDocument.isValid {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, validateDocument.errors);
                return response;
            }
            Common:Land|persist:Error landResult = self.dbClient->/lands/[landId](Common:Land);
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
            int docIndex = 1;
            transaction {
                foreach var doc in parseLandDocuments {
                    string ext = Utils:getExtension(doc.contentType, doc.filename);
                    string base = landId.toString() + "_doc" + docIndex.toString();
                    string path = " landdocuments/" + landId.toString() + "/";
                    string|error uploaded = Utils:uploadFile(doc.data, path, base, ext);
                    if uploaded is error {
                        response.statusCode = 500;
                        response = Utils:setErrorResponse(response, Utils:FAILED_TO_UPLOAD_DOCUMENT);

                    } else {
                        DB:LandDocumentInsert landDocInsert = {
                            docPath: uploaded,
                            docSize: doc.data.length().toString(),
                            docType: doc.contentType,
                            uploadedDate: time:utcNow(),
                            landsId: landId,
                            docStatus: DB:APPROVED
                        };
                        int[]|persist:Error docResult = self.dbClient->/landdocuments.post([landDocInsert]);
                        if docResult is persist:Error {
                            if docResult is persist:AlreadyExistsError {
                                response.statusCode = 409;
                                response = Utils:setErrorResponse(response, Utils:DOCUMENT_ALREADY_EXISTS);
                            }
                            response.statusCode = 500;
                            response = Utils:setErrorResponse(response, Utils:FAILED_TO_ADD_DISPUTE_DOCUMENT);
                        }
                    }
                    docIndex += 1;
                }
                check commit;
            }
            response.statusCode = 201;
            response = Utils:setSuccessResponse(response, "Document added successfully");
        } else {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_CONTENT_TYPE);
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

    resource function put land/status/[int landID]/[DB:LandLandStatus status]() returns error|http:Response {
        http:Response response = new;
        boolean|error landStatus = Utils:getLandStatus(status);
        if landStatus is error {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, landStatus.message());
            return response;
        }
        if landID <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_LAND_ID);
            return response;
        }
        DB:LandUpdate|persist:Error landResult = self.dbClient->/lands/[landID](DB:LandUpdate);

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
        DB:LandUpdate land = landResult;
        land.landStatus = status; 
        DB:Land|persist:Error updateResult = self.dbClient->/lands/[landID].put(land);
        if updateResult is persist:Error {
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, Utils:FAILED_TO_UPDATE_LAND_STATUS);
            return response;
        }
        response.statusCode = 200;
        response = Utils:setSuccessResponse(response, Utils:LAND_UPDATE_SUCCESS);
        return response;
    }
}
