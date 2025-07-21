public type LoginRequest record {
    string email;
    string password;
};

public type User record {|
    int id;
    string first_name;
    string last_name;
    string user_id;
    string email;
    string nic;
    string password;
    string contact_no;
    string address;
    string user_status;
    string sludi;
    string user_type;
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