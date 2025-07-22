// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const LAND_DOCUMENT = "landdocuments";
const USER = "users";
const NLP_ANALYSIS_RESULT = "nlpanalysisresults";
const LAND = "lands";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [LAND_DOCUMENT]: {
            entityName: "LandDocument",
            tableName: "lands_documents",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                docId: {columnName: "doc_id"},
                docName: {columnName: "doc_name"},
                docSize: {columnName: "doc_size"},
                docType: {columnName: "doc_type"},
                uploadedDate: {columnName: "uploaded_date"},
                docStatus: {columnName: "doc_status"},
                landsId: {columnName: "lands_id"},
                nlpAnalysisResultId: {columnName: "nlp_analysis_result_id"},
                "land.id": {relation: {entityName: "land", refField: "id"}},
                "land.hashId": {relation: {entityName: "land", refField: "hashId", refColumn: "_hashId"}},
                "land.landId": {relation: {entityName: "land", refField: "landId", refColumn: "land_id"}},
                "land.landName": {relation: {entityName: "land", refField: "landName", refColumn: "land_name"}},
                "land.landPlace": {relation: {entityName: "land", refField: "landPlace", refColumn: "land_place"}},
                "land.landLat": {relation: {entityName: "land", refField: "landLat", refColumn: "land_lat"}},
                "land.landLang": {relation: {entityName: "land", refField: "landLang", refColumn: "land_lang"}},
                "land.landSize": {relation: {entityName: "land", refField: "landSize", refColumn: "land_size"}},
                "land.landValue": {relation: {entityName: "land", refField: "landValue", refColumn: "land_value"}},
                "land.landType": {relation: {entityName: "land", refField: "landType", refColumn: "land_type"}},
                "land.registerDate": {relation: {entityName: "land", refField: "registerDate", refColumn: "register_date"}},
                "land.landStatus": {relation: {entityName: "land", refField: "landStatus", refColumn: "land_status"}},
                "land.priority": {relation: {entityName: "land", refField: "priority"}},
                "land.landOwnerId": {relation: {entityName: "land", refField: "landOwnerId", refColumn: "land_owner_id"}},
                "nlpanalysisresult.id": {relation: {entityName: "nlpanalysisresult", refField: "id"}},
                "nlpanalysisresult.hashId": {relation: {entityName: "nlpanalysisresult", refField: "hashId", refColumn: "_hashId"}},
                "nlpanalysisresult.results": {relation: {entityName: "nlpanalysisresult", refField: "results"}},
                "nlpanalysisresult.resultSummary": {relation: {entityName: "nlpanalysisresult", refField: "resultSummary", refColumn: "result_summary"}},
                "nlpanalysisresult.tags": {relation: {entityName: "nlpanalysisresult", refField: "tags"}},
                "nlpanalysisresult.trust": {relation: {entityName: "nlpanalysisresult", refField: "trust"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                land: {entity: Land, fieldName: "land", refTable: "lands", refColumns: ["id"], joinColumns: ["lands_id"], 'type: psql:ONE_TO_MANY},
                nlpanalysisresult: {entity: NlpAnalysisResult, fieldName: "nlpanalysisresult", refTable: "nlp_analysis_result", refColumns: ["id"], joinColumns: ["nlp_analysis_result_id"], 'type: psql:ONE_TO_MANY}
            }
        },
        [USER]: {
            entityName: "User",
            tableName: "users",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                userId: {columnName: "user_id"},
                firstName: {columnName: "first_name"},
                lastName: {columnName: "last_name"},
                email: {columnName: "email"},
                password: {columnName: "password"},
                nic: {columnName: "nic"},
                sludi: {columnName: "sludi"},
                contactNo: {columnName: "contact_no"},
                address: {columnName: "address"},
                userStatus: {columnName: "user_status"},
                userType: {columnName: "user_type"},
                "lands[].id": {relation: {entityName: "lands", refField: "id"}},
                "lands[].hashId": {relation: {entityName: "lands", refField: "hashId", refColumn: "_hashId"}},
                "lands[].landId": {relation: {entityName: "lands", refField: "landId", refColumn: "land_id"}},
                "lands[].landName": {relation: {entityName: "lands", refField: "landName", refColumn: "land_name"}},
                "lands[].landPlace": {relation: {entityName: "lands", refField: "landPlace", refColumn: "land_place"}},
                "lands[].landLat": {relation: {entityName: "lands", refField: "landLat", refColumn: "land_lat"}},
                "lands[].landLang": {relation: {entityName: "lands", refField: "landLang", refColumn: "land_lang"}},
                "lands[].landSize": {relation: {entityName: "lands", refField: "landSize", refColumn: "land_size"}},
                "lands[].landValue": {relation: {entityName: "lands", refField: "landValue", refColumn: "land_value"}},
                "lands[].landType": {relation: {entityName: "lands", refField: "landType", refColumn: "land_type"}},
                "lands[].registerDate": {relation: {entityName: "lands", refField: "registerDate", refColumn: "register_date"}},
                "lands[].landStatus": {relation: {entityName: "lands", refField: "landStatus", refColumn: "land_status"}},
                "lands[].priority": {relation: {entityName: "lands", refField: "priority"}},
                "lands[].landOwnerId": {relation: {entityName: "lands", refField: "landOwnerId", refColumn: "land_owner_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {lands: {entity: Land, fieldName: "lands", refTable: "lands", refColumns: ["land_owner_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        },
        [NLP_ANALYSIS_RESULT]: {
            entityName: "NlpAnalysisResult",
            tableName: "nlp_analysis_result",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                hashId: {columnName: "_hashId"},
                results: {columnName: "results"},
                resultSummary: {columnName: "result_summary"},
                tags: {columnName: "tags"},
                trust: {columnName: "trust"},
                "landdocuments[].id": {relation: {entityName: "landdocuments", refField: "id"}},
                "landdocuments[].docId": {relation: {entityName: "landdocuments", refField: "docId", refColumn: "doc_id"}},
                "landdocuments[].docName": {relation: {entityName: "landdocuments", refField: "docName", refColumn: "doc_name"}},
                "landdocuments[].docSize": {relation: {entityName: "landdocuments", refField: "docSize", refColumn: "doc_size"}},
                "landdocuments[].docType": {relation: {entityName: "landdocuments", refField: "docType", refColumn: "doc_type"}},
                "landdocuments[].uploadedDate": {relation: {entityName: "landdocuments", refField: "uploadedDate", refColumn: "uploaded_date"}},
                "landdocuments[].docStatus": {relation: {entityName: "landdocuments", refField: "docStatus", refColumn: "doc_status"}},
                "landdocuments[].landsId": {relation: {entityName: "landdocuments", refField: "landsId", refColumn: "lands_id"}},
                "landdocuments[].nlpAnalysisResultId": {relation: {entityName: "landdocuments", refField: "nlpAnalysisResultId", refColumn: "nlp_analysis_result_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {landdocuments: {entity: LandDocument, fieldName: "landdocuments", refTable: "lands_documents", refColumns: ["nlp_analysis_result_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        },
        [LAND]: {
            entityName: "Land",
            tableName: "lands",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                hashId: {columnName: "_hashId"},
                landId: {columnName: "land_id"},
                landName: {columnName: "land_name"},
                landPlace: {columnName: "land_place"},
                landLat: {columnName: "land_lat"},
                landLang: {columnName: "land_lang"},
                landSize: {columnName: "land_size"},
                landValue: {columnName: "land_value"},
                landType: {columnName: "land_type"},
                registerDate: {columnName: "register_date"},
                landStatus: {columnName: "land_status"},
                priority: {columnName: "priority"},
                landOwnerId: {columnName: "land_owner_id"},
                "user.id": {relation: {entityName: "user", refField: "id"}},
                "user.userId": {relation: {entityName: "user", refField: "userId", refColumn: "user_id"}},
                "user.firstName": {relation: {entityName: "user", refField: "firstName", refColumn: "first_name"}},
                "user.lastName": {relation: {entityName: "user", refField: "lastName", refColumn: "last_name"}},
                "user.email": {relation: {entityName: "user", refField: "email"}},
                "user.password": {relation: {entityName: "user", refField: "password"}},
                "user.nic": {relation: {entityName: "user", refField: "nic"}},
                "user.sludi": {relation: {entityName: "user", refField: "sludi"}},
                "user.contactNo": {relation: {entityName: "user", refField: "contactNo", refColumn: "contact_no"}},
                "user.address": {relation: {entityName: "user", refField: "address"}},
                "user.userStatus": {relation: {entityName: "user", refField: "userStatus", refColumn: "user_status"}},
                "user.userType": {relation: {entityName: "user", refField: "userType", refColumn: "user_type"}},
                "landdocuments[].id": {relation: {entityName: "landdocuments", refField: "id"}},
                "landdocuments[].docId": {relation: {entityName: "landdocuments", refField: "docId", refColumn: "doc_id"}},
                "landdocuments[].docName": {relation: {entityName: "landdocuments", refField: "docName", refColumn: "doc_name"}},
                "landdocuments[].docSize": {relation: {entityName: "landdocuments", refField: "docSize", refColumn: "doc_size"}},
                "landdocuments[].docType": {relation: {entityName: "landdocuments", refField: "docType", refColumn: "doc_type"}},
                "landdocuments[].uploadedDate": {relation: {entityName: "landdocuments", refField: "uploadedDate", refColumn: "uploaded_date"}},
                "landdocuments[].docStatus": {relation: {entityName: "landdocuments", refField: "docStatus", refColumn: "doc_status"}},
                "landdocuments[].landsId": {relation: {entityName: "landdocuments", refField: "landsId", refColumn: "lands_id"}},
                "landdocuments[].nlpAnalysisResultId": {relation: {entityName: "landdocuments", refField: "nlpAnalysisResultId", refColumn: "nlp_analysis_result_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                user: {entity: User, fieldName: "user", refTable: "users", refColumns: ["id"], joinColumns: ["land_owner_id"], 'type: psql:ONE_TO_MANY},
                landdocuments: {entity: LandDocument, fieldName: "landdocuments", refTable: "lands_documents", refColumns: ["lands_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [LAND_DOCUMENT]: check new (dbClient, self.metadata.get(LAND_DOCUMENT), psql:MYSQL_SPECIFICS),
            [USER]: check new (dbClient, self.metadata.get(USER), psql:MYSQL_SPECIFICS),
            [NLP_ANALYSIS_RESULT]: check new (dbClient, self.metadata.get(NLP_ANALYSIS_RESULT), psql:MYSQL_SPECIFICS),
            [LAND]: check new (dbClient, self.metadata.get(LAND), psql:MYSQL_SPECIFICS)
        };
    }

    isolated resource function get landdocuments(LandDocumentTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get landdocuments/[int id](LandDocumentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post landdocuments(LandDocumentInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_DOCUMENT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put landdocuments/[int id](LandDocumentUpdate value) returns LandDocument|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_DOCUMENT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/landdocuments/[id].get();
    }

    isolated resource function delete landdocuments/[int id]() returns LandDocument|persist:Error {
        LandDocument result = check self->/landdocuments/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_DOCUMENT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get users(UserTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get users/[int id](UserTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post users(UserInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put users/[int id](UserUpdate value) returns User|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/users/[id].get();
    }

    isolated resource function delete users/[int id]() returns User|persist:Error {
        User result = check self->/users/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get nlpanalysisresults(NlpAnalysisResultTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get nlpanalysisresults/[int id](NlpAnalysisResultTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post nlpanalysisresults(NlpAnalysisResultInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(NLP_ANALYSIS_RESULT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put nlpanalysisresults/[int id](NlpAnalysisResultUpdate value) returns NlpAnalysisResult|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(NLP_ANALYSIS_RESULT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/nlpanalysisresults/[id].get();
    }

    isolated resource function delete nlpanalysisresults/[int id]() returns NlpAnalysisResult|persist:Error {
        NlpAnalysisResult result = check self->/nlpanalysisresults/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(NLP_ANALYSIS_RESULT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get lands(LandTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get lands/[int id](LandTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post lands(LandInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put lands/[int id](LandUpdate value) returns Land|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/lands/[id].get();
    }

    isolated resource function delete lands/[int id]() returns Land|persist:Error {
        Land result = check self->/lands/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    remote isolated function queryNativeSQL(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>) returns stream<rowType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

