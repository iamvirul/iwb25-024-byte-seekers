type LoginRequest record {
    string username;
    string password;
};

type User record {|
    int id;
    string user_id;
    string first_name;
    string last_name;
    string email;
    string nic;
    string username;
    string password;
    string contact_no;
    string address;
    string user_status;
    string sludi;
    string user_type;
|};
