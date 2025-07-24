import ballerina/http;
import ballerina/regex;
import backend.common as Common;
import backend.db as DB;

public function setErrorResponse(http:Response response, string|json message) returns http:Response {
    response.setJsonPayload({"success": false, "content": message});
    return response;
}

public function setSuccessResponse(http:Response response, string|json message) returns http:Response {
    response.setJsonPayload({"success": true, "content": message});
    return response;
}

public function getUserType(int userType) returns USER_TYPES | error {
    match userType {
        1 => {return ADMIN;}
        2 => {return LAND_OWNER;}
        3 => {return LAND_OFFICER;}
        4 => {return LEGAL_OFFICER;}
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

public function validateLandInsert(DB:LandInsert landInsert) returns Common:ValidationResult {
    map<string> errorMsg = {};
    boolean errorFlag = false;
    if landInsert.landName == "" {
        errorFlag = true;
        errorMsg["name"] = LAND_NAME_REQUIRED;
    } else if landInsert.landName.length() > 100 {
        errorFlag = true;
        errorMsg["name"] = LAND_NAME_LENGTH;
    }
    if landInsert.landPlace == "" {
        errorFlag = true;
        errorMsg["place"] = PLACE_REQUIRED;
    } else if landInsert.landPlace.length() > 100 {
        errorFlag = true;
        errorMsg["place"] = PLACE_LENGTH;
    }
    if landInsert.landLat < -90.0d || landInsert.landLat > 90.0d {
        errorFlag = true;
        errorMsg["lat"] = LATITUDE_INVALID;
    }
    if landInsert.landLang < -180.0d || landInsert.landLang > 180.0d {
        errorFlag = true;
        errorMsg["lang"] = LONGITUDE_INVALID;
    }
    if landInsert.landSize <= 0.0 {
        errorFlag = true;
        errorMsg["size"] = LAND_SIZE_INVALID;
    }
    if landInsert.landValue < 0.0d {
        errorFlag = true;
        errorMsg["value"] = LAND_VALUE_INVALID;
    }
    if landInsert.landType == "" {
        errorFlag = true;
        errorMsg["type"] = LAND_TYPE_REQUIRED;
    }
    if landInsert.priority < 0 {
        errorFlag = true;
        errorMsg["priority"] = PRIORITY_INVALID;
    }

    return {
        isValid: !errorFlag,
        errors: errorMsg
    };
}

public function validateDisputeInsert(Common:RequestDispute requestDispute) returns Common:ValidationResult {
    map<string> errorMsg = {};
    boolean errorFlag = false;
    if requestDispute.disputesDetails == "" {
        errorFlag = true;
        errorMsg["disputesDetails"] = DISPUTES_DETAILS_REQUIRED;
    } 
    if requestDispute.witnessName == "" {
        errorFlag = true;
        errorMsg["witnessName"] = WITNESS_NAME_REQUIRED;
    } else if requestDispute.witnessName.length() > 60 {
        errorFlag = true;
        errorMsg["witnessName"] = WITNESS_NAME_LENGTH;
    }
    if requestDispute.legalOfficerId <=0 {
        errorFlag = true;
        errorMsg["legalOfficerId"] = LEGAL_OFFICER_ID_REQUIRED;
    }
    if requestDispute.landsId <= 0 {
        errorFlag = true;
        errorMsg["landsId"] = LAND_ID_REQUIRED;
    }
    return {
        isValid: !errorFlag,
        errors: errorMsg
    };
}

public function validateDisputeEstimateTime(Common:UpdateDisputeEstimateTime updateRequest) returns Common:ValidationResult {
    map<string> errorMsg = {};
    boolean errorFlag = false;
    
    if updateRequest.caseId == "" {
        errorFlag = true;
        errorMsg["caseId"] = "Case ID is required";
    }
    
    if updateRequest.estimateTime == "" {
        errorFlag = true;
        errorMsg["estimateTime"] = "Estimate time is required";
    }
    
    return {
        isValid: !errorFlag,
        errors: errorMsg
    };
}
