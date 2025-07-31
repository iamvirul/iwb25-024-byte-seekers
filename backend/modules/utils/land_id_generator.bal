import ballerina/uuid;

public function generateShortId() returns string {
    return uuid:createType4AsString();
}

public function generateCaseId() returns string {
    return "CASE-" + currentTimeStamp();
}
