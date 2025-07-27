import backend.db as DB;

import ballerina/log;
import ballerinax/rabbitmq;

listener rabbitmq:Listener disputeListener = check new (rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);

@rabbitmq:ServiceConfig {
    queueName: disputeQueueName
}
service on disputeListener {
    remote function onMessage(DB:DisputeInsert message) returns error? {
        // string messageContent = check string:fromBytes(message.content);
        log:printInfo("[X] Received message: " + message.caseId);
        // log:printInfo("Processing dispute message..." + message.content);
    }
}

