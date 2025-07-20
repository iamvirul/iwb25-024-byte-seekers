import ballerina/http;
import ballerinax/mysql;
import ballerina/io;
import ballerina/sql;
import ballerina/jwt;

import backend.utils as Utils;
import backend.db_service as db;

type LoginRequest record {
    string username;
    string password;
};

type User record {|
    int id;
    string first_name;
    string last_name;
    string user_id;
    string email;
    string nic;
    string username;
    string password;
    string contact_no;
    string address;
    string user_status;
    string sludi;
    string user_type;
|};

listener http:Listener authMicroservice = new (9091);
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    }
}
service /auth on authMicroservice {
    private final mysql:Client connection;

    function init() returns error? {
        self.connection = db:getConnection();
    }

    function __deinit() returns error? {
        check self.connection.close();
    }

     resource function post login(@http:Payload LoginRequest loginRequest) returns json|error {
        stream<User, sql:Error?> userStream = self.connection->query(
            `SELECT * FROM users WHERE email = ${loginRequest.username} AND password = ${loginRequest.password}`
        );

        User? user = ();
        var result = check userStream.next();
        _ = check userStream.close();

        if result is record {| User value; |} {
            user = result.value;
        }

        if user is User {
            string|error jwt = Utils:issueToken(user.email);
            if jwt is string {
                io:print(jwt);
                return {
                    status: 200,
                    message: "Login successful",
                    token: jwt
                };
            } else {
                return {
                    status: 500,
                    message: "Failed to generate token"
                };
            }
        } else {
            return {
                status: 401,
                message: "Invalid username or password"
            };
        }
    }

    resource function get validate/[string token]() returns json|error {
        string jwt = token;

        jwt:ValidatorConfig validatorConfig = {
            issuer: "byteseekers",
            audience: "users",
            clockSkew: 60,
            signatureConfig: {
                certFile: "resources/certificates/public.crt"
            }
        };

        jwt:Payload result = check jwt:validate(jwt, validatorConfig);

        io:println("Token is valid: ", result);
    }
}