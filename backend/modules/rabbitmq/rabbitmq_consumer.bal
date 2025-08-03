import backend.common as Common;
import backend.db as DB;
import backend.managers as Managers;
import backend.utils as Utils;
import backend.db_client as DBClient;

import ballerina/http;
import ballerina/log;
import ballerina/persist;
import ballerina/time;
import ballerina/url;
import ballerinax/rabbitmq;

configurable string sms_lenz_user_id = ?;
configurable string sms_lenz_api_key = ?;
configurable string sms_lenz_sender_id = ?;

listener rabbitmq:Listener rabbitmqListener = check new (rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);

const int MAX_RETRIES = 3;
const int INITIAL_RETRY_DELAY_MS = 1000;

@rabbitmq:ServiceConfig {
    queueName: disputeQueueName,
    autoAck: false
}
service on rabbitmqListener {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = DBClient:getClient();
    }

    remote function onMessage(Common:DisputeMessage disputeMessage) returns error? {
        log:printInfo("Processing dispute: " + disputeMessage.disputeInsert.caseId +
                    ", Retry attempt: " + disputeMessage.retryCount.toString());
        error? processingError = self.processDispute(disputeMessage);
        if processingError is error {
            log:printError("Error processing dispute", processingError);
            if self.shouldRetry(disputeMessage, processingError) {
                check self.handleRetry(disputeMessage);
            } else {
                check self.handleFailure(disputeMessage);
            }
        } else {
            log:printInfo("Successfully processed dispute: " + disputeMessage.disputeInsert.caseId);
        }
    }

    private function processDispute(Common:DisputeMessage disputeMessage) returns error? {
        DB:DisputeInsert disputeInsert = disputeMessage.disputeInsert;
        DB:DisputeDocumentInsert[] docArray = [];
        int[]|persist:Error disputeResult = self.dbClient->/disputes.post([disputeInsert]);
        if disputeResult is persist:Error {
            return error("Failed to insert dispute", disputeResult);
        }
        int insertedDisputeId = disputeResult[0];
        int docIndex = 1;
        foreach var doc in disputeMessage.documents {
            string ext = Utils:getExtension(doc.contentType, doc.filename);
            string base = disputeInsert.caseId + "_doc" + docIndex.toString();
            string|error uploaded = Utils:uploadFile(doc.data, "disputes/", base, ext);
            if uploaded is error {
                return error("Failed to upload document", uploaded);
            }
            DB:DisputeDocumentInsert disputeDocInsert = {
                disputesId: insertedDisputeId,
                docPath: uploaded,
                uploadedDate: time:utcNow()
            };
            docArray.push(disputeDocInsert);
            int[]|persist:Error docResult = self.dbClient->/disputedocuments.post([disputeDocInsert]);
            if docResult is persist:Error {
                return error("Failed to insert dispute document", docResult);
            }
            docIndex += 1;
        }
        Common:DisputeSocketAdded disputeSocketAdded = {
            dispute: disputeInsert,
            documents: docArray
        };
        Common:socketMessage socketNotify = {
            event: Common:DISPUTE_CREATED,
            message: disputeSocketAdded.toJson()
        };
        Managers:legalOfficerConnectionStore.broadcast(socketNotify, disputeInsert.legalOfficerId.toString());
    }

    private function shouldRetry(Common:DisputeMessage disputeMessage, error err) returns boolean {
        if disputeMessage.retryCount >= MAX_RETRIES {
            return false;
        }
        if err is persist:ConstraintViolationError {
            return false;
        }
        return true;
    }

    private function handleRetry(Common:DisputeMessage disputeMessage) returns error? {
        disputeMessage.retryCount += 1;
        int delayMs = INITIAL_RETRY_DELAY_MS * (2 ^ (disputeMessage.retryCount - 1));

        log:printInfo("Scheduling retry " + disputeMessage.retryCount.toString() +
                    " for dispute " + disputeMessage.disputeInsert.caseId +
                    " with delay " + delayMs.toString() + "ms");
        check rabbitmqClient->publishMessage({
            content: disputeMessage,
            routingKey: disputeQueueName,
            properties: {headers: {"x-delay": delayMs}}
        });
    }

    private function handleFailure(Common:DisputeMessage disputeMessage) returns error? {
        log:printError("Max retries exceeded or non-retryable error for dispute: " +
                    disputeMessage.disputeInsert.caseId);
        check rabbitmqClient->publishMessage({
            content: disputeMessage,
            routingKey: deadLetterQueueName
        });
    }
}

