import ballerina/persist as _;
import ballerina/time;
import ballerinax/persist.sql;

public enum LegalPrecedentCourt {
    SUPREME_COURT = "SUPREME_COURT",
    APPELLATE_COURT = "APPELLATE_COURT",
    HIGH_COURT = "HIGH_COURT",
    DISTRICT_COURT = "DISTRICT_COURT"
}

public enum DisputeStatus {
    PENDING = "PENDING",
    RESOLVED = "RESOLVED"
}

public enum LandDocumentDocStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

public enum LandLandStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED"
}

@sql:Name {value: "lands_documents"}
public type LandDocument record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 60}
    string docPath;
    @sql:Varchar {length: 10}
    string docSize;
    @sql:Varchar {length: 45}
    string docType;
    time:Utc uploadedDate;
    LandDocumentDocStatus docStatus;
    @sql:Index {name: "fk_lands_documents_lands1_idx"}
    int landsId;
    @sql:Relation {keys: ["landsId"]}
    Land land;
|};

@sql:Name {value: "legal_precedents"}
public type LegalPrecedent record {|
    @sql:Generated
    readonly int id;
    time:Date year;
    @sql:Varchar {length: 100}
    string headline;
    LegalPrecedentCourt court;
    string decision;
    string summary;
    @sql:Index {name: "fk_legal_precedents_disputes1_idx"}
    int disputesId;
    LegalClause[] legalclauses;
    @sql:Relation {keys: ["disputesId"]}
    Dispute dispute;
|};

@sql:Name {value: "payment_history"}
public type PaymentHistory record {|
    @sql:Generated
    readonly int id;
    @sql:Decimal {precision: [10, 2]}
    decimal amount;
    @sql:Index {name: "fk_payment_history_users1_idx"}
    int usersId;
    @sql:Index {name: "fk_payment_history_legal_officer1_idx"}
    int legalOfficerId;
    time:Utc createdAt;
    @sql:Relation {keys: ["legalOfficerId"]}
    LegalOfficer legalofficer;
    @sql:Relation {keys: ["usersId"]}
    User user;
|};

@sql:Name {value: "users"}
public type User record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 100}
    string userId;
    @sql:Varchar {length: 50}
    string firstName;
    @sql:Varchar {length: 50}
    string lastName;
    @sql:Varchar {length: 200}
    string email;
    @sql:Varchar {length: 255}
    string password;
    byte[] nic;
    byte[]? sludi;
    byte[] contactNo;
    byte[]? address;
    Audit[] audits;
    Dispute[] disputes;
    PaymentHistory[] paymenthistories;
    UserHasUserType[] userhasusertypes;
|};

@sql:Name {value: "legal_clauses"}
public type LegalClause record {|
    @sql:Generated
    readonly int id;
    string legalClause;
    @sql:Index {name: "fk_legal_clauses_legal_precedents1_idx"}
    int legalPrecedentsId;
    @sql:Relation {keys: ["legalPrecedentsId"]}
    LegalPrecedent legalprecedent;
|};

@sql:Name {value: "disputes_document"}
public type DisputeDocument record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 100}
    string docPath;
    time:Utc uploadedDate;
    @sql:Index {name: "fk_disputes_document_disputes1_idx"}
    int disputesId;
    @sql:Relation {keys: ["disputesId"]}
    Dispute dispute;
|};

@sql:Name {value: "legal_officer"}
public type LegalOfficer record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "first_name"}
    @sql:Varchar {length: 50}
    string firstName;
    @sql:Name {value: "last_name"}
    @sql:Varchar {length: 50}
    string lastName;
    @sql:Name {value: "BASL_ID"}
    @sql:Varchar {length: 50}
    string baslId;
    @sql:Name {value: "initial_cost"}
    @sql:Decimal {precision: [10, 2]}
    decimal? initialCost;
    Dispute[] disputes;
    PaymentHistory[] paymenthistories;
|};

