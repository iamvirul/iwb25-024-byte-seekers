import backend.common;
import backend.db as DB;
import backend.utils as Utils;

import ballerina/http;
import ballerina/persist;
import ballerina/sql;

listener http:Listener publicMicroservice = new (9085);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET"],
        allowCredentials: true
    }
}
service /lands on publicMicroservice {
    private final DB:Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    function __deinit() returns error? {
        check self.dbClient.close();
    }

    resource function get all() returns error|http:Response {
        http:Response response = new;
        DB:LandWithRelations[] lands = [];
        stream<DB:LandWithRelations, persist:Error?> landsResult = self.dbClient->/lands(DB:LandWithRelations);

        check from var land in landsResult
            do {
                lands.push(land);
            };
        check landsResult.close();
        if lands.length() == 0 {
            response.statusCode = 404;
            response = Utils:setErrorResponse(response, Utils:NO_LANDS_FOUND);
        } else {
            response.statusCode = 200;
            response = Utils:setSuccessResponse(response, {"lands": lands.toJson()});
        }
        return response;
    }

    resource function get chain/[int landId]() returns error|http:Response {
        http:Response response = new;
        sql:ParameterizedQuery query = `SELECT 
  ltc.id,
  ltc.transferDate,
  ltc.verifiedBy,
  ltc.blockIndex,
  ltc.blockHash,
  ltc.prevBlockHash,

  -- fromLandOwner
  flo.id AS from_id,
  flo.ownerId AS from_ownerId,
  flo.firstName AS from_firstName,
  flo.lastName AS from_lastName,
  flo.nic AS from_nic,
  flo.address AS from_address,
  flo.contactNo AS from_contactNo,

  -- toLandOwner
  tlo.id AS to_id,
  tlo.ownerId AS to_ownerId,
  tlo.firstName AS to_firstName,
  tlo.lastName AS to_lastName,
  tlo.nic AS to_nic,
  tlo.address AS to_address,
  tlo.contactNo AS to_contactNo

FROM land_transfer_chain ltc
LEFT JOIN land_owner flo ON ltc.fromLandOwnersId = flo.id
INNER JOIN land_owner tlo ON ltc.toLandOwnersId = tlo.id
WHERE ltc.landsId = ${landId}
ORDER BY ltc.blockIndex`;

        stream<common:LandTransfer, persist:Error?> queryNativeSQL = self.dbClient->queryNativeSQL(query, common:LandTransfer);
        common:LandTransfer[] resultList = [];
        check from var chain in queryNativeSQL
            do {
                resultList.push(chain);
            };
        check queryNativeSQL.close();

        DB:LandOptionalized|persist:Error landResult = self.dbClient->/lands/[landId](DB:LandOptionalized);
        if landResult is persist:Error {
            if landResult is persist:NotFoundError {
                response.statusCode = 404;
                response = Utils:setErrorResponse(response, Utils:LAND_NOT_FOUND);
                return response;
            }
            response.statusCode = 500;
            response = Utils:setErrorResponse(response, Utils:FAILED_TO_FETCH_LAND);
            return response;
        }

        response = Utils:setSuccessResponse(response, {"land": landResult.toJson(),"chain": resultList.toJson()});
        return response;
    }
}
