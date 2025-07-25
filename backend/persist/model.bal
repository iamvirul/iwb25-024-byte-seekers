import ballerina/persist as _;
import ballerina/time;
import ballerinax/persist.sql;

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

@sql:Name {value: "lands_documents"}
public type LandDocument record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "doc_path"}
    @sql:Varchar {length: 60}
    string docPath;
    @sql:Name {value: "doc_size"}
    @sql:Varchar {length: 10}
    string docSize;
    @sql:Name {value: "doc_type"}
    @sql:Varchar {length: 45}
    string docType;
    @sql:Name {value: "uploaded_date"}
    time:Utc uploadedDate;
    @sql:Name {value: "doc_status"}
    LandDocumentDocStatus docStatus;
    @sql:Name {value: "lands_id"}
    @sql:Index {name: "fk_lands_documents_lands1_idx"}
    int landsId;
    @sql:Name {value: "nlp_analysis_result_id"}
    @sql:Index {name: "fk_lands_documents_nlp_analysis_result1_idx"}
    int? nlpAnalysisResultId;
    @sql:Relation {keys: ["landsId"]}
    Land land;
    @sql:Relation {keys: ["nlpAnalysisResultId"]}
    NlpAnalysisResult nlpanalysisresult;
|};

@sql:Name {value: "legal_precedents"}
public type LegalPrecedent record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "disputes_id"}
    @sql:Index {name: "fk_legal_precedents_disputes1_idx"}
    int disputesId;
    time:Date year;
    @sql:Varchar {length: 100}
    string headline;
    LegalPrecedentCourt court;
    string decision;
    string summary;
    LegalClause[] legalclauses;
    @sql:Relation {keys: ["disputesId"]}
    Dispute dispute;
|};

@sql:Name {value: "users"}
public type User record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "user_id"}
    @sql:Varchar {length: 100}
    string userId;
    @sql:Name {value: "first_name"}
    @sql:Varchar {length: 50}
    string firstName;
    @sql:Name {value: "last_name"}
    @sql:Varchar {length: 50}
    string lastName;
    @sql:Varchar {length: 200}
    string email;
    @sql:Varchar {length: 255}
    string password;
    byte[] nic;
    byte[]? sludi;
    @sql:Name {value: "contact_no"}
    byte[] contactNo;
    byte[]? address;
    UserHasUserType[] userhasusertypes;
|};

@sql:Name {value: "legal_clauses"}
public type LegalClause record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "legal_clause"}
    string legalClause;
    @sql:Name {value: "legal_precedents_id"}
    @sql:Index {name: "fk_legal_clauses_legal_precedents1_idx"}
    int legalPrecedentsId;
    @sql:Relation {keys: ["legalPrecedentsId"]}
    LegalPrecedent legalprecedent;
|};

@sql:Name {value: "disputes_document"}
public type DisputeDocument record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "doc_path"}
    @sql:Varchar {length: 100}
    string docPath;
    @sql:Name {value: "uploaded_date"}
    time:Utc uploadedDate;
    @sql:Name {value: "disputes_id"}
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
|};

@sql:Name {value: "land_transfer_chain"}
public type LandTransferChain record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "lands_id"}
    @sql:Index {name: "fk_land_transfer_chain_lands1_idx"}
    int landsId;
    @sql:Name {value: "from_land_owners_id"}
    @sql:Index {name: "fk_land_transfer_chain_land_owners1_idx"}
    int? fromLandOwnersId;
    @sql:Name {value: "to_land_owners_id"}
    @sql:Index {name: "fk_land_transfer_chain_land_owners2_idx"}
    int toLandOwnersId;
    @sql:Name {value: "transfer_date"}
    time:Civil transferDate;
    @sql:Name {value: "verified_by"}
    @sql:Varchar {length: 100}
    string verifiedBy;
    @sql:Name {value: "block_index"}
    int blockIndex;
    @sql:Name {value: "block_hash"}
    @sql:Varchar {length: 128}
    string blockHash;
    @sql:Name {value: "prev_block_hash"}
    @sql:Varchar {length: 128}
    string prevBlockHash;
    @sql:Relation {keys: ["fromLandOwnersId"]}
    LandOwner landowner;
    @sql:Relation {keys: ["toLandOwnersId"]}
    LandOwner landowner1;
    @sql:Relation {keys: ["landsId"]}
    Land land;
|};

