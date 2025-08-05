import ballerina/lang.value as value;
import ballerina/log;
import ballerina/websocket;


service /proxy on new websocket:Listener(8075) {

    resource function get [string userSessionId]() returns websocket:Service {
        return new legalOfficerProxy(userSessionId);
    }
}

service class legalOfficerProxy {
    *websocket:Service;
    websocket:Client? realClient = ();
    websocket:Caller? clientCaller = ();
    string userSessionId;

    function init(string userSessionId) {
        self.userSessionId = userSessionId;
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        string? jsonString = check redisClient->get(self.userSessionId);
        if jsonString is () {
            return;
        }
        json parsedJson = check value:fromJsonString(jsonString);
        UserSession|error fromJsonWithType = parsedJson.fromJsonWithType(UserSession);

        if fromJsonWithType is error {
            return;
        }

        self.clientCaller = caller;
        self.realClient = check new ("wss://localhost:9060/stats/" + fromJsonWithType.userId,
            secureSocket = {
                cert: "resources/certificates/sockets/public.crt"
            },
            auth = {
                token: fromJsonWithType.socketToken
            },
            customHeaders = {"x-service-token": "Bearer " + fromJsonWithType.serviceToken}
        );
        _ = start self.pipeFromRealToClient();
    }

    isolated function pipeFromRealToClient() returns error? {
        if self.realClient is websocket:Client && self.clientCaller is websocket:Caller {
            websocket:Client realClient = <websocket:Client>self.realClient;
            websocket:Caller clientCaller = <websocket:Caller>self.clientCaller;
            while true {
                var msg = realClient->readTextMessage();
                if msg is string {
                    check clientCaller->writeTextMessage(msg);
                } else {
                    log:printError("Failed reading from real WebSocket", msg);
                    break;
                }
            }
        }
    }

    remote function onClose(websocket:Caller caller) returns error? {
        websocket:Client realClient = <websocket:Client>self.realClient;
        if self.realClient is websocket:Client {
            check realClient->close();
        }
    }
}
