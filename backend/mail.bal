import ballerina/crypto;
import ballerina/io;

public function main() {
    string input = "Hello Ballerina";
    byte[]|error signature = encryptData(input);
    if (signature is byte[]) {
        io:print(signature);
        string|error decryptResult = decrypt(signature);
        if (decryptResult is string) {
            io:println("Decrypted data: ", decryptResult);
        } else {
            io:println("Decryption failed: ", decryptResult.message());
        }
    }
    if signature is error {
        io:println("Error occurred: ", signature.message());
    }
}

public function decrypt(byte[] cipherText) returns string|error {
    crypto:KeyStore keyStore = {
        path: "resources/certificates/RSA/truststore.p12",
        password: "MUKCF1WQgSyTHN3JMB5R7ZZ9GC59R1X2"
    };
    crypto:PrivateKey privateKey = check crypto:decodeRsaPrivateKeyFromKeyStore(keyStore, "byteseekers", "MUKCF1WQgSyTHN3JMB5R7ZZ9GC59R1X2");
    byte[] plainText = check crypto:decryptRsaEcb(cipherText, privateKey);
    string message = check string:fromBytes(plainText);
    return message;
}

public function encryptData(string input) returns byte[]|error {
    byte[] data = input.toBytes();
    crypto:KeyStore keyStore = {
        path: "resources/certificates/RSA/truststore.p12",
        password: "MUKCF1WQgSyTHN3JMB5R7ZZ9GC59R1X2"
    };
    crypto:PublicKey publicKey = check crypto:decodeRsaPublicKeyFromTrustStore(keyStore, "byteseekers");
    byte[] cipherText = check crypto:encryptRsaEcb(data, publicKey);
    return cipherText;
}
