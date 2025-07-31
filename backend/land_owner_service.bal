import backend.common;
import backend.db as DB;
import backend.interceptors as Interceptors;
import backend.mappers as Mappers;
import backend.rabbitmq as RabbitMQ;
import backend.utils as Utils;

import ballerina/constraint;
import ballerina/crypto;
import ballerina/data.jsondata;
import ballerina/http;
import ballerina/jwt;
import ballerina/persist;
import ballerina/regex;
import ballerina/sql;
import ballerina/time;

configurable string merchant_id = ?;
configurable string merchant_secret = ?;

listener http:Listener landOwnerMicroservice = new (9098);

@constraint:Number {minValueExclusive: 0}
public type PositiveDecimal decimal;

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

    resource function get disputes/[int userId](@http:Header string Authorization) returns error|http:Response {
        http:Response response = new;
        string token = regex:replace(Authorization, "Bearer ", "");
        [jwt:Header, jwt:Payload]|jwt:Error validateToken = Utils:validateToken(token);
        if validateToken is jwt:Error {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid token");
            return response;
        }
        int uid = check validateToken[1].get("uid").cloneWithType(int);
        if uid != userId {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid user id");
            return response;
        }
        DB:DisputeWithRelations[] disputes = [];
        stream<DB:DisputeWithRelations, persist:Error?> streamResult = self.dbClient->/disputes(DB:DisputeWithRelations, `usersId = ${userId}`);
        check from var result in streamResult
            do {
                disputes.push(result);
            };
        check streamResult.close();
        response = Utils:setSuccessResponse(response, {"disputes": disputes.toJson()});
        return response;
    }

    resource function get precedents/legal_clauses/[int precedentId]() returns error|http:Response {
        http:Response response = new;
        DB:LegalPrecedentWithRelations|persist:Error streamResult = self.dbClient->/legalprecedents/[precedentId](DB:LegalPrecedentWithRelations);
        if streamResult is persist:Error {
            if streamResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:LEGAL_PRECEDENT_NOT_FOUND);
            } else {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, "Internal server error");
            }
            return response;
        }
        response = Utils:setSuccessResponse(response, {"precedents": streamResult.toJson()});
        return response;
    }

    resource function get profile/[int userId]() returns error|http:Response {
        http:Response response = new;
        DB:User|persist:Error userResult = self.dbClient->/users/[userId](DB:User);
        if userResult is persist:Error {
            if userResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:USER_NOT_FOUND);
            }
            return response;
        }
        byte[]? addressResult = userResult.address;
        byte[]? sludiResult = userResult.sludi;
        string address = "";
        string sludi = "";
        if addressResult is () {
            address = "";
        } else {
            address = check Utils:decryptData(addressResult);
        }
        if sludiResult is () {
            sludi = "";
        } else {
            sludi = check Utils:decryptData(sludiResult);
        }
        common:UserResponse user = {
            id: userResult.id,
            userId: userResult.userId,
            firstName: userResult.firstName,
            lastName: userResult.lastName,
            email: userResult.email,
            contactNo: check Utils:decryptData(userResult.contactNo),
            address: address,
            nic: check Utils:decryptData(userResult.nic),
            sludi: sludi,
            password: ""
        };
        DB:PaymentHistory[] payments = [];
        stream<DB:PaymentHistory, persist:Error?> paymentResult = self.dbClient->/paymenthistories(DB:PaymentHistory, `usersId = ${userId}`);
        check from var payment in paymentResult
            do {
                payments.push(payment);
            };
        check paymentResult.close();

        response = Utils:setSuccessResponse(response, {"user": user.toJson(), "payments": payments.toJson()});
        return response;
    }

    resource function get checkout/[int userId](PositiveDecimal amount, string barslId) returns error|http:Response {
        http:Response response = new;

        decimal rawAmount = amount;
        decimal|error validated = constraint:validate(rawAmount);
        if validated is error {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Invalid amount: must be a positive decimal");
            return response;
        }
        DB:User|persist:Error unionResult = self.dbClient->/users/[userId](DB:User);
        if unionResult is persist:Error {
            if unionResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:USER_NOT_FOUND);
            }
            return response;
        }
        DB:User user = unionResult;
        string orderId = Utils:getOrderId();
        decimal rounded = decimal:round(amount, 2);
        string amountStr = rounded.toString();
        string generatedHash = Utils:generatePayHereHash(merchant_id, orderId, amount, "LKR", merchant_secret);
        map<json> data = {
            "merchant_id": merchant_id,
            "first_name": user.firstName,
            "last_name": user.lastName,
            "email": user.email,
            "phone": check Utils:decryptData(user.contactNo),
            "address": "",
            "city": "",
            "country": "",
            "order_id": orderId,
            "items": "LEGEL OFFICER INITIAL PAYMENT - " + barslId,
            "currency": "LKR",
            "amount": amountStr,
            "sandbox": true,
            "hash": generatedHash
        };
        response.statusCode = 200;
        response = Utils:setSuccessResponse(response, {"data": data});
        return response;
    }

    resource function post payment/[int userId](int legalOfficerId, decimal amount, string orderId) returns error|http:Response {
        http:Response response = new;
        if legalOfficerId <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Invalid legal officer id");
            return response;
        }
        if orderId is "" {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "OrderId is required");
            return response;
        }
        decimal|error validated = constraint:validate(amount);
        if validated is error {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Invalid amount: must be a positive decimal");
            return response;
        }
        DB:User|persist:Error unionResult = self.dbClient->/users/[userId](DB:User);
        if unionResult is persist:Error {
            if unionResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:USER_NOT_FOUND);
            }
            return response;
        }
        DB:LegalOfficer|persist:Error result = self.dbClient->/legalofficers/[legalOfficerId](DB:LegalOfficer);
        if result is persist:Error {
            if result is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:LEGAL_OFFICER_NOT_FOUND);
            }
            return response;
        }
        DB:PaymentHistoryInsert paymentHistoryInsert = {
            referanceNo: orderId,
            amount: amount,
            createdAt: time:utcNow(),
            legalOfficerId: legalOfficerId,
            usersId: userId
        };
        int[]|persist:Error paymentHistory = self.dbClient->/paymenthistories.post([paymentHistoryInsert]);
        if paymentHistory is persist:Error {
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, "Internal server error");
            return response;
        }
        response.statusCode = 200;
        response = Utils:setSuccessResponse(response, {"message": "Payment successful"});
        return response;
    }

    resource function put password/update/[int userId](common:UpdatePassword updatePassword) returns error|http:Response {
        http:Response response = new;
        if userId <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_USER_ID);
            return response;
        }
        common:ValidationResult validateUpdatePassword = Utils:validateUpdatePassword(updatePassword);
        if !validateUpdatePassword.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateUpdatePassword.errors);
            return response;
        }
        DB:User|persist:Error unionResult = self.dbClient->/users/[userId](DB:User);
        if unionResult is persist:Error {
            if unionResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:USER_NOT_FOUND);
            }
            return response;
        }
        if crypto:verifyArgon2(updatePassword.oldPassword, unionResult.password) is false {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Old password is incorrect");
            return response;
        }
        string hashed_password = check crypto:hashArgon2(updatePassword.newPassword);
        DB:UserUpdate userUpdate = {
            password: hashed_password
        };
        DB:User|persist:Error updatedResult = self.dbClient->/users/[userId].put(userUpdate);
        if updatedResult is persist:Error {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Failed to update password");
            return response;
        }
        response.statusCode = 200;
        response = Utils:setSuccessResponse(response, "Password updated successfully");
        return response;
    }

    resource function put profile/update/[int userId](http:Request req) returns error|http:Response {
        http:Response response = new;
        if userId <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_USER_ID);
            return response;
        }
        json jsonBody = check req.getJsonPayload();
        common:UpdateProfile updateProfile = check jsondata:parseAsType(jsonBody);
        common:ValidationResult validateUpdateProfile = Utils:validateUpdateProfile(updateProfile);
        if !validateUpdateProfile.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateUpdateProfile.errors);
            return response;
        }

        DB:UserUpdate userUpdate = {};
        anydata contact = updateProfile["contact"];
        anydata? address = updateProfile["address"];
        if contact is string {
            userUpdate.contactNo = check Utils:encryptData(contact);
        }
        if address is string {
            userUpdate.address = check Utils:encryptData(address);
        }
        DB:User|persist:Error updateResult = self.dbClient->/users/[userId].put(userUpdate);
        if updateResult is persist:Error {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Failed to update profile");
            return response;
        }
        response.statusCode = 200;
        response = Utils:setSuccessResponse(response, "Profile updated successfully");
        return response;
    }

    resource function get stats/[int userId]() returns error|http:Response {
        http:Response response = new;
        if userId <= 0 {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_USER_ID);
            return response;
        }
        DB:User|persist:Error userResult = self.dbClient->/users/[userId](DB:User);
        if userResult is persist:Error {
            if userResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, "User not found");
                return response;
            }
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Failed to fetch user");
            return response;
        }
        stream<DB:LandOwner, persist:Error?> landOwnerResult = self.dbClient->/landowners(DB:LandOwner, `nic=${userResult.nic}`);
        DB:LandOwner? landOwner = ();
        var result = check landOwnerResult.next();
        _ = check landOwnerResult.close();
        if result is record {|DB:LandOwner value;|} {
            landOwner = result.value;
        }
        if landOwner is DB:LandOwner {
            sql:ParameterizedQuery query = `
                                        SELECT 
                                            lo.id AS ownerId,
                                            lo.firstName,
                                            lo.lastName,
                                            COALESCE(sent.transferCount, 0) AS transfersSent,
                                            COALESCE(received.receivedCount, 0) AS transfersReceived,
                                            COALESCE(owned.landCount, 0) AS currentLandsOwned

                                        FROM land_owner lo
                                        LEFT JOIN (
                                            SELECT fromLandOwnersId, COUNT(*) AS transferCount
                                            FROM land_transfer_chain
                                            GROUP BY fromLandOwnersId
                                        ) sent ON lo.id = sent.fromLandOwnersId

                                        LEFT JOIN (
                                            SELECT toLandOwnersId, COUNT(*) AS receivedCount
                                            FROM land_transfer_chain
                                            GROUP BY toLandOwnersId
                                        ) received ON lo.id = received.toLandOwnersId

                                        LEFT JOIN (
                                            SELECT 
                                                ltc.toLandOwnersId, COUNT(*) AS landCount
                                            FROM (
                                                SELECT landsId, MAX(blockIndex) AS maxBlockIndex
                                                FROM land_transfer_chain
                                                GROUP BY landsId
                                            ) lastTransfers
                                            JOIN land_transfer_chain ltc
                                            ON ltc.landsId = lastTransfers.landsId AND ltc.blockIndex = lastTransfers.maxBlockIndex
                                            GROUP BY ltc.toLandOwnersId
                                        ) owned ON lo.id = owned.toLandOwnersId

                                        WHERE lo.id = ${landOwner.id}`;
            stream<common:LandOwnerStats, persist:Error?> quesryResult = self.dbClient->queryNativeSQL(query);
            record {|common:LandOwnerStats value;|}? statResult = check quesryResult.next();
            _ = check quesryResult.close();

            stream<common:LandOwnerDisputeStats, persist:Error?> pendingResultStream = self.dbClient->queryNativeSQL(`
        SELECT
            COUNT(CASE WHEN status = 'PENDING' THEN 1 END) AS pendingCount,
            COUNT(CASE WHEN status = 'RESOLVED' THEN 1 END) AS resolvedCount
        FROM disputes
        WHERE usersId = ${userId}`, common:LandOwnerDisputeStats);
            record {|common:LandOwnerDisputeStats value;|}? pendingResult = check pendingResultStream.next();
            _ = check pendingResultStream.close();

            sql:ParameterizedQuery landQuery = `SELECT l.*
                                        FROM lands l
                                        JOIN (
                                            SELECT ltc.landsId, ltc.toLandOwnersId
                                            FROM land_transfer_chain ltc
                                            JOIN (
                                                SELECT landsId, MAX(blockIndex) AS maxBlockIndex
                                                FROM land_transfer_chain
                                                GROUP BY landsId
                                            ) AS lastTransfers
                                            ON ltc.landsId = lastTransfers.landsId AND ltc.blockIndex = lastTransfers.maxBlockIndex
                                            WHERE ltc.toLandOwnersId = ${userId}
                                        ) AS ownedLands
                                        ON l.id = ownedLands.landsId;`;
            DB:Land[] lands = [];
            stream<DB:Land, persist:Error?> landResultStream = self.dbClient->queryNativeSQL(landQuery, DB:Land);
            check from var land in landResultStream
                do {
                    lands.push(land);
                };
            _ = check landResultStream.close();

            if statResult is record {|common:LandOwnerStats value;|} && pendingResult is record {|common:LandOwnerDisputeStats value;|} {
                response.statusCode = 200;
                response = Utils:setSuccessResponse(response, {"stats": statResult.value.toJson(), "disputes": pendingResult.value.toJson(), "lands": lands.toJson()});
                return response;
            } else {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, "No stats found");
                return response;
            }
        } else {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "User is not a land owner");
            return response;
        }
    }

}

