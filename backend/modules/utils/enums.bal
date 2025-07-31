public enum REGEXS {
    EMAIL_REGEX = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$",
    PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    DATETIME_REGEX = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$",
    NIC_REGEX = "^(?:\\d{9}[VXvx]|\\d{12})$",
    MOBILE_REGEX = "^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$"
}

public enum USER_STATUS {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
    BLOCKED = "BLOCKED"
}

public enum USER_TYPES {
    ADMIN = "ADMIN",
    LAND_OWNER = "LAND_OWNER",
    LAND_OFFICER = "LAND_OFFICER",
    LEGAL_OFFICER = "LEGAL_OFFICER"
}

public enum EMAIL_ERRORS {
    EMAIL_LENGTH = "Email should not exceed 200",
    EMAIL_REQUIRED = "Email is required",
    EMAIL_ALREADY_EXISTS = "Email already exists",
    EMAIL_NOT_FOUND = "Email not found",
    EMAIL_INVALID_FORMAT = "Invalid email format"
}

public enum FNAME_ERRORS {
    FNAME_LENGTH = "First name should not exceed 45",
    FNAME_REQUIRED = "First name is required"
}

public enum LNAME_ERRORS {
    LNAME_LENGTH = "Last name should not exceed 45",
    LNAME_REQUIRED = "Last name is required"
}

public enum PASSWORD_ERRORS {
    PASSWORD_LENGTH = "Password should be minimum 8 characters in length, shouldcontain at least one uppercase letter, one lowercase letter, at  least one digit and at least one special character",
    PASSWORD_REQUIRED = "Password is required",
    INCORRECT_OLD_PASSWORD = "Old password is incorrect",
    USER_NOT_FOUND = "User not found",
    PASSWORD_UPDATED = "Password updated successfully",
    INVALID_PASSWORD = "Invalid password"
}

public enum NIC_ERRORS {
    NIC_LENGTH = "NIC should be 9 or 12 characters in length",
    NIC_REQUIRED = "NIC is required",
    NIC_INVALID_FORMAT = "Invalid NIC format",
    NIC_ALREADY_EXISTS = "NIC already exists"
}

public enum CONTACT_NO_ERRORS {
    CONTACT_NO_LENGTH = "Contact number should be 10 digits",
    CONTACT_NO_REQUIRED = "Contact number is required",
    CONTACT_NO_INVALID_FORMAT = "Invalid contact number format"
}

public enum ADDRESS_ERRORS {
    ADDRESS_LENGTH = "Address should not exceed 200 characters",
    ADDRESS_REQUIRED = "Address is required"
}

public enum SLUDI_ERRORS {
    SLUDI_LENGTH = "SLUDI should not exceed 45 characters",
    SLUDI_REQUIRED = "SLUDI is required"
}

public enum COMMON_ERROR_MESSAGES {
    UNAUTHORIZED_REQUEST = "Unauthorized Request",
    INVALID_CONTENT_TYPE = "Invalid Content Type",
    INVALID_MULTIPART_REQUEST = "Invalid multipart request",
    REQUIRED_FIELDS_MISSING = "Required fields are missing"
}

public enum LAND_ERRORS {
    LAND_NAME_REQUIRED = "Land name is required",
    LAND_NAME_LENGTH = "Land name should not exceed 100 characters",
    LAND_ALREADY_EXISTS = "Land already exists",
    LAND_INSERT_SUCCESS = "Land inserted successfully",
    LAND_UPDATE_SUCCESS = "Land updated successfully",
    LAND_DELETE_SUCCESS = "Land deleted successfully",
    LAND_NOT_FOUND = "Land not found",
    PLACE_REQUIRED = "Place is required",
    PLACE_LENGTH = "Place should not exceed 100 characters",
    LATITUDE_INVALID = "Invalid latitude value",
    LONGITUDE_INVALID = "Invalid longitude value",
    LAND_SIZE_INVALID = "Invalid land size value",
    LAND_VALUE_INVALID = "Invalid land value",
    LAND_TYPE_REQUIRED = "Land type is required",
    PRIORITY_INVALID = "Priority must be zero or positive",
    FAILED_TO_REGISTER_LAND = "Failed to register land",
    FAILED_TO_FETCH_LANDS = "Failed to fetch lands",
    NO_LANDS_FOUND = "No lands found",
    INVALID_LAND_ID = "Invalid land ID",
    FAILED_TO_UPDATE_LAND_STATUS = "Failed to update land status",
    INVALID_LAND_STATUS = "Invalid land status"
}

public enum LAND_OWNER_ERRORS {
    LAND_OWNER_ALREADY_EXISTS = "Land owner already exists",
    FAILED_TO_REGISTER_LAND_OWNER = "Failed to register land owner",
    LAND_OWNER_NOT_FOUND = "Land owner not found",
    NO_LAND_OWNERS_FOUND = "No land owners found"
}

