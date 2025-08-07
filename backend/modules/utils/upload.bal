import ballerina/regex;
import backend.gcs;

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

public function uploadFile(byte[] data, string baseName, string extension)
    returns string|error {
    string name = regex:replace(baseName, "\\s+", "_") + extension;
    string storagePath = check gcs:uploadGCS(data,name);
    return storagePath;
}