@rabbitmq:ServiceConfig {
    queueName: estimateTimeQueueName,
    autoAck: false
}
service on rabbitmqListener {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = DBClient:getClient();
    }

    remote function onMessage(Common:DisputeEstimateTimeMessage disputeMessage) returns error? {
        log:printInfo("Processing dispute: " + disputeMessage.dispute.caseId +
                    ", Retry attempt: " + disputeMessage.retryCount.toString());
        error? processingError = self.processDispute(disputeMessage);
        if processingError is error {
            log:printError("Error processing dispute", processingError);
            if self.shouldRetry(disputeMessage, processingError) {
                check self.handleRetry(disputeMessage);
            } else {
                check self.handleFailure(disputeMessage);
            }
        } else {
            log:printInfo("Successfully processed dispute: " + disputeMessage.dispute.caseId);
        }
    }

    private function processDispute(Common:DisputeEstimateTimeMessage disputeMessage) returns error? {
        DB:DisputeUpdate updateDispute = {
            estimateTime: disputeMessage.estimateTime
        };
        DB:Dispute|persist:Error updateResult = self.dbClient->/disputes/[disputeMessage.dispute.id].put(updateDispute);
        if updateResult is persist:Error {
            return error("Failed to update dispute", updateResult);
        }
        Common:socketMessage socketNotify = {
            event: Common:ESTIMATE_TIME_UPDATED,
            message: updateResult.toJson()
        };
        Managers:landOwnerConnectionStore.broadcast(socketNotify, disputeMessage.dispute.usersId.toString());
        Managers:legalOfficerConnectionStore.broadcast(socketNotify, disputeMessage.dispute.legalOfficerId.toString());
    }

    private function shouldRetry(Common:DisputeEstimateTimeMessage disputeMessage, error err) returns boolean {
        if disputeMessage.retryCount >= MAX_RETRIES {
            return false;
        }
        if err is persist:ConstraintViolationError {
            return false;
        }
        return true;
    }

    private function handleRetry(Common:DisputeEstimateTimeMessage disputeMessage) returns error? {
        disputeMessage.retryCount += 1;
        int delayMs = INITIAL_RETRY_DELAY_MS * (2 ^ (disputeMessage.retryCount - 1));

        log:printInfo("Scheduling retry " + disputeMessage.retryCount.toString() +
                    " for dispute " + disputeMessage.dispute.caseId +
                    " with delay " + delayMs.toString() + "ms");
        check rabbitmqClient->publishMessage({
            content: disputeMessage,
            routingKey: estimateTimeQueueName,
            properties: {headers: {"x-delay": delayMs}}
        });
    }

    private function handleFailure(Common:DisputeEstimateTimeMessage disputeMessage) returns error? {
        log:printError("Max retries exceeded or non-retryable error for dispute: " +
                    disputeMessage.dispute.caseId);
        check rabbitmqClient->publishMessage({
            content: disputeMessage,
            routingKey: deadLetterQueueName
        });
    }
}

@rabbitmq:ServiceConfig {
    queueName: disputeCommentQueueName,
    autoAck: false
}
service on rabbitmqListener {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = DBClient:getClient();
    }

    remote function onMessage(Common:DisputeCommentMessage message) returns error? {
        log:printInfo(`Received dispute comment message for dispute: ${message.dispute.disputesId}`);
        error? processingError = self.processDisputeComment(message);
        if processingError is error {
            log:printError("Error processing dispute comment", processingError);
            if self.shouldRetry(message, processingError) {
                check self.handleRetry(message);
            } else {
                check self.handleFailure(message);
            }
        } else {
            log:printInfo(`Successfully processed dispute comment for dispute: ${message.dispute.disputesId}`);
        }
    }

    private function processDisputeComment(Common:DisputeCommentMessage message) returns error? {
        int[]|persist:Error disputeCommentResult = self.dbClient->/disputecomments.post([message.dispute]);
        if disputeCommentResult is persist:Error {
            return error("Failed to insert dispute comment", disputeCommentResult);
        }
        Common:socketMessage socketNotify = {
            event: Common:COMMENT_ADDED,
            message: message.dispute.toJson()
        };
        Managers:landOwnerConnectionStore.broadcast(socketNotify, message.userId.toString());
        http:Client apiClient = check new ("https://smslenz.lk/api/send-sms");
        string messageText = string `Comment added for ${message.caseId}.\n${message.dispute.comment}`;
        string encodedMessage = check url:encode(messageText, "UTF-8");

        string query = string `?user_id=${sms_lenz_user_id}&api_key=${sms_lenz_api_key}&sender_id=${sms_lenz_sender_id}&contact=${message.contact}&message=${encodedMessage}`;

        json|error response = apiClient->get(query);
        if response is error {
            return error("Failed to send SMS", response);
        }
        log:printInfo("Message sent successfuly");
    }

    private function shouldRetry(Common:DisputeCommentMessage disputeMessage, error err) returns boolean {
        if disputeMessage.retryCount >= MAX_RETRIES {
            return false;
        }
        if err is persist:ConstraintViolationError {
            return false;
        }
        return true;
    }

    private function handleRetry(Common:DisputeCommentMessage disputeMessage) returns error? {
        disputeMessage.retryCount += 1;
        int delayMs = INITIAL_RETRY_DELAY_MS * (2 ^ (disputeMessage.retryCount - 1));

        log:printInfo("Scheduling retry " + disputeMessage.retryCount.toString() +
                    " for comment " + disputeMessage.dispute.disputesId.toString() +
                    " with delay " + delayMs.toString() + "ms");
        check rabbitmqClient->publishMessage({
            content: disputeMessage,
            routingKey: disputeCommentQueueName,
            properties: {headers: {"x-delay": delayMs}}
        });
    }

    private function handleFailure(Common:DisputeCommentMessage disputeMessage) returns error? {
        log:printError(`Max retries exceeded or non-retryable error for dispute: ${disputeMessage.dispute.disputesId}`);
        check rabbitmqClient->publishMessage({
            content: disputeMessage,
            routingKey: deadLetterQueueName
        });
    }
}

