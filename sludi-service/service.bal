import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;

service /sludi_service on new http:Listener(9096) {
    private final mysql:Client connection;

    function init() returns error? {
        self.connection = getConnection();
    }

    function __deinit() returns error? {
        check self.connection.close();
    }

    resource function get verify/[string sludi] () returns http:Response|error {
        http:Response response = new;
        if sludi is "" {
            response.statusCode = 400;
            response.setJsonPayload({"success": false , "message": "SL-UDI is required"});
            return response;
        }

        stream<User, sql:Error?> userStream = self.connection->query(`SELECT * FROM users WHERE sludi = ${sludi}`);
        User? user = ();
        var unionResult = check userStream.next();
        check userStream.close();
        if unionResult is record {|User value;|} {
            user = unionResult.value;
        }

        if user is User {
            response.statusCode = 200;
            response.setJsonPayload({"success": true, "user": user});
            return response;
        }else{
            response.statusCode = 404;
            response.setJsonPayload({"success": false, "message": "User not found"});
            return response;
        }
    }
}
