import backend.managers as Managers;
import backend.utils as Utils;

import ballerina/http;
import ballerina/log;
import ballerina/websocket;

listener websocket:Listener socketListener = new (9060,
    secureSocket = {
        key: {
            certFile: "resources/certificates/sockets/public.crt",
            keyFile: "resources/certificates/sockets/private.key",
            keyPassword: ""
        }
    }
);

@websocket:ServiceConfig {
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "byteseekers",
                audience: Utils:LEGAL_OFFICER,
                signatureConfig: {
                    certFile: "resources/certificates/sockets/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LEGAL_OFFICER]
        }
    ]
}
service /stats on socketListener {

    resource function get [string userID](http:Request req) returns websocket:Service {
        return new LegalOfficerService(userID, req);
    }
}

service class LegalOfficerService {
    *websocket:Service;
    private final string userID;
    private final http:Request req;

    function init(string userID, http:Request req) {
        self.userID = userID;
        self.req = req;
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        Managers:legalOfficerConnectionStore.addClient(self.userID, caller);
        check caller->writeMessage(string `Welcome ${self.userID}!`);
        string header = check self.req.getHeader("x-service-token");
        map<string> serviceHeaders = {
            "Authorization": header
        };
        http:Client serviceClient = check new ("localhost:9080/legal_officer");
        string path = "/data/".'join(self.userID);

        anydata|http:ClientError allLand = serviceClient->get(path, serviceHeaders);
        if allLand is http:ClientError {
            log:printError("Error fetching all lands: ");
            return;
        }
        check caller->writeMessage(allLand);
    }

    remote function onClose(websocket:Caller caller) returns error? {
        Managers:connectionStore.removeClient(self.userID);
    }

    remote function onMessage(websocket:Caller caller, string data) returns error? {
        check caller->writeMessage("Hello, How are you?" + self.userID);
    }
}
