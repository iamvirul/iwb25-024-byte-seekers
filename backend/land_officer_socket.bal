import ballerina/websocket;
import backend.utils as Utils;
import ballerina/io;

listener websocket:Listener chatListener = new (9090,
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
service /chat on chatListener {

    resource function get .() returns websocket:Service {
        return new ChatService();
    }
}

service class ChatService {
    *websocket:Service;

    remote function onMessage(websocket:Caller caller, string chatMessage) returns error? {
        check caller->writeMessage("Hello, How are you?");
        io:println("Message received : ", chatMessage);
    }
}
