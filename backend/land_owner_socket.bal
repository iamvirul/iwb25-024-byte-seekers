import backend.managers as Managers;
import backend.utils as Utils;

import ballerina/http;
import ballerina/log;
import ballerina/websocket;

listener websocket:Listener landOwnerSocketListener = new (9065,
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
                audience: Utils:LAND_OWNER,
                signatureConfig: {
                    certFile: "resources/certificates/sockets/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OWNER]
        }
    ]
}
service /stats on landOwnerSocketListener {

    resource function get [string path]/[string userID](http:Request req) returns websocket:Service {
        return new LandOwnerService(userID, path, req);
    }
}

service class LandOwnerService {
    *websocket:Service;
    private final string userID;
    private final string path;
    private final http:Request req;

    function init(string userID, string path, http:Request req) {
        self.userID = userID;
        self.req = req;
        self.path = path;
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        Managers:landOwnerConnectionStore.addClient(self.userID, caller);
        check caller->writeMessage(string `Welcome ${self.userID}!`);
        string header = check self.req.getHeader("x-service-token");
        map<string> serviceHeaders = {
            "Authorization": header
        };
        http:Client serviceClient = check new ("localhost:9098/land_owner");
        anydata|http:ClientError response = ();
        match self.path {
            "dashboard" => {
                response = serviceClient->get("/stats/" + self.userID, serviceHeaders);
            }
            "disputes" => {
                response = serviceClient->get("/disputes/" + self.userID, serviceHeaders);
            }
        }
        if response is http:ClientError {
            log:printError("Error fetching : "+response.message());
            check caller->writeMessage({"error": response.message()});
            return;
        }
        check caller->writeMessage(response);
    }

    remote function onClose(websocket:Caller caller) returns error? {
        Managers:landOwnerConnectionStore.removeClient(self.userID);
    }

    remote function onMessage(websocket:Caller caller, string data) returns error? {
        check caller->writeMessage("Hello, How are you?" + self.userID);
    }
}
