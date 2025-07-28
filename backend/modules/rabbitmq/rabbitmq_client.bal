import ballerinax/rabbitmq;

configurable string username = ?;
configurable string password = ?;

rabbitmq:ConnectionConfiguration config = {
    username: username,
    password: password
};

public const string disputeQueueName = "DISPUTE_QUEUE";
public const string deadLetterQueueName = "DISPUTE_DLQ";
public const string estimateTimeQueueName = "DISPUTE_ESTIMATE_TIME_EXCHANGE_QUEUE";

public final rabbitmq:Client rabbitmqClient = check new (
    rabbitmq:DEFAULT_HOST,
    rabbitmq:DEFAULT_PORT,
    config
);
