import ballerina/persist as _;
import ballerina/time;
import ballerinax/persist.sql;

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

@sql:Name {value: "lands_documents"}
public type LandDocument record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "doc_id"}
    @sql:Varchar {length: 60}
    string docId;
    @sql:Name {value: "doc_name"}
    @sql:Varchar {length: 60}
    string docName;
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
    byte[] sludi;
    @sql:Name {value: "contact_no"}
    byte[] contactNo;
    byte[]? address;
    @sql:Name {value: "user_status"}
    UserUserStatus userStatus;
    @sql:Name {value: "user_type"}
    UserUserType userType;
    Land[] lands;
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

@sql:Name {value: "lands"}
public type Land record {|
    @sql:Generated
    readonly int id;
    @sql:Name {value: "_hashId"}
    @sql:Varchar {length: 60}
    string hashId;
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
    @sql:Name {value: "land_owner_id"}
    @sql:Index {name: "fk_lands_users_idx"}
    int landOwnerId;
    @sql:Relation {keys: ["landOwnerId"]}
    User user;
    LandDocument[] landdocuments;
|};

