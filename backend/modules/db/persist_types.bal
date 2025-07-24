// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

import ballerina/time;

public enum LegalPrecedentCourt {
    SUPREME_COURT = "SUPREME_COURT",
    APPELLATE_COURT = "APPELLATE_COURT",
    HIGH_COURT = "HIGH_COURT",
    DISTRICT_COURT = "DISTRICT_COURT"
}

public enum LandDocumentDocStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

public enum DisputeStatus {
    PENDING = "PENDING",
    RESOLVED = "RESOLVED",
    REJECTED = "REJECTED"
}

public enum LandLandStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED"
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

public type LegalPrecedent record {|
    readonly int id;
    time:Date year;
    string headline;
    LegalPrecedentCourt court;
    string decision;
    string summary;

    int disputesId;
|};

public type LegalPrecedentOptionalized record {|
    int id?;
    time:Date year?;
    string headline?;
    LegalPrecedentCourt court?;
    string decision?;
    string summary?;
    int disputesId?;
|};

public type LegalPrecedentWithRelations record {|
    *LegalPrecedentOptionalized;
    LegalClauseOptionalized[] legalclauses?;
    DisputeOptionalized dispute?;
|};

public type LegalPrecedentTargetType typedesc<LegalPrecedentWithRelations>;

public type LegalPrecedentInsert record {|
    time:Date year;
    string headline;
    LegalPrecedentCourt court;
    string decision;
    string summary;
    int disputesId;
|};

public type LegalPrecedentUpdate record {|
    time:Date year?;
    string headline?;
    LegalPrecedentCourt court?;
    string decision?;
    string summary?;
    int disputesId?;
|};

public type User record {|
    readonly int id;
    string userId;
    string firstName;
    string lastName;
    string email;
    string password;
    byte[] nic;
    byte[]? sludi;
    byte[] contactNo;
    byte[]? address;

|};

public type UserOptionalized record {|
    int id?;
    string userId?;
    string firstName?;
    string lastName?;
    string email?;
    string password?;
    byte[] nic?;
    byte[]? sludi?;
    byte[] contactNo?;
    byte[]? address?;
|};

public type UserWithRelations record {|
    *UserOptionalized;
    UserHasUserTypeOptionalized[] userhasusertypes?;
|};

public type UserTargetType typedesc<UserWithRelations>;

public type UserInsert record {|
    string userId;
    string firstName;
    string lastName;
    string email;
    string password;
    byte[] nic;
    byte[]? sludi;
    byte[] contactNo;
    byte[]? address;
|};

public type UserUpdate record {|
    string userId?;
    string firstName?;
    string lastName?;
    string email?;
    string password?;
    byte[] nic?;
    byte[]? sludi?;
    byte[] contactNo?;
    byte[]? address?;
|};

public type LegalClause record {|
    readonly int id;
    string legalClause;
    int legalPrecedentsId;
|};

public type LegalClauseOptionalized record {|
    int id?;
    string legalClause?;
    int legalPrecedentsId?;
|};

public type LegalClauseWithRelations record {|
    *LegalClauseOptionalized;
    LegalPrecedentOptionalized legalprecedent?;
|};

public type LegalClauseTargetType typedesc<LegalClauseWithRelations>;

public type LegalClauseInsert record {|
    string legalClause;
    int legalPrecedentsId;
|};

public type LegalClauseUpdate record {|
    string legalClause?;
    int legalPrecedentsId?;
|};

public type DisputeDocument record {|
    readonly int id;
    string docId;
    string docName;
    time:Utc uploadedDate;
    int disputesId;
|};

public type DisputeDocumentOptionalized record {|
    int id?;
    string docId?;
    string docName?;
    time:Utc uploadedDate?;
    int disputesId?;
|};

public type DisputeDocumentWithRelations record {|
    *DisputeDocumentOptionalized;
    DisputeOptionalized dispute?;
|};

public type DisputeDocumentTargetType typedesc<DisputeDocumentWithRelations>;

public type DisputeDocumentInsert record {|
    string docId;
    string docName;
    time:Utc uploadedDate;
    int disputesId;
|};

public type DisputeDocumentUpdate record {|
    string docId?;
    string docName?;
    time:Utc uploadedDate?;
    int disputesId?;
|};

public type LegalOfficer record {|
    readonly int id;
    string firstName;
    string lastName;
    string baslId;
    decimal? initialCost;

|};

public type LegalOfficerOptionalized record {|
    int id?;
    string firstName?;
    string lastName?;
    string baslId?;
    decimal? initialCost?;
|};

public type LegalOfficerWithRelations record {|
    *LegalOfficerOptionalized;
    DisputeOptionalized[] disputes?;
|};

public type LegalOfficerTargetType typedesc<LegalOfficerWithRelations>;

public type LegalOfficerInsert record {|
    string firstName;
    string lastName;
    string baslId;
    decimal? initialCost;
|};

public type LegalOfficerUpdate record {|
    string firstName?;
    string lastName?;
    string baslId?;
    decimal? initialCost?;
|};

