import backend.utils as Utils;

import ballerina/websocket;
import ballerina/http;
import ballerina/log;
import backend.managers as Managers;



listener websocket:Listener statsListener = new (9090,
    secureSocket = {
        key: {
            certFile: "resources/certificates/sockets/public.crt",
            keyFile: "resources/certificates/sockets/private.key"
        }
    }
);


@websocket:ServiceConfig {
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "byteseekers",
                audience: Utils:LAND_OFFICER,
                signatureConfig: {
                    certFile: "resources/certificates/sockets/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OFFICER]
        }
    ]
}
service /stats on statsListener {

    resource function get [string userID](http:Request req) returns websocket:Service {
        return new statsService(userID, req);
    }
}

service class statsService {
    *websocket:Service;
    private final string userID;
    private final http:Request req;

    function init(string userID, http:Request req) {
        self.userID = userID;
        self.req = req;
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        Managers:connectionStore.addClient(self.userID,caller);
        string header = check self.req.getHeader("x-service-token");
        map<string> serviceHeaders = {
                "Authorization": header
            };
        http:Client serviceClient = check new ("localhost:9070/land_officer");
        anydata|http:ClientError allLand = serviceClient->get("/data/stats/all",serviceHeaders);
        if allLand is http:ClientError {
            log:printError("Error fetching all lands: ");
            return;
        }
        check caller->writeMessage(allLand);
    }
    remote function onClose(websocket:Caller caller) returns error? {
        Managers:connectionStore.removeClient(self.userID);
    }

    remote function onMessage(websocket:Caller caller,string data) returns error? {
        check caller->writeMessage("Hello, How are you?" + self.userID);
    }
}
