import backend.common as Common;
import backend.db as DB;
import ballerina/time;

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
        createdAt: time:utcNow()
    };
}
