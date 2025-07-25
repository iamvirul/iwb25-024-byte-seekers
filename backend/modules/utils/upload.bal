import ballerina/io;
import ballerina/regex;

public function getExtension(string contentType, string originalName) returns string {
    if contentType == "application/pdf" {
        return ".pdf";
    } else if contentType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" {
        return ".docx";
    } else if contentType.startsWith("image/") {
        string subtype = regex:split(contentType, "/")[1];
        return subtype == "jpeg" ? ".jpg" : "." + subtype;
    } else if originalName.includes(".") {
        int? lastIndexOf = originalName.lastIndexOf(".");
        return originalName.substring(<int>lastIndexOf);
    }
    return "";
}

public isolated function uploadFile(byte[] data, string path, string baseName, string extension)
    returns string|error {
    string name = regex:replace(baseName, "\\s+", "_") + extension;
    string dest = "./uploads/" + path + name;
    check io:fileWriteBytes(dest, data);
    return path + name;
}
