import ballerina/jwt;
import ballerina/time;

public function issueToken(string audience, string username) returns string|error {
    jwt:IssuerConfig issuerConfig = {
        issuer: "byteseekers",
        audience: audience,
        expTime: 3600,
        customClaims: { "scp": audience , "sub": username},
        signatureConfig: {
            config: {
                keyFile: "resources/certificates/private.key"
            }
        }
    };

    string jwt = check jwt:issue(issuerConfig);

    return jwt;
}

public function issueSocketToken(string audience, string username) returns string|error {
    jwt:IssuerConfig issuerConfig = {
        issuer: "byteseekers",
        audience: audience,
        expTime: 3600,
        customClaims: { "scp": audience , "sub": username},
        signatureConfig: {
            config: {
                keyFile: "resources/certificates/sockets/private.key"
            }
        }
    };

    string jwt = check jwt:issue(issuerConfig);

    return jwt;
}

public function validateToken(string token) returns [jwt:Header, jwt:Payload]|jwt:Error {
    [jwt:Header, jwt:Payload]|jwt:Error decode = jwt:decode(token);
    return decode;
}

public isolated function currentTimeStamp() returns string {
    time:Utc currTime = time:utcNow();
    string currentTimeStamp = time:utcToString(currTime);
    return currentTimeStamp;
}