public enum DISPUTE_ERRORS {
    LAND_ID_REQUIRED = "Land ID is required",
    LEGAL_OFFICER_ID_REQUIRED = "Legal officer ID is required",
    WITNESS_NAME_LENGTH = "Witness name should not exceed 60 characters",
    WITNESS_NAME_REQUIRED = "Witness name is required",
    DISPUTES_DETAILS_REQUIRED = "Disputes details are required",
    FAILED_TO_FETCH_LAND = "Failed to fetch land",
    LEGAL_OFFICER_NOT_FOUND = "Legal officer not found",
    FAILED_TO_FETCH_LEGAL_OFFICER = "Failed to fetch legal officer",
    INVALID_LEGAL_OFFICER_ID = "Invalid legal officer ID",
    INVALID_CASE_ID = "Invalid case ID",
    FAILED_TO_UPDATE_DISPUTE = "Failed to update dispute",
    DISPUTE_ESTIMATE_TIME_UPDATED = "Dispute estimate time updated successfully",
    FAILED_TO_ADD_DISPUTE_DOCUMENT = "Failed to add dispute document",
    FAILED_TO_ADD_COMMENT = "Failed to add comment",
    FAILED_TO_ADD_PRECEDENT = "Failed to add precedent",
    FAILED_TO_ADD_LEGAL_CLAUSE = "Failed to add legal clause",
    FAILED_TO_FETCH_STATS = "Failed to fetch stats",
    FAILED_TO_QUEUE_DISPUTE = "Failed to queue dispute",
    FAILED_TO_QUEUE_DISPUTE_ESTIMATE_TIME = "Failed to queue dispute estimate time",
    FAILED_TO_QUEUE_DISPUTE_COMMENT = "Failed to queue dispute comment",
    FAILED_TO_QUEUE_PRECEDENT = "Failed to queue precedent",
    USER_ID_REQUIRED = "User ID is required",
    FAILED_TO_FETCH_USER = "Failed to fetch user",
    INVALID_USER_ID = "Invalid user ID",
    NO_DISPUTES_FOUND = "No disputes found",
    NO_LANDS_FOUND = "No lands found",
    DISPUTE_NOT_FOUND = "Dispute not found",
    FAILED_TO_FETCH_DISPUTE = "Failed to fetch dispute",
    FAILED_TO_FETCH_DISPUTES = "Failed to fetch disputes",
    FAILED_TO_UPDATE_DISPUTE_STATUS = "Failed to update dispute status",
    LEGAL_PRECEDENT_NOT_FOUND = "Legal precedent not found"
}

public enum DOCUMENT_ERRORS {
    FAILED_TO_UPLOAD_DOCUMENT = "Failed to upload document",
    DOCUMENTS_REQUIRED = "Documents are required",
    DOCUMENT_SIZE_EXCEEDED = "Document size exceeded",
    INVALID_DOCUMENT_TYPE = "Invalid document type",
    DOCUMENT_ALREADY_EXISTS = "Document already exists",
    FAILED_TO_FETCH_DOCUMENT = "Failed to fetch document",
    LAND_DOCUMENT_NOT_FOUND = "Document not found",
    FAILED_TO_UPDATE_DOCUMENT = "Failed to update document",
    DOCUMENT_UPDATED = "Document updated successfully"
}

public enum USER_ERRORS {
    USER_ALREADY_EXISTS = "User already exists",
    FAILED_TO_REGISTER_USER = "Failed to register user",
    USER_NOT_FOUND = "User not found",
    NO_USERS_FOUND = "No users found",
    USER_ID_REQUIRED = "User ID is required",
    INVALID_USER_ID = "Invalid user ID",
    FAILED_TO_FETCH_USER = "Failed to fetch user",
    FAILED_TO_UPDATE_USER = "Failed to update user",
    USER_UPDATED = "User updated successfully",
    FAILED_TO_UPDATE_USER_STATUS = "Failed to update user status",
    INVALID_USER_STATUS = "Invalid user status",
    FAILED_TO_FETCH_STATS = "Failed to fetch stats",
    FAILED_TO_QUEUE_USER = "Failed to queue user",
    FAILED_TO_QUEUE_USER_STATUS = "Failed to queue user status",
    FAILED_TO_QUEUE_USER_PASSWORD = "Failed to queue user password",
    FAILED_TO_QUEUE_USER_ADDRESS = "Failed to queue user address",
    FAILED_TO_QUEUE_USER_NIC = "Failed to queue user nic",
    FAILED_TO_QUEUE_USER_SLUDI = "Failed to queue user sludi",
    FAILED_TO_QUEUE_USER_CONTACT_NO = "Failed to queue user contact no",
    FAILED_TO_QUEUE_USER_EMAIL = "Failed to queue user email",
    FAILED_TO_QUEUE_USER_FNAME = "Failed to queue user fname",
    FAILED_TO_QUEUE_USER_LNAME = "Failed to queue user lname"
}