import ballerinax/rabbitmq;

configurable string rabbitmqUsername = ?;
configurable string rabbitmqPassword = ?;

rabbitmq:ConnectionConfiguration config = {
    username: rabbitmqUsername,
    password: rabbitmqPassword
};

public final rabbitmq:Client rabbitmqClient = check new (
    rabbitmq:DEFAULT_HOST,
    rabbitmq:DEFAULT_PORT,
    config
);
