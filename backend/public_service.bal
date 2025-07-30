import backend.db as DB;
import backend.utils as Utils;

import ballerina/persist;
import ballerina/http;

listener http:Listener publicMicroservice = new (9085);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET"],
        allowCredentials: true
    }
}
service  /lands on publicMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get all() returns error|http:Response {
        http:Response response = new;
        DB:LandWithRelations[] lands = [];
        stream<DB:LandWithRelations, persist:Error?> landsResult = self.dbClient->/lands(DB:LandWithRelations);

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
}