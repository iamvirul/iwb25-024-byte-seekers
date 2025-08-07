import ballerina/http;
import ballerina/io;
import ballerinax/googleapis.oauth2 as oauth2;

configurable string bucket = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string access_token = ?;

oauth2:OAuth2RefreshTokenGrantConfig grantConfig = {
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    refreshUrl: "https://oauth2.googleapis.com/token"
};

oauth2:ConnectionConfig cfg = {
    auth: grantConfig
};

public function uploadGCS(byte[] fileStream, string filename) returns string | error {
    http:Client gcs = check new ("https://storage.googleapis.com", {
        auth: grantConfig
    });

    map<string> headers = {
        "Content-Type": "application/octet-stream"
    };

    http:Response res = check gcs->post(
        string `/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${filename}`,
        fileStream,
        headers
    );
    json responseJSON = check res.getJsonPayload();
    io:println(responseJSON.mediaLink);
    json mediaLink = check responseJSON.mediaLink;
    return mediaLink.toString();
}
