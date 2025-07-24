import ballerina/http;
import ballerina/io;
import ballerina/io as fileio;
import ballerina/jwt;

isolated function getAccessToken() returns string|error {
    json saKey = check fileio:fileReadJson("service-account.json");
    io:println(saKey.client_email);
    json clientEmailJson = check saKey.client_email;
    string clientEmail = clientEmailJson.toString();

    http:JwtIssuerConfig config = {
        issuer: clientEmail,
        audience: "https://oauth2.googleapis.com/token",
        customClaims: {
            "scope": "https://www.googleapis.com/auth/devstorage.full_control"
        },
        signatureConfig: {
            config: {
                keyFile: "resources/private.key"
            }
        }
    };

    string assertion = check jwt:issue(config);

    http:Client oauth = check new ("https://oauth2.googleapis.com");
    http:Request tokReq = new;
    tokReq.addHeader("Content-Type", "application/x-www-form-urlencoded");
    tokReq.setPayload("grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=" + assertion);

    http:Response tokRes = check oauth->post("/token", tokReq);
    json payload = check tokRes.getJsonPayload();

    map<json> data = check payload.ensureType();
    if data["access_token"] is string {
        return <string>data["access_token"];
    }
    return error("Access token missing in response");
}
