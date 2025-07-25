import backend.db as DB;

import ballerina/time;

public type LoginUser record {
    string email;
    string password;
    int user_type;
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
    int user_type;
|};

public type ValidationResult record {|
    boolean isValid;
    map<string> errors;
|};

public type UserHasTypes record {|
    int users_id;
    int user_types_id;
|};

public type Land record {|
    int id;
    string landId;
    string landName;
    string landPlace;
    decimal landLat;
    decimal landLang;
    float landSize;
    decimal landValue;
    string landType;
    time:Date registerDate;
    DB:LandLandStatus landStatus;
    int priority;
|};

public type LegalOfficer record {|
    int id;
    string firstName;
    string lastName;
    string baslId;
    decimal? initialCost;
|};

public type RequestDispute record {|
    string witnessName;
    string disputesDetails;
    int landsId;
    int legalOfficerId;
|};

public type Dispute record {|
    int id;
    string caseId;
    string witnessName;
    string disputesDetails;
    string estimateTime;
    DB:DisputeStatus status;
    int landsId;
    int legalOfficerId;
    time:Utc createdAt;
|};

public type UpdateDisputeEstimateTime record {|
    string caseId;
    string estimateTime;
|};

public type LandCreate record {|
    string landId;
    string landName;
    string landPlace;
    decimal landLat;
    decimal landLang;
    float landSize;
    decimal landValue;
    string landType;
    time:Date registerDate;
    DB:LandLandStatus landStatus;
    int priority;
    DB:LandOwnerInsert from_owner;
    DB:LandOwnerInsert to_owner;
|};

public type FileRecord record {
    string filename;
    string contentType;
    byte[] data;
};

public type DisputeForm record {
    FileRecord[] documents;
    string witnessName;
    string disputesDetails;
    int landsId;
    int legalOfficerId;
};

public type DisputeWithDocs record {|
    DB:Dispute dispute;
    DB:DisputeDocument? [] documents;
|};