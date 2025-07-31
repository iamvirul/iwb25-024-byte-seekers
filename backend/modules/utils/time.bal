import ballerina/lang.'int;
import ballerina/time;

public function dateFromYear(string s) returns time:Date|error {
    int y = check int:'fromString(s.trim());
    return {year: y, month: 1, day: 1};
}


