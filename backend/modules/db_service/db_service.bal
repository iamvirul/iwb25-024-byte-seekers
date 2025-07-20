import ballerinax/mysql; 
import ballerinax/mysql.driver as _;

configurable DBConnection LandChainDatabase = ?;

final mysql:Client dbClient = check new (
    LandChainDatabase.host,
    LandChainDatabase.user,
    LandChainDatabase.password,
    LandChainDatabase.database,
    LandChainDatabase.port
);

public function getConnection() returns mysql:Client {
    return dbClient;
}
