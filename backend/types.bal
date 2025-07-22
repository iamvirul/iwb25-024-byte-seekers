public type LoginUser record {
    string email;
    string password;
    string user_type;
};

public type User record {|
    int id;
    string first_name;
    string last_name;
    string user_id;
    string email;
    byte[] nic;
    byte[] sludi;
    byte[] contactNo;
    byte[]? address;
    string password;
    string contact_no;
    string user_status;
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
