public type DBConnection record {|
    string host;
    int port;
    string user;
    string password;
    string database;
|};

public type User record {|
    int id;
    string fname;
    string lname;
    string nic;
    string sludi;
|};

