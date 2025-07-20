import ballerina/jwt;
import ballerina/time;

public function issueToken(string username) returns string|error {
    jwt:IssuerConfig issuerConfig = {
        issuer: "byteseekers",
        audience: "users",
        expTime: 3600,
        signatureConfig: {
            config: {
                keyStore: {
                    path: "resources/certificates/truststore.p12",
                    password: "MUKCF1WQgSyTHN3JMB5R7ZZ9GC59R1X2"
                },
                keyAlias: "ballerina",
                keyPassword: "MUKCF1WQgSyTHN3JMB5R7ZZ9GC59R1X2"
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