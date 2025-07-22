import ballerina/http;
import ballerina/jwt;
import backend.utils as Utils;

http:JwtValidatorConfig validator = {
    issuer: "byteseekers",
    audience: Utils:LAND_OWNER,
    signatureConfig: {certFile: "resources/certificates/public.crt"}
};

http:ListenerJwtAuthHandler handler = new (validator);

listener http:Listener securedListener = new (9092);

service /secure on securedListener {
    resource function get info(@http:Header string Authorization) returns string|http:Unauthorized {
        jwt:Payload|http:Unauthorized authn = handler.authenticate(Authorization);
        if authn is http:Unauthorized {
            return authn;
        }
        return "Secure service accessed successfully!";
    }
}
