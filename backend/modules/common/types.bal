import backend.db as DB;

import ballerina/time;

public enum EVENTS {
    CREATED = "Created",
    UPDATED = "Updated",
    DELETED = "Deleted",
    STATUS_UPDATED = "Status Updated",
    DISPUTE_CREATED = "Dispute Created",
    DISPUTE_UPDATED = "Dispute Updated",
    PRECEDENT_CREATED = "Precedent Created",
    COMMENT_ADDED = "Comment Added",
    ESTIMATE_TIME_UPDATED = "Estimate Time Updated"
}

public type LoginUser record {
    string email;
    string password;
    int user_type;
};

public type LoginUserResponse record {|
    string token;
    string socketToken;
    int userId;
    string nic;
    string sludi;
    string email;
    string userType;
    anydata...;
|};

public type User record {|
    int id;
    string firstName;
    string lastName;
    string userId;
    string email;
    byte[] nic;
    byte[] sludi;
    byte[] contactNo;
    byte[]? address;
    string password;
    string user_status;
    string user_type;
|};

public type UserResponse record {|
    int id;
    string userId;
    string firstName;
    string lastName;
    string email;
    string password;
    string nic;
    string sludi;
    string contactNo;
    string address;
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
    int usersId;
    int userTypesId;
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

public type UpdateDisputeEstimateTime record {|
    string caseId;
    string estimateTime;
|};

public type RequestDsiputeComment record {|
    string caseId;
    string comment;
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
    DB:LandOwnerInsert? from_owner;
    DB:LandOwnerInsert to_owner;
    string verified_by;
    string transferDate;
|};

public type LandInsertResponse record {|
    int LandID;
    int ToOwnerID;
    int? FromOwnerID;
    string TransferDate;
    string VerifiedBy;
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
    int userId;
};

public type DisputeWithDocs record {|
    DB:Dispute dispute;
    DB:DisputeDocument?[] documents;
    DB:Land land;
    string user;
|};

public type UserDisputesWithDocs record {|
    DB:Dispute dispute;
    DB:DisputeDocument?[] documents;
    DB:Land land;
    string user;
    DB:DisputeComment[] comments;
    LegalPrecedentWithLegalClauses[] legalPrecedent;
|};

public type LegalPrecedentWithLegalClauses record {|
    int? id;
    time:Date? year;
    string? headline;
    DB:LegalPrecedentCourt? court;
    string? decision;
    string? summary;
    int? disputesId;
    DB:LegalClauseOptionalized[]? legalClauses;
|};

public type Dispute record {|
    int id;
    string caseId;
    string witnessName;
    string disputesDetails;
    string estimateTime;
    DB:DisputeStatus status;
    DB:Land land;
    int legalOfficerId;
    time:Utc createdAt;
|};

public type LandTransferChain record {|
    readonly int id;
    time:Civil transferDate;
    string verifiedBy;
    int blockIndex;
    string blockHash;
    string prevBlockHash;
    int fromLandOwnersId?;
    int toLandOwnersId;
    int landsId;
|};

public type RequestPrecedent record {|
    string caseId;
    string year;
    string headline;
    string court;
    string decision;
    string summary;
    string[] legalClauses;
|};

public type CountResult record {
    int total;
};

public type LandOwnerDisputeStats record {
    int pendingCount;
    int resolvedCount;
};

public type DisputeMessage record {|
    DB:DisputeInsert disputeInsert;
    FileRecord[] documents;
    int retryCount = 0;
|};

public type DisputeEstimateTimeMessage record {|
    DB:Dispute dispute;
    string estimateTime;
    int retryCount = 0;
|};

public type DisputeCommentMessage record {|
    DB:DisputeCommentInsert dispute;
    int retryCount = 0;
    int userId;
    string contact;
    string caseId;
|};

public type LegalPrecedentMessage record {|
    DB:LegalPrecedentInsert legalPrecedent;
    string[] legalClauses;
    int retryCount = 0;
    int legalOfficerId;
    int userId;
|};

public type LegalPrecedent record {|
    readonly int id;
    int disputesId;
    time:Date year;
    string headline;
    DB:LegalPrecedentCourt court;
    string decision;
    string summary;
    DB:LegalClause[] legalclauses;
    Dispute dispute;
|};

public type socketMessage record {|
    EVENTS event;
    json message;
|};

public type LegalOfficerStats record {|
    int pending;
    int rejected;
    int resolved;
    int legalPrecedents;
|};

public type statDataLandOfficer record {|
    string pending_lands;
    string registered_today;
    string rejected_lands;
    string accepted_lands;
|};

public type DisputeSocketAdded record {|
    DB:DisputeInsert dispute;
    DB:DisputeDocumentInsert[] documents;
|};

public type LegalPrecedentAdded record {|
    DB:LegalPrecedentInsert precedent;
    DB:LegalClauseInsert[] clauses;
|};

public type UpdatePassword record {|
    string oldPassword;
    string newPassword;
|};

public type UpdateProfile record {|
    anydata...;
|};

public type LandOwnerStats record {|
    int ownerId;
    string firstName;
    string lastName;
    int transfersSent;
    int transfersReceived;
    int currentLandsOwned;
|};

public type DisputeStats record {|
    int usersId;
    int total_disputes;
    int pending_disputes;
    int resolved_disputes;
    int total_comments;
|};

public type UserSession record {|
    string socketToken;
    string serviceToken;
    string userId;
|};