@sql:Name {value: "land_transfer_chain"}
public type LandTransferChain record {|
    @sql:Generated
    readonly int id;
    time:Civil transferDate;
    @sql:Varchar {length: 100}
    string verifiedBy;
    int blockIndex;
    @sql:Varchar {length: 128}
    string blockHash;
    @sql:Varchar {length: 128}
    string prevBlockHash;
    @sql:Index {name: "fk_land_transfer_chain_land_owners1_idx"}
    int fromLandOwnersId;
    @sql:Index {name: "fk_land_transfer_chain_land_owners2_idx"}
    int toLandOwnersId;
    @sql:Index {name: "fk_land_transfer_chain_lands1_idx"}
    int landsId;
    @sql:Relation {keys: ["fromLandOwnersId"]}
    LandOwner landowner;
    @sql:Relation {keys: ["toLandOwnersId"]}
    LandOwner landowner1;
    @sql:Relation {keys: ["landsId"]}
    Land land;
|};

@sql:Name {value: "land_owner"}
public type LandOwner record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 60}
    string ownerId;
    @sql:Varchar {length: 50}
    string firstName;
    @sql:Varchar {length: 50}
    string lastName;
    @sql:Varchar {length: 20}
    string nic;
    @sql:Varchar {length: 255}
    string? address;
    @sql:Varchar {length: 20}
    string? contactNo;
    LandTransferChain[] landtransferchains;
    LandTransferChain[] landtransferchains1;
|};

@sql:Name {value: "lands"}
public type Land record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 60}
    string landId;
    @sql:Varchar {length: 60}
    string landName;
    @sql:Varchar {length: 60}
    string landPlace;
    @sql:Decimal {precision: [9, 6]}
    decimal landLat;
    @sql:Decimal {precision: [9, 6]}
    decimal landLang;
    float landSize;
    @sql:Decimal {precision: [20, 6]}
    decimal landValue;
    @sql:Varchar {length: 45}
    string landType;
    time:Date registerDate;
    LandLandStatus landStatus;
    int priority;
    Dispute[] disputes;
    LandTransferChain[] landtransferchains;
    LandDocument[] landdocuments;
|};

@sql:Name {value: "audits"}
public type Audit record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 60}
    string requestPath;
    @sql:Varchar {length: 45}
    string requestMethod;
    @sql:Varchar {length: 100}
    string userAgent;
    string requestPayload;
    @sql:Varchar {length: 100}
    string requestHost;
    time:Civil requestedTime;
    @sql:Index {name: "fk_audits_users1_idx"}
    int usersId;
    @sql:Relation {keys: ["usersId"]}
    User user;
|};

@sql:Name {value: "dispute_comments"}
public type DisputeComment record {|
    @sql:Generated
    readonly int id;
    string comment;
    time:Utc createdAt;
    @sql:Index {name: "fk_dispute_comments_disputes1_idx"}
    int disputesId;
    @sql:Relation {keys: ["disputesId"]}
    Dispute dispute;
|};

@sql:Name {value: "users_has_user_types"}
public type UserHasUserType record {|
    @sql:Index {name: "fk_users_has_user_types_user_types1_idx"}
    readonly int userTypesId;
    @sql:Index {name: "fk_users_has_user_types_users1_idx"}
    readonly int usersId;
    @sql:Relation {keys: ["userTypesId"]}
    UserType usertype;
    @sql:Relation {keys: ["usersId"]}
    User user;
|};

@sql:Name {value: "disputes"}
public type Dispute record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 50}
    string caseId;
    @sql:Varchar {length: 60}
    string witnessName;
    string disputesDetails;
    @sql:Varchar {length: 45}
    string estimateTime;
    DisputeStatus status;
    time:Utc createdAt;
    @sql:Index {name: "fk_disputes_lands1_idx"}
    int landsId;
    @sql:Index {name: "fk_disputes_legal_officer1_idx"}
    int legalOfficerId;
    @sql:Index {name: "fk_disputes_users1_idx"}
    int usersId;
    DisputeComment[] disputecomments;
    @sql:Relation {keys: ["landsId"]}
    Land land;
    @sql:Relation {keys: ["legalOfficerId"]}
    LegalOfficer legalofficer;
    @sql:Relation {keys: ["usersId"]}
    User user;
    DisputeDocument[] disputedocuments;
    LegalPrecedent[] legalprecedents;
|};

@sql:Name {value: "user_types"}
public type UserType record {|
    @sql:Generated
    readonly int id;
    @sql:Varchar {length: 45}
    string userTypes;
    UserHasUserType[] userhasusertypes;
|};

