import backend.common as Common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/crypto;
import ballerina/http;
import ballerina/io;
import ballerina/jwt;
import ballerina/persist;
import ballerina/uuid;

listener http:Listener authMicroservice = new (9091);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    }
}

service /auth on authMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function post users/login(@http:Payload Common:LoginUser loginUser) returns http:Response|error {
        http:Response response = new;
        Common:ValidationResult validateLoginUser = Utils:validateLoginUser(loginUser);
        if !validateLoginUser.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLoginUser.errors);
            return response;
        }
        stream<Common:User, persist:Error?> userStream = self.dbClient->queryNativeSQL(`SELECT * FROM users WHERE email = ${loginUser.email}`, Common:User);

        Common:User? user = ();
        var result = check userStream.next();
        _ = check userStream.close();

        if result is record {|Common:User value;|} {
            user = result.value;
        }
        if user is Common:User {

            if crypto:verifyArgon2(loginUser.password, user.password) is false {
                response.statusCode = 401;
                response = Utils:setErrorResponse(response, Utils:INVALID_PASSWORD);
                return response;
            }
            stream<Common:UserHasTypes, persist:Error?> userHasType = self.dbClient->queryNativeSQL(`SELECT * FROM users_has_user_types WHERE users_id = ${user.id} AND user_types_id = ${loginUser.user_type}`, Common:UserHasTypes);
            Common:UserHasTypes? userTypeResult = ();
            var userTypeCheck = check userHasType.next();
            _ = check userHasType.close();
            if userTypeCheck is record {|Common:UserHasTypes value;|} {
                userTypeResult = userTypeCheck.value;
            }
            if userTypeResult is () {
                response.statusCode = 403;
                response = Utils:setErrorResponse(response, "User does not have the required user type");
                return response;
            }
            Utils:USER_TYPES userType = check Utils:getUserType(loginUser.user_type);
            string|error jwt = Utils:issueToken(userType, user.email);
            string|error socketToken = Utils:issueSocketToken(userType, user.email);
            if jwt is string {
                if socketToken is string {
                    response.statusCode = 200;
                    response = Utils:setSuccessResponse(
                            response,
                            {
                                message: "Login successful",
                                token: jwt,
                                socketToken: socketToken
                            }
                    );
                    return response;
                }else {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, "Failed to issue socket token");
                    return response;
                }
            } else {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, "Failed to generate tokens");
                return response;
            }
        } else {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid username or password");
            return response;
        }
    }

    resource function post users/register(@http:Payload Common:RequestUser requestUser) returns http:Response|error {
        http:Response response = new;
        Common:ValidationResult validateRegisterUser = Utils:validateRegisterUser(requestUser);
        if !validateRegisterUser.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateRegisterUser.errors);
            return response;
        }
        stream<Common:User, persist:Error?> userStream = self.dbClient->queryNativeSQL(`SELECT * FROM users WHERE email = ${requestUser.email} OR nic = ${requestUser.nic} OR sludi = ${requestUser.sludi}`, Common:User);
        Common:User? user = ();
        var result = check userStream.next();
        _ = check userStream.close();
        if result is record {|Common:User value;|} {
            user = result.value;
        }
        if user is Common:User {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Email, NIC or SLUDI already exists");
            return response;
        }

        http:Client SLUDIClient = check new ("localhost:9096/sludi_service");
        http:Response|http:ClientError SLUDIresponse = check SLUDIClient->/verify/[requestUser.sludi];

        if (SLUDIresponse is http:Response) {
            json payload = check SLUDIresponse.getJsonPayload();
            if payload.success is false {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, "User not found with SLUDI");
                return response;
            }
            json sludiUser = check payload.user;
            if sludiUser.nic != requestUser.nic {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, "NIC does not match with SLUDI");
                return response;
            }
            if sludiUser.fname != requestUser.first_name {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, "First name does not match with SLUDI");
                return response;
            }
            if sludiUser.lname != requestUser.last_name {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, "Last name does not match with SLUDI");
                return response;
            }

            string hash_password = check crypto:hashArgon2(requestUser.password);
            string userUUID = uuid:createType4AsString();
            string userId = "LCLO-" + userUUID;
            byte[] encryptNIC = check Utils:encryptData(requestUser.nic);
            byte[] encryptSludi = check Utils:encryptData(requestUser.sludi);
            byte[] encryptContactNo = check Utils:encryptData(requestUser.contact_no);
            byte[] encryptAddress = check Utils:encryptData(requestUser.address);

            DB:UserInsert requestUserInsert = {
                userId: userId,
                firstName: requestUser.first_name,
                lastName: requestUser.last_name,
                email: requestUser.email,
                password: hash_password,
                nic: encryptNIC,
                sludi: encryptSludi,
                contactNo: encryptContactNo,
                address: encryptAddress
            };

            transaction {
                int[]|persist:Error insertedRecord = self.dbClient->/users.post([requestUserInsert]);
                if insertedRecord is persist:Error {
                    if insertedRecord is persist:AlreadyExistsError {
                        response.statusCode = 400;
                        response = Utils:setErrorResponse(response, "User already exists");
                    }
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, "Failed to register user");
                }
                if insertedRecord is int[] {
                    _ = check self.dbClient->/userhasusertypes.post([
                        {
                            usersId: <int>insertedRecord[0],
                            userTypesId: requestUser.user_type
                        }
                    ]);
                    response.statusCode = 201;
                    response = Utils:setSuccessResponse(response, "User registered successfully");
                }

                check commit;
                return response;
            }
        } else {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Error while verifying the user");
            return response;
        }
    }

    resource function get validate/[string token]() returns json|error {
        string jwt = token;

        jwt:ValidatorConfig validatorConfig = {
            issuer: "byteseekers",
            audience: Utils:LAND_OWNER,
            clockSkew: 60,
            signatureConfig: {
                certFile: "resources/certificates/public.crt"
            }
        };

        jwt:Payload result = check jwt:validate(jwt, validatorConfig);

        io:println("Token is valid: ", result);
    }
}
