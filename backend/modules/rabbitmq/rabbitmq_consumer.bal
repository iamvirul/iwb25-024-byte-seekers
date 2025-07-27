import backend.common as Common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/log;
import ballerina/persist;
import ballerina/time;
import ballerinax/rabbitmq;

listener rabbitmq:Listener rabbitmqListener = check new (rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);
public const string disputeQueueName = "DISPUTE_QUEUE";
public const string deadLetterQueueName = "DISPUTE_DLQ";
const int MAX_RETRIES = 3;
const int INITIAL_RETRY_DELAY_MS = 1000;

@rabbitmq:ServiceConfig {
    queueName: disputeQueueName,
    autoAck: false
}
service on rabbitmqListener {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
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
            int[]|persist:Error docResult = self.dbClient->/disputedocuments.post([disputeDocInsert]);
            if docResult is persist:Error {
                return error("Failed to insert dispute document", docResult);
            }
            docIndex += 1;
        }
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
