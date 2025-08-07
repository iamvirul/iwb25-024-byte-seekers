import backend.common as Common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/crypto;
import ballerina/time;
import ballerina/uuid;

public function landInsertMapper(Common:LandCreate landInsert) returns DB:LandInsert {
    return {
        landId: landInsert.landId,
        landName: landInsert.landName,
        landPlace: landInsert.landPlace,
        landLat: landInsert.landLat,
        landLang: landInsert.landLang,
        landSize: landInsert.landSize,
        landValue: landInsert.landValue,
        landType: landInsert.landType,
        registerDate: landInsert.registerDate,
        landStatus: landInsert.landStatus,
        priority: landInsert.priority
    };

}

public function disputeInsertMapper(Common:DisputeForm parsed, string caseId) returns DB:DisputeInsert {
    return {
        witnessName: parsed.witnessName,
        disputesDetails: parsed.disputesDetails,
        landsId: parsed.landsId,
        legalOfficerId: parsed.legalOfficerId,
        status: DB:PENDING,
        caseId: caseId,
        estimateTime: "",
        createdAt: time:utcNow(),
        usersId: parsed.userId
    };
}

public function legalPrecedentInsertMapper(Common:RequestPrecedent requestPrecedent, DB:Dispute dispute) returns DB:LegalPrecedentInsert|error {
    time:Date dateFromYear = check Utils:dateFromYear(requestPrecedent.year);
    return {
        year: {year: dateFromYear.year, month: dateFromYear.month, day: dateFromYear.day},
        headline: requestPrecedent.headline,
        court: check Utils:getCourtType(requestPrecedent.court),
        decision: requestPrecedent.decision,
        summary: requestPrecedent.summary,
        disputesId: dispute.id
    };
}

public function requestUserInsertMapper(Common:RequestUser requestUser) returns DB:UserInsert|error {
    string hash_password = check crypto:hashArgon2(requestUser.password);
    string userUUID = uuid:createType4AsString();
    string userId = "LCLO-" + userUUID;
    byte[] encryptNIC = check Utils:encryptData(requestUser.nic);
    byte[] encryptSludi = check Utils:encryptData(requestUser.sludi);
    byte[] encryptContactNo = check Utils:encryptData(requestUser.contact_no);
    byte[] encryptAddress = check Utils:encryptData(requestUser.address);

    return {
        userId: userId,
        firstName: requestUser.first_name,
        lastName: requestUser.last_name,
        email: requestUser.email,
        password: hash_password,
        nic: encryptNIC,
        sludi: encryptSludi,
        contactNo: encryptContactNo,
        address: encryptAddress
    };
}
