import ballerina/crypto;
import ballerina/io;

public function generatePayHereHash(string merchantId, string orderId, decimal amount, string currency, string merchantSecret) returns string {
    decimal rounded = decimal:round(amount, 2);
    string amountStr = rounded.toString();
    io:println("Formatted amount: ", amountStr);

    byte[] secretBytes = merchantSecret.toBytes();
    byte[] secretMd5 = crypto:hashMd5(secretBytes);
    string secretMd5Hex = secretMd5.toBase16().toUpperAscii();

    string toHash = merchantId + orderId + amountStr + currency + secretMd5Hex;

    byte[] hashBytes = crypto:hashMd5(toHash.toBytes());
    string hashHex = hashBytes.toBase16().toUpperAscii();

    return hashHex;
}
