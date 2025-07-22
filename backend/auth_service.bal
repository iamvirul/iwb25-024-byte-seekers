import backend.utils as Utils;
import backend.db as DB;

import ballerina/io;
import ballerina/crypto;
import ballerina/http;
import ballerina/jwt;
import ballerina/uuid;
import ballerina/persist;

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

    resource function post land_owner/login(@http:Payload LoginUser loginUser) returns http:Response|error {
        http:Response response = new;
        Utils:ValidationResult validateLoginUser = Utils:validateLoginUser(loginUser);
        if !validateLoginUser.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateLoginUser.errors);
            return response;
        }
        stream<User, persist:Error?> userStream = self.dbClient->queryNativeSQL(`SELECT * FROM users WHERE email = ${loginUser.email}`,User);

        User? user = ();
        var result = check userStream.next();
        _ = check userStream.close();

        if result is record {|User value;|} {
            user = result.value;
        }

        if user is User {
            if crypto:verifyArgon2(loginUser.password, user.password) is false {
                response.statusCode = 401;
                response = Utils:setErrorResponse(response, Utils:INVALID_PASSWORD);
                return response;
            }
            string|error jwt = Utils:issueToken(Utils:LAND_OWNER);
            if jwt is string {
                if (user.user_type != Utils:LAND_OWNER) {
                    response.statusCode = 403;
                    response = Utils:setErrorResponse(response, "Access Denied");
                    return response;
                } else {
                    response.statusCode = 200;
                    response = Utils:setSuccessResponse(
                            response,
                            {
                                message: "Login successful",
                                token: jwt
                            }
                    );
                    return response;
                }
            } else {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, "Failed to generate token");
                return response;
            }
        } else {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid username or password");
            return response;
        }
    }

    resource function post land_owner/register(@http:Payload RequestUser requestUser) returns http:Response|error {
        http:Response response = new;
        Utils:ValidationResult validateRegisterUser = Utils:validateRegisterUser(requestUser);
        if !validateRegisterUser.isValid {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, validateRegisterUser.errors);
            return response;
        }
        stream<User, persist:Error?> userStream = self.dbClient->queryNativeSQL(`SELECT * FROM users WHERE email = ${requestUser.email} OR nic = ${requestUser.nic} OR sludi = ${requestUser.sludi}`,User);
        User? user = ();
        var result = check userStream.next();
        _ = check userStream.close();
        if result is record {|User value;|} {
            user = result.value;
        }
        if user is User {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Email, NIC or SLUDI already exists");
            return response;
        }

        http:Client SLUDIClient = check new ("localhost:9094/sludi_service");
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
                address: encryptAddress,
                userStatus: Utils:PENDING,
                userType: Utils:LAND_OWNER
            };
            int[]|persist:Error insertedRecord = self.dbClient->/users.post([requestUserInsert]);
            if insertedRecord is persist:Error {
               if insertedRecord is persist:AlreadyExistsError {
                    response.statusCode = 400;
                    response = Utils:setErrorResponse(response, "User already exists");
                    return response;
                }
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, "Failed to register user");
                return response;
            }
            response = Utils:setSuccessResponse(
                    response,
                    {
                        message: "User registered successfully"
                    });
            response.statusCode = 201;
            response = Utils:setSuccessResponse(response, "User registered successfully");
            return response;
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
