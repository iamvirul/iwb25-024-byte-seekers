import backend.db as DB;

import ballerina/http;
import ballerina/persist;
import ballerina/io;
import ballerina/sql;
import ballerina/log;

listener http:Listener auditMicroservice = new (9089);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    }
}
service /audit on auditMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function post log(DB:AuditInsert auditInsert) {
        int[]|persist:Error unionResult = self.dbClient->/audits.post([auditInsert]);
        if unionResult is persist:Error {
            io:println("Error inserting audit log: ", unionResult.message());
            return;
        }
        int[] insertedIds = unionResult;
        if insertedIds.length() > 0 {
            io:println("Audit log inserted with ID: ", insertedIds[0]);
        } else {
            io:println("No audit log was inserted.");
        }
    }

    resource function get getUserID/[string userEmail]() returns int {
        sql:ParameterizedQuery condition = `email = ${userEmail}`;
        stream<DB:User, persist:Error?> streamResult = self.dbClient->/users(DB:User, condition);
        record {|DB:User value;|}|persist:Error? result = streamResult.next();
        if result is persist:Error {
            log:printError("Error fetching user ID: " + result.message());
            return 0;
        }
        if result is () {
            log:printInfo("No user found with email: " + userEmail);
            return 0;
        }
        DB:User user = result.value;
        return user.id;
        
    }
}
