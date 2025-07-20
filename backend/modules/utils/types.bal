public type ValidationResult record {|
    boolean isValid;
    map<string> errors;
|};

public type RequestUser record {|
    string first_name;
    string last_name;
    string email;
    string password;
|};

