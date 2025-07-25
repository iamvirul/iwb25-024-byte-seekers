import ballerina/http;
import ballerina/mime;

public isolated function parseMultipartFormData(mime:Entity[]|http:ClientError bodyParts, map<any> formData) returns map<any>|error {
    if bodyParts is mime:Entity[] {
        foreach mime:Entity part in bodyParts {
            string partName = part.getContentDisposition().name;
            if part.getContentType().startsWith("image/") && validateImageFile(part) {
                byte[]|mime:ParserError byteArray = part.getByteArray();
                if byteArray is byte[] {
                    formData[partName] = byteArray;
                }
            } else {
                string|mime:ParserError text = part.getText();
                if text is string {
                    formData[partName] = text;
                }
            }
        }
    } else {
        return error("Failed to parse multipart request");
    }
    return formData;
}

public isolated function validateImageFile(mime:Entity part) returns boolean {
    string contentType = part.getContentType();
    if contentType == "image/jpeg" || contentType == "image/png" {
        return true;
    }
    return false;
}
