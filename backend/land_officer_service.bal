import backend.common as Common;
import backend.db as DB;
import backend.db_client as DBClient;
import backend.interceptors as Interceptors;
import backend.managers as Managers;
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

service http:InterceptableService /land_officer on landMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = DBClient:getClient();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    public function createInterceptors() returns Interceptors:RequestInterceptor {
        return new Interceptors:RequestInterceptor();
    }

    private function creatLandOwner(DB:LandOwnerInsert landOwnerInsert) returns error|int {
        stream<DB:LandOwner, persist:Error?> streamResult = self.dbClient->/landowners(DB:LandOwner, `nic=${landOwnerInsert.nic}`);
        check from var landOwner in streamResult
            do {
                if (landOwner.nic == landOwnerInsert.nic) {
                    return error(Utils:LAND_OWNER_ALREADY_EXISTS);
                }
            };
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
        Common:ValidationResult validateLandInsert = Utils:validateLandInsert(requestLandInsert);
        if !validateLandInsert.isValid {
            response.statusCode = 400;
            return Utils:setErrorResponse(response, validateLandInsert.errors);
        }
        DB:LandInsert landInsert = Mappers:landInsertMapper(requestLandInsert);

        int landId = 0;
        int? fromOwnerId = ();
        int toOwnerId = 0;
        json payload;
        error? blockchainResult = ();
        string verifiedBy = requestLandInsert.verified_by is string ? requestLandInsert.verified_by == "" ? "unknown" : requestLandInsert.verified_by : "unknown";
        time:Utc utc = check time:utcFromString(requestLandInsert.transferDate);

        worker Registrar {
            int[]|persist:Error landInsertID = self.dbClient->/lands.post([landInsert]);
            if landInsertID is persist:Error {
                response.statusCode = landInsertID is persist:AlreadyExistsError ? 409 : 500;
                response = Utils:setErrorResponse(response,
                            landInsertID is persist:AlreadyExistsError ?
                            Utils:LAND_ALREADY_EXISTS : Utils:FAILED_TO_REGISTER_LAND);
                return;
            }

            landId = landInsertID[0];

            if requestLandInsert.from_owner is DB:LandOwnerInsert {
                error|int fromOwnerResult = self.creatLandOwner(<DB:LandOwnerInsert>requestLandInsert.from_owner);
                if fromOwnerResult is error {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, fromOwnerResult.message());
                    return;
                }
                fromOwnerId = fromOwnerResult;
            }

            error|int toOwnerResult = self.creatLandOwner(requestLandInsert.to_owner);
            if toOwnerResult is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, toOwnerResult.message());
                return;
            }
            toOwnerId = toOwnerResult;

            Common:LandInsertResponse rawPayload = {
                LandID: landId,
                FromOwnerID: fromOwnerId,
                ToOwnerID: toOwnerId,
                TransferDate: time:utcToString(utc),
                VerifiedBy: verifiedBy
            };

            payload = rawPayload.toJson();
            _ = payload ->> Blockchain;
        }

        worker Blockchain {
            json|error data = <- Registrar;

            if data is error {
                blockchainResult = data;
                return;
            }

            json payloadData = data;

            map<string> blockchainHeaders = {
                "x-api-key": blockchain_api_key
            };

            http:Client|error blockchainClient = new (blockchain_url);
            if blockchainClient is error {
                blockchainResult = blockchainClient;
                return;
            }
            http:Response|http:ClientError blockchainRes = blockchainClient->post("/transfer", payloadData, blockchainHeaders);

            if blockchainRes is http:ClientError {
                blockchainResult = error("Failed to connect to blockchain");
                return;
            }

            json|http:ClientError jsonPayload = blockchainRes.getJsonPayload();
            if jsonPayload is http:ClientError {
                blockchainResult = jsonPayload;
                return;
            }

            json blockchainJson = jsonPayload;

            if blockchainJson.success is boolean {
                if blockchainJson.success is error {
                    blockchainResult = error("Blockchain transfer failed");
                    return;
                }
            } else {
                blockchainResult = error("Invalid blockchain response: 'success' field missing or invalid");
                return;
            }
        }

        if blockchainResult is error {
            response.statusCode = 500;
            return Utils:setErrorResponse(response, blockchainResult.message());
        }

        response.statusCode = 201;
        response = Utils:setSuccessResponse(response, "Land registered successfully");

        Common:socketMessage socketNotify = {
            event: Common:CREATED,
            message: landInsert.toJson()
        };
        Managers:connectionStore.broadcast(socketNotify);

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
                    string|error uploaded = Utils:uploadFile(doc.data, base, ext);
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

    resource function post land/landowner/add(@http:Payload DB:LandOwnerInsert landOwnerInsert) returns error|http:Response {
        http:Response response = new;

        Common:ValidationResult validateLandOwnerInsert = Utils:validateLandOwnerInsert(landOwnerInsert);
        if !validateLandOwnerInsert.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLandOwnerInsert.errors);
            return response;
        }
        error|int creatLandOwnerResult = self.creatLandOwner(landOwnerInsert);
        if creatLandOwnerResult is error {
            response.statusCode = 409;
            response = Utils:setErrorResponse(response, Utils:LAND_OWNER_ALREADY_EXISTS);
            return response;
        }
        response.statusCode = 201;
        response = Utils:setSuccessResponse(response, "Land owner added successfully");
        return response;
    }

    resource function get data/stats/all() returns error|http:Response {
        http:Response response = new;
        stream<Common:statDataLandOfficer, persist:Error?> statdata = self.dbClient->queryNativeSQL(`SELECT
    COUNT(CASE WHEN landStatus = 'PENDING' THEN 1 END) AS pending_lands,
    COUNT(CASE WHEN registerDate = CURDATE() THEN 1 END) AS registered_today,
    COUNT(CASE WHEN landStatus = 'REJECTED' THEN 1 END) AS rejected_lands,
    COUNT(CASE WHEN landStatus = 'VERIFIED' THEN 1 END) AS accepted_lands
    FROM lands;`, Common:statDataLandOfficer);

        Common:statDataLandOfficer responseStat;
        DB:LandWithRelations[] lands = [];

        check from var statdatas in statdata
            do {
                responseStat = statdatas;
            };
        check statdata.close();
        stream<DB:LandWithRelations, persist:Error?> landsResult = self.dbClient->/lands(DB:LandWithRelations, ``, `registerDate DESC`);
        check from var land in landsResult
            do {
                lands.push(land);
            };
        check landsResult.close();

        response.statusCode = 200;
        response = Utils:setSuccessResponse(response,
                {
                    "stats": responseStat.toJson(),
                    "lands": lands.toJson()
                });
        return response;
    };

    resource function put lands/document/status/[DB:LandDocumentDocStatus status]/[int docID]() returns error|http:Response {
        http:Response response = new;
        DB:LandDocumentUpdate|persist:Error landDocument = self.dbClient->/landdocuments/[docID](DB:LandDocumentUpdate);
        if landDocument is persist:Error {
            if landDocument is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:LAND_DOCUMENT_NOT_FOUND);
                return response;
            }
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_DOCUMENT);
            return response;
        }
        DB:LandDocument|persist:Error updateResult = self.dbClient->/landdocuments/[docID].put(landDocument);
        if updateResult is persist:Error {
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, Utils:FAILED_TO_UPDATE_DOCUMENT);
            return response;
        }
        response.statusCode = 200;
        response = Utils:setSuccessResponse(response, Utils:DOCUMENT_UPDATED);
        return response;
    }

    resource function get user/landowner/register/[int userID]() returns error|http:Response {
        http:Response response = new;
        stream<DB:UserHasUserTypeOptionalized, persist:Error?> streamResult = self.dbClient->/userhasusertypes(DB:UserHasUserTypeOptionalized, `usersId=${userID}`);
        stream<DB:UserTypeOptionalized, persist:Error?> landOwnerType = self.dbClient->/usertypes(DB:UserTypeOptionalized, `userTypes = ${"land_owner"}`);
        int? userTypeId;
        check from var landOwnerTypeResult in landOwnerType
            do {
                userTypeId = landOwnerTypeResult.id;
            };
        check landOwnerType.close();
        check from var user in streamResult
            do {
                if user.userTypesId == userTypeId {
                    response.statusCode = 409;
                    response = Utils:setErrorResponse(response, Utils:USER_ALREADY_EXISTS);
                    return response;
                } else {
                    [int, int][]|persist:Error userHasTypesAdded = self.dbClient->/userhasusertypes.post([
                        {
                            usersId: userID,
                            userTypesId: <int>userTypeId
                        }
                    ]);
                    if userHasTypesAdded is persist:Error {
                        if userHasTypesAdded is persist:AlreadyExistsError {
                            response.statusCode = 409;
                            response = Utils:setErrorResponse(response, Utils:USER_ALREADY_EXISTS);
                            return response;
                        }
                    }
                }
                check streamResult.close();
                response.statusCode = 200;
                response = Utils:setSuccessResponse(response, Utils:USER_UPDATED);
                return response;
            };
        response.statusCode = 500;
        response = Utils:setErrorResponse(response, Utils:FAILED_TO_UPDATE_USER_STATUS);
        return response;
    }

    resource function get user/landowners() returns error|http:Response {
        http:Response response = new;
        stream<DB:UserOptionalized, persist:Error?> streamResult = self.dbClient->/users(DB:UserOptionalized);
        Common:systemUser[] users = [];
        check from var user in streamResult
            do {
                Common:systemUser systemUser = {
                    id: <int>user.id,
                    firstName: <string>user.firstName,
                    lastName: <string>user.lastName,
                    contactNo: check Utils:decryptData(<byte[]>user.contactNo),
                    nic: check Utils:decryptData(<byte[]>user.nic),
                    address: check Utils:decryptData(<byte[]>user?.address)
                };
                users.push(systemUser);
            };
        check streamResult.close();
        response = Utils:setSuccessResponse(response, users);
        return response;
    }

    resource function get user/land/details(string landId) returns error|http:Response {
        http:Response response = new;
        stream<DB:LandOwner, persist:Error?> streamResult = self.dbClient->/landowners(DB:LandOwner);
        DB:LandOwner[] landOwners = [];
        check from var landOwner in streamResult
            do {
                landOwners.push(landOwner);
            };
        check streamResult.close();

        stream<DB:LandTransferChainOptionalized, persist:Error?> streamResult2 = self.dbClient->/landtransferchains(DB:LandTransferChainOptionalized,`landsId=${landId}`);
        DB:LandTransferChainOptionalized[] landTransferChains = [];
        check from var landTransferChain in streamResult2
            do {
                landTransferChains.push(landTransferChain);
            };
        check streamResult2.close();

        json res = {
            landOwners: landOwners,
            landTransferChains: landTransferChains.toJson()
        };

        response = Utils:setSuccessResponse(response, res);
        return response;

    }
}
