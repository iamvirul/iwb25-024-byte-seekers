import backend.common as Common;
import backend.db as DB;


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