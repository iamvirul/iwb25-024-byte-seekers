import backend.common as Common;

import ballerina/http;
import ballerina/mime;

const int MAX_DOCUMENT_BYTES = 20000000;

public isolated function parseDisputeMultipartFormData(mime:Entity[]|http:ClientError bodyParts) returns Common:DisputeForm|error {
    Common:FileRecord[] docs = [];
    string witness = "";
    string details = "";
    int lands = 0;
    int officer = 0;

    if bodyParts is mime:Entity[] {
        foreach var part in bodyParts {
            string fieldName = part.getContentDisposition().name;
            if fieldName == "documents" {
                string fname = part.getContentDisposition().fileName;
                string ctype = part.getContentType();
                byte[] data = checkpanic part.getByteArray();
                docs.push({filename: fname, contentType: ctype, data: data});
            } else {
                string txt = checkpanic part.getText();
                match fieldName {
                    "witnessName" => {
                        witness = txt;
                    }
                    "disputesDetails" => {
                        details = txt;
                    }
                    "landsId" => {
                        lands = checkpanic int:fromString(txt);
                    }
                    "legalOfficerId" => {
                        officer = checkpanic int:fromString(txt);
                    }
                }
            }
        }
    } else {
        return error("Failed to parse multipart request: not mime:Entity[]");
    }

    return {
        documents: docs,
        witnessName: witness,
        disputesDetails: details,
        landsId: lands,
        legalOfficerId: officer
    };
}

public isolated function parseLandDocumentMultipartFormData(mime:Entity[]|http:ClientError bodyParts) returns Common:FileRecord[]|error {
    Common:FileRecord[] docs = [];

    if bodyParts is mime:Entity[] {
        foreach var part in bodyParts {
            string fieldName = part.getContentDisposition().name;
            if fieldName == "documents" {
                string fname = part.getContentDisposition().fileName;
                string ctype = part.getContentType();
                byte[] data = checkpanic part.getByteArray();
                docs.push({filename: fname, contentType: ctype, data: data});
            } else {
                return error("Unexpected field: " + fieldName);
            }
        }
    } else {
        return error("Failed to parse multipart request: not mime:Entity[]");
    }

    return docs;
}
