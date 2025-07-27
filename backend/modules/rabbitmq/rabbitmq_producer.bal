import backend.common as Common;

import ballerina/log;
import ballerinax/rabbitmq;

public function publishDisputeMessage(Common:DisputeMessage disputeMessage)returns error? {
    rabbitmq:Error? result = rabbitmqClient->publishMessage({content: disputeMessage, routingKey: disputeQueueName});
    if result is rabbitmq:Error {
        log:printError("Failed to publish dispute message to queue", result);
        return error("Failed to queue dispute processing");
    }

    log:printInfo("Dispute queued for processing: " + disputeMessage.disputeInsert.caseId);
}
