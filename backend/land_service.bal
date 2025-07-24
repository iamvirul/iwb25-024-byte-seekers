import ballerina/http;
import backend.db as DB;


listener http:Listener landMicroservice = new (9091);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    }
}

service /land on landMicroservice {
     private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function post register(@http:Payload DB:LandInsert landInsert) {
        
    }
}