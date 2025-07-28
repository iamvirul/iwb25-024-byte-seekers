import ballerina/io;
import ballerina/websocket;


public function main() returns error? {
    // Defines the WebSocket client to call the JWT authentication secured APIs.
    // The client is enriched with the `Authorization: Bearer <token>` header by
    // passing the `websocket:JwtIssuerConfig` for the `auth` configuration of the
    // client. A self-signed JWT is issued before the request is sent.
    websocket:Client chatClient = check new ("wss://127.0.0.1:9090/chat",
        auth = {
            username: "byteseekers",
            issuer: "byteseekers",
            audience: "LAND_OFFICER",
            customClaims: { "scp": "LAND_OFFICER", "sub": "byteseekers" },
            expTime: 3600,
            signatureConfig: {
                config: {
                    keyFile: "resources/certificates/sockets/private.key"
                }
            }
        },
        secureSocket = {
            cert: "resources/certificates/sockets/public.crt"
        }
    );
    check chatClient->writeMessage("Hello, John!");
    string chatMessage = check chatClient->readMessage();
    io:println(chatMessage);
}
