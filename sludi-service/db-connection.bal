import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable DBConnection SLUDIDatabase = ?;

final mysql:Client dbClient = check new (
    SLUDIDatabase.host,
    SLUDIDatabase.user,
    SLUDIDatabase.password,
    SLUDIDatabase.database,
    SLUDIDatabase.port
);

public function getConnection() returns mysql:Client {
    return dbClient;
}
