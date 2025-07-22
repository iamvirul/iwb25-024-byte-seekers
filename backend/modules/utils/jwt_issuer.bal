import ballerina/jwt;
import ballerina/time;

public function issueToken(string audience) returns string|error {
    jwt:IssuerConfig issuerConfig = {
        issuer: "byteseekers",
        audience: audience,
        expTime: 3600,
        signatureConfig: {
        config: {
            keyFile: "resources/certificates/private.key"
        }
    }
    };

    string jwt = check jwt:issue(issuerConfig);

    return jwt;
}

public isolated function currentTimeStamp() returns string {
    time:Utc currTime = time:utcNow();
    string currentTimeStamp = time:utcToString(currTime);
    return currentTimeStamp;
}