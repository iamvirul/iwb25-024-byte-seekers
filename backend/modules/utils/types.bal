public type ValidationResult record {|
    boolean isValid;
    map<string> errors;
|};

public type RequestUser record {|
    string first_name;
    string last_name;
    string email;
    string nic;
    string password;
    string contact_no;
    string address;
    string sludi;
|};

public type LoginUser record {
    string email;
    string password;
};
