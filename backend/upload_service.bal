import ballerina/http;
import ballerina/io;
import ballerina/mime;

service /upload on new http:Listener(9097) {

    resource function post uploadImage(http:Request req) returns http:Response|error {
        http:Response res = new;
        map<any> formData = {};

        // Parse multipart body parts from incoming request
        mime:Entity[]|http:ClientError bodyParts = check req.getBodyParts();
        if (bodyParts is mime:Entity[]) {
            foreach var part in bodyParts {
                string partName = part.getContentDisposition().name;
                if (part.getContentType().startsWith("image/")) {
                    byte[]|mime:ParserError byteArray = part.getByteArray();
                    if (byteArray is byte[]) {
                        formData[partName] = byteArray;
                    }
                } else {
                    string|mime:ParserError text = part.getText();
                    if (text is string) {
                        formData[partName] = text;
                    }
                }
            }
        } else {
            res.statusCode = 400;
            res.setPayload("Failed to parse multipart request");
            return res;
        }

        // Validate required fields
        if !formData.hasKey("metadata") || !formData.hasKey("file") {
            res.statusCode = 400;
            res.setPayload("Required fields 'metadata' or 'file' missing");
            return res;
        }

        // Extract metadata JSON and file bytes
        string metadataJson = <string>formData["metadata"];
        byte[] fileBytes = <byte[]>formData["file"];

        // Prepare GCS multipart/related request
        http:Client gcsClient = check new ("https://storage.googleapis.com");

        string boundary = "foo_bar_baz";

        string multipartBodyStart =
            "--" + boundary + "\r\n" +
            "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
            metadataJson + "\r\n" +
            "--" + boundary + "\r\n" +
            "Content-Type: image/jpeg\r\n\r\n";

        byte[] part1Bytes = multipartBodyStart.toBytes();
        string multipartBodyEnd = "\r\n--" + boundary + "--";
        byte[] partEndBytes = multipartBodyEnd.toBytes();

        // Combine multipart parts
        byte[] requestBody = [];
        requestBody.push(...part1Bytes);
        requestBody.push(...fileBytes);
        requestBody.push(...partEndBytes);

        // Create request for GCS
        http:Request gcsReq = new;
        gcsReq.setPayload(requestBody);
        // TODO: Replace with your valid OAuth2 token
        gcsReq.addHeader("Authorization", "Bearer ya29.c.c0ASRK0GZeORuJ3D9XAz5mfClhgXDc4vKdwHAGQPNSHsWnKaRcRFH-1gTM1NZPDpAdKl2if3WeQ0a6NBJ_yLO0SkVyRcz0gGpCjVH_ibkhoCOWOt0D2wHRv_SUY1X3pmV0M_6Ge_Kf-S8oeKFpR14HKjfwXkBPm8UsxaSnhRuGdEt9dBSFCtCBHxDXZcwXgRhY9T2A9ePfocEhQ0HwUow87ro0ATFTNv0Rx_GFSfLjMVdNSD7i_RRL7rJZI7i0ruBEO4dDbYMwXPKZMj1qqKgE2M8kHkA7biuxKjngEAYgE4RQatNvtZpS_5un4bZGTDfGLvQpW8OFUnSaeMNMcUjqEhszMSAEgr6z0ugbDtzx7vMG1_7zybdaMNO64Zg9Es1N9NosL397Pzz1mZoefXw82gxrO9qfdVMicMyMJ1Yv5StsRxlOh6uQl5kjJp0Fci7ga6r-YMdSFo07F9ytVgR6zBzzsYuJx8-oZSB21W7pIBFgxaXqwJszb4xBf9quZ3p0r5gZ7Fkoc6z1Qz8bFziI54g1y_8R5cd4V5hYmVB74nhdez__XZ_X4FwbFS2Urfss_d-ZUUjM4u2jmeZIMo7zxq0a8ejISha9i7vqogUX0BvgQnO5_zuSko7j8V38tym4OSYcWvU1JB-smmycIvqmrq9uqf96rpWw-4oS4beehX6bSaZ3Um-_Z49M7taM_jFZB-Uv-Uf3rk5naeslgy-eO_f_8bS4U4wd3vBlzouodz1wW_s0eU8OBehI112spriZUwJeBdFBtM5166Y2W96nRzX89vgss6rXuuy8ibaW9iaBRmv-MXbQOZ27y5Zqgb980pk3nrFy794fF9jUkSayOyuMnZl_IeMjM9_u-ZhkhWOfUwvQZIstkhIYs6fq4yUmrw2iWMr5SSmn2-ew7gmu1aBtI2j-W2IngO7Mun5r8o4nj-s98_e2a0ijwQM1UpjlXvOIewJrrSUzwOZW3wiI_7vS7qjt26ara23b4OyYvQQoeBa9qls4i8h");
        gcsReq.addHeader("Content-Type", "multipart/related; boundary=" + boundary);

        string bucketName = "quickroute-itinerary-generator.firebasestorage.app";
        string url = "/upload/storage/v1/b/" + bucketName + "/o?uploadType=multipart";

        http:Response gcsRes = check gcsClient->post(url, gcsReq);
        io:println("Response from GCS: ", gcsRes.getJsonPayload());

        if (gcsRes.statusCode == 401) {

        }

        // Return GCS response to client
        var gcsPayload = gcsRes.getJsonPayload();
        if (gcsPayload is json) {
            res.statusCode = gcsRes.statusCode;
            res.setJsonPayload(gcsPayload);
        } else {
            res.statusCode = gcsRes.statusCode;
            res.setPayload("Failed to parse response from Google Storage");
        }

        return res;
    }
}
