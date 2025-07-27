import backend.common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/log;
import ballerina/persist;
import ballerina/time;
import ballerinax/rabbitmq;

listener rabbitmq:Listener disputeListener = check new (rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);
public const string disputeQueueName = "dispute_queue";

@rabbitmq:ServiceConfig {
    queueName: disputeQueueName,
    autoAck: false
}
service on disputeListener {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    remote function onMessage(common:DisputeMessage message) returns error? {
        log:printInfo("Received message: " + message.disputeInsert.caseId);

        DB:DisputeInsert disputeInsert = message.disputeInsert;
        int[]|persist:Error disputeResult = self.dbClient->/disputes.post([disputeInsert]);
        if disputeResult is persist:Error {
            check publishDisputeMessage(message);
            return;
        }
        int insertedDisputeId = disputeResult[0];
        //upload documents
        int docIndex = 1;
        foreach var doc in message.documents {
            string ext = Utils:getExtension(doc.contentType, doc.filename);
            string base = disputeInsert.caseId + "_doc" + docIndex.toString();
            string|error uploaded = Utils:uploadFile(doc.data, "disputes/", base, ext);
            if uploaded is error {
                return;
            } else {
                DB:DisputeDocumentInsert disputeDocInsert = {
                    disputesId: insertedDisputeId,
                    docPath: uploaded,
                    uploadedDate: time:utcNow()
                };
                int[]|persist:Error docResult = self.dbClient->/disputedocuments.post([disputeDocInsert]);
                if docResult is persist:Error {
                    return;
                }
            }
            docIndex += 1;
        }
    }

}

