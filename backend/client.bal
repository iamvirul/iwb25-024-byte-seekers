import ballerinax/rabbitmq;

configurable string rabbitmqHost = "localhost";
configurable int rabbitmqPort = 5672;
configurable string rabbitmqUsername = "guest";
configurable string rabbitmqPassword = "guest";

// Queue names
configurable string disputeQueueName = "dispute_queue";

rabbitmq:ConnectionConfiguration config = {
    username: rabbitmqUsername,
    password: rabbitmqPassword
};

// Shared RabbitMQ client
public final rabbitmq:Client rabbitmqClient = check new(
    rabbitmqHost, 
    rabbitmqPort,
    config
);