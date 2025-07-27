import ballerinax/rabbitmq;

configurable string username = ?;
configurable string password = ?;

rabbitmq:ConnectionConfiguration config = {
    username: username,
    password: password
};

public final rabbitmq:Client rabbitmqClient = check new (
    rabbitmq:DEFAULT_HOST,
    rabbitmq:DEFAULT_PORT,
    config
);
