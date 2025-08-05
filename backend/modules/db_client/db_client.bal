import backend.db as DB;
import ballerina/sql;

final DB:Client dbClient = check new ();

final sql:ConnectionPool connPool = {
    maxOpenConnections: 30,
    maxConnectionLifeTime: 180,
    minIdleConnections: 5
};

public function getClient() returns  DB:Client{
    return dbClient;
}