@rabbitmq:ServiceConfig {
    queueName: disputePrecedentQueueName,
    autoAck: false
}
service on rabbitmqListener {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = DBClient:getClient();
    }

    remote function onMessage(Common:LegalPrecedentMessage message) returns error? {
        log:printInfo(`Received legal precedent message for dispute: ${message.legalPrecedent.disputesId}`);
        error? processingError = self.processLegalPrecedent(message);
        if processingError is error {
            log:printError("Error processing dispute comment", processingError);
            if self.shouldRetry(message, processingError) {
                check self.handleRetry(message);
            } else {
                check self.handleFailure(message);
            }
        } else {
            log:printInfo(`Successfully processed legal precedent for dispute: ${message.legalPrecedent.disputesId}`);
        }
    }

    private function processLegalPrecedent(Common:LegalPrecedentMessage message) returns error? {
        DB:LegalClauseInsert[] clauseArray = [];
        int[]|persist:Error precedentResult = self.dbClient->/legalprecedents.post([message.legalPrecedent]);
        if precedentResult is persist:Error {
            return error("Failed to insert legal precedent", precedentResult);
        }
        int precedentId = precedentResult[0];
        log:printInfo("Legal precedent ID: " + precedentId.toString());
        foreach var clause in message.legalClauses {
            DB:LegalClauseInsert clauseInsert = {
                legalClause: clause,
                legalPrecedentsId: precedentId
            };
            clauseArray.push(clauseInsert);
            int[]|persist:Error clauseResult = self.dbClient->/legalclauses.post([clauseInsert]);
            if clauseResult is persist:Error {
                return error("Failed to insert legal clause", clauseResult);
            }
        }
        Common:LegalPrecedentAdded legalPrecedentAdded = {
            id: precedentId,
            precedent: message.legalPrecedent,
            clauses: clauseArray,
            dispute: message.dispute
        };
        Common:socketMessage socketNotify = {
            event: Common:PRECEDENT_CREATED,
            message: legalPrecedentAdded.toJson()
        };
        Managers:legalOfficerConnectionStore.broadcast(socketNotify, message.dispute.legalOfficerId.toString());
        Common:socketMessage ownerSocketNotify = {
            event: Common:PRECEDENT_CREATED,
            message: legalPrecedentAdded.toJson()
        };
        Managers:landOwnerConnectionStore.broadcast(ownerSocketNotify, message.userId.toString());
    }

    private function shouldRetry(Common:LegalPrecedentMessage disputeMessage, error err) returns boolean {
        if disputeMessage.retryCount >= MAX_RETRIES {
            return false;
        }
        if err is persist:ConstraintViolationError {
            return false;
        }
        return true;
    }

    private function handleRetry(Common:LegalPrecedentMessage message) returns error? {
        message.retryCount += 1;
        int delayMs = INITIAL_RETRY_DELAY_MS * (2 ^ (message.retryCount - 1));

        log:printInfo("Scheduling retry " + message.retryCount.toString() +
                    " for legal precedent " + message.legalPrecedent.disputesId.toString() +
                    " with delay " + delayMs.toString() + "ms");
        check rabbitmqClient->publishMessage({
            content: message,
            routingKey: disputePrecedentQueueName,
            properties: {headers: {"x-delay": delayMs}}
        });
    }

    private function handleFailure(Common:LegalPrecedentMessage message) returns error? {
        log:printError(`Max retries exceeded or non-retryable error for legal precedent: ${message.legalPrecedent.disputesId}`);
        check rabbitmqClient->publishMessage({
            content: message,
            routingKey: deadLetterQueueName
        });
    }
}
