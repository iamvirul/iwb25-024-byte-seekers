import ballerina/crypto;
import ballerina/mime;
public function decryptData(byte[] cipherText) returns string|error {
    byte[] base64DecodeBlob = check mime:base64DecodeBlob(cipherText);
    crypto:KeyStore keyStore = {
        path: "resources/certificates/RSA/truststore.p12",
        password: "MUKCF1WQgSyTHN3JMB5R7ZZ9GC59R1X2"
    };
    crypto:PrivateKey privateKey = check crypto:decodeRsaPrivateKeyFromKeyStore(keyStore, "byteseekers", "MUKCF1WQgSyTHN3JMB5R7ZZ9GC59R1X2");
    byte[] plainText = check crypto:decryptRsaEcb(base64DecodeBlob, privateKey);
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
    byte[] base64EncodeBlob = check mime:base64EncodeBlob(cipherText);
    return base64EncodeBlob;
}