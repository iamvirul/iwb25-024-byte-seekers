import ballerina/http;
import ballerina/regex;

public function setErrorResponse(http:Response response, string|json message) returns http:Response {
    response.setJsonPayload({"success": false, "content": message});
    return response;
}
public function setSuccessResponse(http:Response response, string|json message) returns http:Response {
    response.setJsonPayload({"success": true, "content": message});
    return response;
}
public function validateRegisterUser(RequestUser user) returns ValidationResult {
    map<string> errorMsg = {};
    boolean errorFlag = false;

    if user.first_name is "" {
        errorFlag = true;
        errorMsg["first_name"] = FNAME_REQUIRED;
    } else if user.first_name.length() > 45 {
        errorFlag = true;
        errorMsg["first_name"] = FNAME_LENGTH;
    }

    if user.last_name is "" {
        errorFlag = true;
        errorMsg["last_name"] = LNAME_REQUIRED;
    } else if user.last_name.length() > 45 {
        errorFlag = true;
        errorMsg["last_name"] = LNAME_LENGTH;
    }

    if user.email is "" {
        errorFlag = true;
        errorMsg["email"] = EMAIL_REQUIRED;
    } else if user.email.length() > 200 {
        errorFlag = true;
        errorMsg["email"] = EMAIL_LENGTH;
    } else if !regex:matches(user.email, EMAIL_REGEX) {
        errorFlag = true;
        errorMsg["email"] = EMAIL_INVALID_FORMAT;
    }

    if user.password is "" {
        errorFlag = true;
        errorMsg["password"] = PASSWORD_REQUIRED;
    } else if !regex:matches(user.password, PASSWORD_REGEX) {
        errorFlag = true;
        errorMsg["password"] = PASSWORD_LENGTH;
    }

    return {
        isValid: !errorFlag,
        errors: errorMsg
    };
}