@sql:Name {value: "nlp_analysis_result"}
public type NlpAnalysisResult record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "_hashId"}
    @sql:Varchar {length: 60}
    string hashId;
    string? results;
    @sql:Name {value: "result_summary"}
    string? resultSummary;
    @sql:Varchar {length: 60}
    string? tags;
    @sql:Varchar {length: 20}
    string? trust;
    LandDocument[] landdocuments;
|};

@sql:Name {value: "land_owner"}
public type LandOwner record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "owner_id"}
    @sql:Varchar {length: 60}
    string ownerId;
    @sql:Name {value: "first_name"}
    @sql:Varchar {length: 50}
    string firstName;
    @sql:Name {value: "last_name"}
    @sql:Varchar {length: 50}
    string lastName;
    @sql:Varchar {length: 20}
    string nic;
    @sql:Varchar {length: 255}
    string? address;
    @sql:Name {value: "contact_no"}
    @sql:Varchar {length: 20}
    string? contactNo;
    LandTransferChain[] landtransferchains;
    LandTransferChain[] landtransferchains1;
|};

@sql:Name {value: "lands"}
public type Land record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "land_id"}
    @sql:Varchar {length: 60}
    string landId;
    @sql:Name {value: "land_name"}
    @sql:Varchar {length: 60}
    string landName;
    @sql:Name {value: "land_place"}
    @sql:Varchar {length: 60}
    string landPlace;
    @sql:Name {value: "land_lat"}
    @sql:Decimal {precision: [9, 6]}
    decimal landLat;
    @sql:Name {value: "land_lang"}
    @sql:Decimal {precision: [9, 6]}
    decimal landLang;
    @sql:Name {value: "land_size"}
    float landSize;
    @sql:Name {value: "land_value"}
    @sql:Decimal {precision: [20, 6]}
    decimal landValue;
    @sql:Name {value: "land_type"}
    @sql:Varchar {length: 45}
    string landType;
    @sql:Name {value: "register_date"}
    time:Date registerDate;
    @sql:Name {value: "land_status"}
    LandLandStatus landStatus;
    int priority;
    Dispute[] disputes;
    LandTransferChain[] landtransferchains;
    LandDocument[] landdocuments;
|};

@sql:Name {value: "dispute_comments"}
public type DisputeComment record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "disputes_id"}
    @sql:Index {name: "fk_dispute_comments_disputes1_idx"}
    int disputesId;
    string comment;
    @sql:Name {value: "created_at"}
    time:Utc createdAt;
    @sql:Relation {keys: ["disputesId"]}
    Dispute dispute;
|};

@sql:Name {value: "users_has_user_types"}
public type UserHasUserType record {|
    @sql:Name {value: "users_id"}
    @sql:Index {name: "fk_users_has_user_types_users1_idx"}
    readonly int usersId;
    @sql:Name {value: "user_types_id"}
    @sql:Index {name: "fk_users_has_user_types_user_types1_idx"}
    readonly int userTypesId;
    @sql:Relation {keys: ["userTypesId"]}
    UserType usertype;
    @sql:Relation {keys: ["usersId"]}
    User user;
|};

@sql:Name {value: "disputes"}
public type Dispute record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "case_id"}
    @sql:Varchar {length: 50}
    string caseId;
    @sql:Name {value: "lands_id"}
    @sql:Index {name: "fk_disputes_lands1_idx"}
    int landsId;
    @sql:Name {value: "witness_name"}
    @sql:Varchar {length: 60}
    string witnessName;
    @sql:Name {value: "disputes_details"}
    string disputesDetails;
    @sql:Name {value: "legal_officer_id"}
    @sql:Index {name: "fk_disputes_legal_officer1_idx"}
    int legalOfficerId;
    @sql:Name {value: "estimate_time"}
    @sql:Varchar {length: 45}
    string? estimateTime;
    DisputeStatus status;
    @sql:Name {value: "created_at"}
    time:Utc createdAt;
    DisputeComment[] disputecomments;
    @sql:Relation {keys: ["landsId"]}
    Land land;
    @sql:Relation {keys: ["legalOfficerId"]}
    LegalOfficer legalofficer;
    DisputeDocument[] disputedocuments;
    LegalPrecedent[] legalprecedents;
|};

@sql:Name {value: "user_types"}
public type UserType record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "user_types"}
    @sql:Varchar {length: 45}
    string userTypes;
    UserHasUserType[] userhasusertypes;
|};

