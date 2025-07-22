import ballerina/http;
import ballerina/regex;
import backend.common as Common;

public function setErrorResponse(http:Response response, string|json message) returns http:Response {
    response.setJsonPayload({"success": false, "content": message});
    return response;
}

public function setSuccessResponse(http:Response response, string|json message) returns http:Response {
    response.setJsonPayload({"success": true, "content": message});
    return response;
}

public function getUserType(string userType) returns USER_TYPES | error {
    match userType {
        "land_owner" => {return LAND_OWNER;}
        "land_officer" => {return LAND_OFFICER;}
        "admin" => {return ADMIN;}
        _ => {return error("Invalid user type");}
        
    }
}

public function validateRegisterUser(Common:RequestUser user) returns Common:ValidationResult {
    map<string> errorMsg = {};
    boolean errorFlag = false;

    if user.first_name == "" {
        errorFlag = true;
        errorMsg["first_name"] = FNAME_REQUIRED;
    } else if user.first_name.length() > 45 {
        errorFlag = true;
        errorMsg["first_name"] = FNAME_LENGTH;
    }

    if user.last_name == "" {
        errorFlag = true;
        errorMsg["last_name"] = LNAME_REQUIRED;
    } else if user.last_name.length() > 45 {
        errorFlag = true;
        errorMsg["last_name"] = LNAME_LENGTH;
    }

    if user.email == "" {
        errorFlag = true;
        errorMsg["email"] = EMAIL_REQUIRED;
    } else if user.email.length() > 200 {
        errorFlag = true;
        errorMsg["email"] = EMAIL_LENGTH;
    } else if !regex:matches(user.email, EMAIL_REGEX) {
        errorFlag = true;
        errorMsg["email"] = EMAIL_INVALID_FORMAT;
    }

    if user.password == "" {
        errorFlag = true;
        errorMsg["password"] = PASSWORD_REQUIRED;
    } else if !regex:matches(user.password, PASSWORD_REGEX) {
        errorFlag = true;
        errorMsg["password"] = PASSWORD_LENGTH;
    }

    if user.nic == "" {
        errorFlag = true;
        errorMsg["nic"] = NIC_REQUIRED;
    } else if !regex:matches(user.nic, NIC_REGEX) {
        errorFlag = true;
        errorMsg["nic"] = NIC_INVALID_FORMAT;
    }

    if user.contact_no == "" {
        errorFlag = true;
        errorMsg["contact_no"] = CONTACT_NO_REQUIRED;
    } else if !regex:matches(user.contact_no, MOBILE_REGEX) {
        errorFlag = true;
        errorMsg["contact_no"] = CONTACT_NO_INVALID_FORMAT;
    }

    if user.address == "" {
        errorFlag = true;
        errorMsg["address"] = ADDRESS_REQUIRED;
    } else if user.address.length() > 200 {
        errorFlag = true;
        errorMsg["address"] = ADDRESS_LENGTH;
    }

    if user.sludi == "" {
        errorFlag = true;
        errorMsg["sludi"] = SLUDI_REQUIRED;
    } else if user.sludi.length() > 45 {
        errorFlag = true;
        errorMsg["sludi"] = SLUDI_LENGTH;
    }

    return {
        isValid: !errorFlag,
        errors: errorMsg
    };
}

public function validateLoginUser(Common:LoginUser user) returns Common:ValidationResult {
    map<string> errorMsg = {};
    boolean errorFlag = false;

    if user.email == "" {
        errorFlag = true;
        errorMsg["email"] = EMAIL_REQUIRED;
    }

    if user.password == "" {
        errorFlag = true;
        errorMsg["password"] = PASSWORD_REQUIRED;
    }

    return {
        isValid: !errorFlag,
        errors: errorMsg
    };
}