public type LandTransferChain record {|
    readonly int id;
    time:Civil transferDate;
    string verifiedBy;
    int blockIndex;
    string blockHash;
    string prevBlockHash;
    int fromLandOwnersId;
    int toLandOwnersId;
    int landsId;
|};

public type LandTransferChainOptionalized record {|
    int id?;
    time:Civil transferDate?;
    string verifiedBy?;
    int blockIndex?;
    string blockHash?;
    string prevBlockHash?;
    int fromLandOwnersId?;
    int toLandOwnersId?;
    int landsId?;
|};

public type LandTransferChainWithRelations record {|
    *LandTransferChainOptionalized;
    LandOwnerOptionalized landowner?;
    LandOwnerOptionalized landowner1?;
    LandOptionalized land?;
|};

public type LandTransferChainTargetType typedesc<LandTransferChainWithRelations>;

public type LandTransferChainInsert record {|
    time:Civil transferDate;
    string verifiedBy;
    int blockIndex;
    string blockHash;
    string prevBlockHash;
    int fromLandOwnersId;
    int toLandOwnersId;
    int landsId;
|};

public type LandTransferChainUpdate record {|
    time:Civil transferDate?;
    string verifiedBy?;
    int blockIndex?;
    string blockHash?;
    string prevBlockHash?;
    int fromLandOwnersId?;
    int toLandOwnersId?;
    int landsId?;
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

public type LandOwner record {|
    readonly int id;
    string ownerId;
    string firstName;
    string lastName;
    string nic;
    string? address;
    string? contactNo;

|};

public type LandOwnerOptionalized record {|
    int id?;
    string ownerId?;
    string firstName?;
    string lastName?;
    string nic?;
    string? address?;
    string? contactNo?;
|};

public type LandOwnerWithRelations record {|
    *LandOwnerOptionalized;
    LandTransferChainOptionalized[] landtransferchains?;
    LandTransferChainOptionalized[] landtransferchains1?;
|};

public type LandOwnerTargetType typedesc<LandOwnerWithRelations>;

public type LandOwnerInsert record {|
    string ownerId;
    string firstName;
    string lastName;
    string nic;
    string? address;
    string? contactNo;
|};

public type LandOwnerUpdate record {|
    string ownerId?;
    string firstName?;
    string lastName?;
    string nic?;
    string? address?;
    string? contactNo?;
|};

public type Land record {|
    readonly int id;
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

|};

public type LandOptionalized record {|
    int id?;
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
|};

public type LandWithRelations record {|
    *LandOptionalized;
    DisputeOptionalized[] disputes?;
    LandTransferChainOptionalized[] landtransferchains?;
    LandDocumentOptionalized[] landdocuments?;
|};

public type LandTargetType typedesc<LandWithRelations>;

public type LandInsert record {|
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
|};

public type LandUpdate record {|
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
|};

public type UserHasUserType record {|
    int userTypesId;
    int usersId;
|};

public type UserHasUserTypeOptionalized record {|
    int userTypesId?;
    int usersId?;
|};

public type UserHasUserTypeWithRelations record {|
    *UserHasUserTypeOptionalized;
    UserTypeOptionalized usertype?;
    UserOptionalized user?;
|};

public type UserHasUserTypeTargetType typedesc<UserHasUserTypeWithRelations>;

public type UserHasUserTypeInsert UserHasUserType;

public type UserHasUserTypeUpdate record {|
    int userTypesId?;
    int usersId?;
|};

public type Dispute record {|
    readonly int id;
    string caseId;
    string witnessName;
    string disputesDetails;
    string estimateTime;
    DisputeStatus status;
    time:Utc createdAt;
    int landsId;
    int legalOfficerId;

|};

public type DisputeOptionalized record {|
    int id?;
    string caseId?;
    string witnessName?;
    string disputesDetails?;
    string estimateTime?;
    DisputeStatus status?;
    time:Utc createdAt?;
    int landsId?;
    int legalOfficerId?;
|};

public type DisputeWithRelations record {|
    *DisputeOptionalized;
    LandOptionalized land?;
    LegalOfficerOptionalized legalofficer?;
    DisputeDocumentOptionalized[] disputedocuments?;
    LegalPrecedentOptionalized[] legalprecedents?;
|};

public type DisputeTargetType typedesc<DisputeWithRelations>;

public type DisputeInsert record {|
    string caseId;
    string witnessName;
    string disputesDetails;
    string estimateTime;
    DisputeStatus status;
    time:Utc createdAt;
    int landsId;
    int legalOfficerId;
|};

public type DisputeUpdate record {|
    string caseId?;
    string witnessName?;
    string disputesDetails?;
    string estimateTime?;
    DisputeStatus status?;
    time:Utc createdAt?;
    int landsId?;
    int legalOfficerId?;
|};

public type UserType record {|
    readonly int id;
    string userTypes;

|};

public type UserTypeOptionalized record {|
    int id?;
    string userTypes?;
|};

public type UserTypeWithRelations record {|
    *UserTypeOptionalized;
    UserHasUserTypeOptionalized[] userhasusertypes?;
|};

public type UserTypeTargetType typedesc<UserTypeWithRelations>;

public type UserTypeInsert record {|
    string userTypes;
|};

public type UserTypeUpdate record {|
    string userTypes?;
|};

