import ballerina/time;
import ballerina/regex;
public isolated function getOrderId() returns string {
    time:Civil civilTime = time:utcToCivil(time:utcNow());
    string currentTimeString = civilTime.hour.toString() + civilTime.minute.toString() + civilTime.second.toString();
    string[] spliited = regex:split(currentTimeString, "\\.");
    string timeMil = spliited[0] + "" + spliited[1];
    return "ORDER-"+timeMil;
}