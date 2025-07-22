// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

import ballerina/time;

public enum LandDocumentDocStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

public enum UserUserStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

public enum LandLandStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED"
}

public enum UserUserType {
    LAND_OWNER = "LAND_OWNER",
    LAND_OFFICER = "LAND_OFFICER",
    ADMIN = "ADMIN"
}

public type LandDocument record {|
    readonly int id;
    string docId;
    string docName;
    string docSize;
    string docType;
    time:Utc uploadedDate;
    LandDocumentDocStatus docStatus;
    int landsId;
    int nlpAnalysisResultId;
|};

public type LandDocumentOptionalized record {|
    int id?;
    string docId?;
    string docName?;
    string docSize?;
    string docType?;
    time:Utc uploadedDate?;
    LandDocumentDocStatus docStatus?;
    int landsId?;
    int nlpAnalysisResultId?;
|};

public type LandDocumentWithRelations record {|
    *LandDocumentOptionalized;
    LandOptionalized land?;
    NlpAnalysisResultOptionalized nlpanalysisresult?;
|};

public type LandDocumentTargetType typedesc<LandDocumentWithRelations>;

public type LandDocumentInsert record {|
    string docId;
    string docName;
    string docSize;
    string docType;
    time:Utc uploadedDate;
    LandDocumentDocStatus docStatus;
    int landsId;
    int nlpAnalysisResultId;
|};

public type LandDocumentUpdate record {|
    string docId?;
    string docName?;
    string docSize?;
    string docType?;
    time:Utc uploadedDate?;
    LandDocumentDocStatus docStatus?;
    int landsId?;
    int nlpAnalysisResultId?;
|};

public type User record {|
    readonly int id;
    string userId;
    string firstName;
    string lastName;
    string email;
    string password;
    byte[] nic;
    byte[] sludi;
    byte[] contactNo;
    byte[]? address;
    UserUserStatus userStatus;
    UserUserType userType;

|};

public type UserOptionalized record {|
    int id?;
    string userId?;
    string firstName?;
    string lastName?;
    string email?;
    string password?;
    byte[] nic?;
    byte[] sludi?;
    byte[] contactNo?;
    byte[]? address?;
    UserUserStatus userStatus?;
    UserUserType userType?;
|};

public type UserWithRelations record {|
    *UserOptionalized;
    LandOptionalized[] lands?;
|};

public type UserTargetType typedesc<UserWithRelations>;

public type UserInsert record {|
    string userId;
    string firstName;
    string lastName;
    string email;
    string password;
    byte[] nic;
    byte[] sludi;
    byte[] contactNo;
    byte[]? address;
    UserUserStatus userStatus;
    UserUserType userType;
|};

public type UserUpdate record {|
    string userId?;
    string firstName?;
    string lastName?;
    string email?;
    string password?;
    byte[] nic?;
    byte[] sludi?;
    byte[] contactNo?;
    byte[]? address?;
    UserUserStatus userStatus?;
    UserUserType userType?;
|};

public type NlpAnalysisResult record {|
    readonly int id;
    string hashId;
    string? results;
    string? resultSummary;
    string? tags;
    string? trust;

|};

public type NlpAnalysisResultOptionalized record {|
    int id?;
    string hashId?;
    string? results?;
    string? resultSummary?;
    string? tags?;
    string? trust?;
|};

public type NlpAnalysisResultWithRelations record {|
    *NlpAnalysisResultOptionalized;
    LandDocumentOptionalized[] landdocuments?;
|};

public type NlpAnalysisResultTargetType typedesc<NlpAnalysisResultWithRelations>;

public type NlpAnalysisResultInsert record {|
    string hashId;
    string? results;
    string? resultSummary;
    string? tags;
    string? trust;
|};

public type NlpAnalysisResultUpdate record {|
    string hashId?;
    string? results?;
    string? resultSummary?;
    string? tags?;
    string? trust?;
|};

public type Land record {|
    readonly int id;
    string hashId;
    string landId;
    string landName;
    string landPlace;
    decimal landLat;
    decimal landLang;
    float landSize;
    decimal landValue;
    string landType;
    time:Date registerDate;
    LandLandStatus landStatus;
    int priority;
    int landOwnerId;

|};

public type LandOptionalized record {|
    int id?;
    string hashId?;
    string landId?;
    string landName?;
    string landPlace?;
    decimal landLat?;
    decimal landLang?;
    float landSize?;
    decimal landValue?;
    string landType?;
    time:Date registerDate?;
    LandLandStatus landStatus?;
    int priority?;
    int landOwnerId?;
|};

public type LandWithRelations record {|
    *LandOptionalized;
    UserOptionalized user?;
    LandDocumentOptionalized[] landdocuments?;
|};

public type LandTargetType typedesc<LandWithRelations>;

public type LandInsert record {|
    string hashId;
    string landId;
    string landName;
    string landPlace;
    decimal landLat;
    decimal landLang;
    float landSize;
    decimal landValue;
    string landType;
    time:Date registerDate;
    LandLandStatus landStatus;
    int priority;
    int landOwnerId;
|};

public type LandUpdate record {|
    string hashId?;
    string landId?;
    string landName?;
    string landPlace?;
    decimal landLat?;
    decimal landLang?;
    float landSize?;
    decimal landValue?;
    string landType?;
    time:Date registerDate?;
    LandLandStatus landStatus?;
    int priority?;
    int landOwnerId?;
|};

