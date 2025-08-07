import backend.db as DB;
// import ballerina/sql;

final DB:Client dbClient = check new ();

public function getClient() returns  DB:Client{
    return dbClient;
}