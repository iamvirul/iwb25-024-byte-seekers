import ballerina/jwt;
import ballerina/http;


listener http:Listener authMicroservice = new (9091);
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowCredentials: true
    }
}
service /auth on authMicroservice {
    resource function post login() returns http:Response|error {
        
    }
}