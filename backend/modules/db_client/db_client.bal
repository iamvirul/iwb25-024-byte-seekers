import backend.db as DB;

final DB:Client dbClient = check new ();

public function getClient() returns  DB:Client{
    return dbClient;
}