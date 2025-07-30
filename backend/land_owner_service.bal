import backend.common;
import backend.db as DB;
import backend.interceptors as Interceptors;
import backend.mappers as Mappers;
import backend.rabbitmq as RabbitMQ;
import backend.utils as Utils;

import ballerina/constraint;
import ballerina/http;
import ballerina/jwt;
import ballerina/persist;
import ballerina/regex;

listener http:Listener landOwnerMicroservice = new (9098);

@constraint:Number {minValueExclusive: 0}
public type PositiveDecimal decimal;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
        allowCredentials: true
    },
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "byteseekers",
                audience: Utils:LAND_OWNER,
                signatureConfig: {
                    certFile: "resources/certificates/public.crt"
                },
                scopeKey: "scp"
            },
            scopes: [Utils:LAND_OWNER]
        }
    ]
}

service http:InterceptableService /land_owner on landOwnerMicroservice {
    private final DB:Client dbClient;

    public function createInterceptors() returns http:Interceptor|http:Interceptor[] {
        return new Interceptors:RequestInterceptor();
    }

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get legal_officers() returns error|http:Response {
        http:Response response = new;
        common:LegalOfficer[] legalOfficers = [];
        stream<common:LegalOfficer, persist:Error?> legalOfficerResult = self.dbClient->/legalofficers(common:LegalOfficer);

        check from var legalOfficer in legalOfficerResult
            do {
                legalOfficers.push(legalOfficer);
            };
        check legalOfficerResult.close();
        if legalOfficers.length() == 0 {
            response.statusCode = 404;
            response = Utils:setErrorResponse(response, Utils:NO_LANDS_FOUND);
        } else {
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"legal_officers": legalOfficers.toJson()});
        }
        return response;
    }

    resource function post dispute/add(http:Request req, @http:Header string Authorization) returns http:Response|error {
        http:Response response = new;
        string token = regex:replace(Authorization, "Bearer ", "");
        [jwt:Header, jwt:Payload]|jwt:Error validateToken = Utils:validateToken(token);
        if validateToken is jwt:Error {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid token");
            return response;
        }
        string? email = validateToken[1].sub;
        if req.getContentType().startsWith("multipart/form-data") {
            //parse multipart form data
            common:DisputeForm|error parsed = Utils:parseDisputeMultipartFormData(req.getBodyParts());
            if parsed is error {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, Utils:INVALID_MULTIPART_REQUEST);
                return response;
            }
            //validate parsed data
            common:ValidationResult validateDispute = Utils:validateDisputeFormData(parsed);
            if !validateDispute.isValid {
                response.statusCode = 400;
                response = Utils:setErrorResponse(response, validateDispute.errors);
                return response;
            }
            string caseId = Utils:getUniqueIDByCurrentTime();
            //check if land and legal officer exist
            common:Land|persist:Error landResult = self.dbClient->/lands/[parsed.landsId](common:Land);
            if landResult is persist:Error {
                if landResult is persist:NotFoundError {
                    response.statusCode = 404;
                    response = Utils:setErrorResponse(response, Utils:LAND_NOT_FOUND);
                } else {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LAND);
                }
                return response;
            }
            //check if legal officer exists
            common:LegalOfficer|persist:Error legalOfficerResult = self.dbClient->/legalofficers/[parsed.legalOfficerId](common:LegalOfficer);
            if legalOfficerResult is persist:Error {
                if legalOfficerResult is persist:NotFoundError {
                    response.statusCode = 404;
                    response = Utils:setErrorResponse(response, Utils:LEGAL_OFFICER_NOT_FOUND);
                } else {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LEGAL_OFFICER);
                }
                return response;
            }
            DB:User|persist:Error userResult = self.dbClient->/users/[parsed.userId](DB:User);
            if userResult is persist:Error {
                if userResult is persist:NotFoundError {
                    response.statusCode = 404;
                    response = Utils:setErrorResponse(response, Utils:USER_NOT_FOUND);
                } else {
                    response.statusCode = 500;
                    response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_USER);
                }
                return response;
            }
            if userResult.email != email {
                response.statusCode = 401;
                response = Utils:setErrorResponse(response, Utils:INVALID_USER_ID);
                return response;
            }

            DB:DisputeInsert disputeInsert = Mappers:disputeInsertMapper(parsed, caseId);
            common:DisputeMessage disputeMessage = {disputeInsert, documents: parsed.documents};
            //publish dispute message to RabbitMQ
            error? publishDisputeMessageResult = RabbitMQ:publishDisputeMessage(disputeMessage);
            if publishDisputeMessageResult is error {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, Utils:FAILED_TO_QUEUE_DISPUTE);
                return response;
            }
            response.statusCode = 201;
            response = Utils:setSuccessResponse(response, {"message": "Dispute added successfully", "case_id": disputeInsert.caseId});
            return response;
        }
        else {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, Utils:INVALID_CONTENT_TYPE);
            return response;
        }
    }

    resource function get disputes/[int userId](@http:Header string Authorization) returns error|http:Response {
        http:Response response = new;
        string token = regex:replace(Authorization, "Bearer ", "");
        [jwt:Header, jwt:Payload]|jwt:Error validateToken = Utils:validateToken(token);
        if validateToken is jwt:Error {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid token");
            return response;
        }
        int uid = check validateToken[1].get("uid").cloneWithType(int);
        if uid != userId {
            response.statusCode = 401;
            response = Utils:setErrorResponse(response, "Invalid user id");
            return response;
        }
        DB:DisputeWithRelations[] disputes = [];
        stream<DB:DisputeWithRelations, persist:Error?> streamResult = self.dbClient->/disputes(DB:DisputeWithRelations, `usersId = ${userId}`);
        check from var result in streamResult
            do {
                disputes.push(result);
            };
        check streamResult.close();
        response = Utils:setSuccessResponse(response, {"disputes": disputes.toJson()});
        return response;
    }

    resource function get precedents/legal_clauses/[int precedentId]() returns error|http:Response {
        http:Response response = new;
        DB:LegalPrecedentWithRelations|persist:Error streamResult = self.dbClient->/legalprecedents/[precedentId](DB:LegalPrecedentWithRelations);
        if streamResult is persist:Error {
            if streamResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:LEGAL_PRECEDENT_NOT_FOUND);
            } else {
                response.statusCode = 500;
                response = Utils:setErrorResponse(response, "Internal server error");
            }
            return response;
        }
        response = Utils:setSuccessResponse(response, {"precedents": streamResult.toJson()});
        return response;
    }

    // resource function get profile/[int userId]() returns error|http:Response {
    // }

    resource function get checkout/[int userId](PositiveDecimal amount, string barslId) returns error|http:Response {
        http:Response response = new;

        string merchantId = "1231449";
        string merchantSecret = "MTQ3Mzg0OTM4MDI5MjQzMDQ5MDI4MzM1OTcwNzI0MDExNTYxODE3";

        decimal rawAmount = amount;
        decimal|error validated = constraint:validate(rawAmount);
        if validated is error {
            response.statusCode = 400;
            response = Utils:setErrorResponse(response, "Invalid amount: must be a positive decimal");
            return response;
        }
        DB:User|persist:Error unionResult = self.dbClient->/users/[userId](DB:User);
        if unionResult is persist:Error {
            if unionResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:USER_NOT_FOUND);
            }
            return response;
        }
        DB:User user = unionResult;
        string orderId = Utils:getOrderId();
        decimal rounded = decimal:round(amount, 2);
        string amountStr = rounded.toString();
        string generatedHash = Utils:generatePayHereHash(merchantId, orderId, amount, "LKR", merchantSecret);
        map<json> data = {
            "merchant_id": merchantId,
            "first_name": user.firstName,
            "last_name": user.lastName,
            "email": user.email,
            "phone": check Utils:decryptData(user.contactNo),
            "address": "",
            "city": "",
            "country": "",
            "order_id": orderId,
            "items": "LEGEL OFFICER INITIAL PAYMENT - " + barslId,
            "currency": "LKR",
            "amount": amountStr,
            "sandbox": true,
            "hash": generatedHash
        };
        response.statusCode = 200;
        response = Utils:setSuccessResponse(response, {"data": data});
        return response;
    }
}

