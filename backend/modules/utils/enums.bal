public enum REGEXS {
    EMAIL_REGEX = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$",
    PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    DATETIME_REGEX = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$"
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
    PASSWORD_UPDATED = "Password updated successfully"
}

public enum COMMON_ERROR_MESSAGES {
    UNAUTHORIZED_REQUEST = "Unauthorized Request",
    INVALID_CONTENT_TYPE = "Invalid Content Type",
    INVALID_MULTIPART_REQUEST = "Invalid multipart request",
    REQUIRED_FIELDS_MISSING = "Required fields are missing"
}
