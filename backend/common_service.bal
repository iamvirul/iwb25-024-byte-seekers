import backend.utils as Utils;
import backend.db as DB;
import backend.common;
import backend.db_client as DBClient;

import ballerina/http;
import ballerina/persist;
import ballerina/crypto;
import ballerina/data.jsondata;


listener http:Listener commonMicroservice = new (9065);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT"],
        allowCredentials: true
    },
    auth: [
        {
            jwtValidatorConfig:
            {
                issuer: "byteseekers",
                audience: Utils:LAND_OWNER,
                signatureConfig: {
                    certFile: "resources/certificates/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OWNER, Utils:LEGAL_OFFICER, Utils:LAND_OFFICER]
        }
    ]
}

service /authorize on commonMicroservice {
    private final DB:Client dbClient;


    function init() returns error? {
        self.dbClient = DBClient:getClient();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
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
}
