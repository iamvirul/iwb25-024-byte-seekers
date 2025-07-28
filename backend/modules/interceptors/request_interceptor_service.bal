import backend.db as DB;
import backend.utils as Utils;

import ballerina/http;
import ballerina/jwt;
import ballerina/log;
import ballerina/regex;
import ballerina/time;

public service class RequestInterceptor {

    *http:RequestInterceptor;

    resource function 'default [string... path](http:RequestContext ctx, http:Request req) returns http:NotImplemented|http:NextService|error? {
        string authToken = check req.getHeader("Authorization");
        string token = regex:replace(authToken, "Bearer ", "");
        [jwt:Header, jwt:Payload]|jwt:Error validateToken = Utils:validateToken(token);
        if validateToken is [jwt:Header, jwt:Payload] {
            string? username = validateToken[1].sub;
            string usersEmail = username is string ? username : "unknown";
            http:Client auditClient = check new ("localhost:9089");
            http:Response|http:ClientError auditResponse = check auditClient->/audit/getUserID/[usersEmail];
            if auditResponse is http:ClientError {
                log:printError("Error fetching user ID: ");
                return ctx.next();
            }
            string|http:ClientError textPayload = auditResponse.getTextPayload();
            if textPayload is http:ClientError {
                log:printError("Error fetching user ID: ");
                return ctx.next();
            }

            int userId = check int:fromString(textPayload);
            json jsonPayload = {};
            if req.method == http:POST || req.method == http:PUT || req.method == http:PATCH {
                if req.getContentType().startsWith("multipart/form-data") {
                    jsonPayload = {"content:": "multipart/form-data"};
                } else if req.getContentType().startsWith("application/json") {
                    jsonPayload = check req.getJsonPayload();
                }else{
                    jsonPayload = {"content:": "No content type found"};
                }
            }

            string host = check req.getHeader("Host");
            time:Utc utcNow = time:utcNow();
            time:Civil civilNow = time:utcToCivil(utcNow);
            DB:AuditInsert auditInsert = {
                usersId: userId,
                requestMethod: req.method,
                requestPath: req.rawPath,
                requestPayload: jsonPayload.toString(),
                requestHost: host,
                requestedTime: civilNow,
                userAgent: req.userAgent
            };
            anydata|http:ClientError unionResult = auditClient->/audit/log.post(auditInsert);
            if unionResult is http:ClientError {
                log:printError("Error inserting audit log: ");
                return ctx.next();
            }
        }

        return check ctx.next();
    }
}
