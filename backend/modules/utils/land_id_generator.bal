import ballerina/uuid;

public function generateShortId() returns string {
   return  uuid:createType4AsString();
}