import ballerina/http;
import ballerinax/mysql;
import ballerina/io;
import ballerina/sql;

import backend.utils as Utils;
import backend.db_service as db;

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
            `SELECT * FROM users WHERE username = ${loginRequest.username} AND password = ${loginRequest.password}`
        );

        User? user = ();
        var result = check userStream.next();
        _ = check userStream.close();

        if result is record {| User value; |} {
            user = result.value;
        }

        if user is User {
            string|error jwt = Utils:issueToken(user.username);
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


}
