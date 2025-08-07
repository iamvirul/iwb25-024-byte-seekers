// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const LAND_DOCUMENT = "landdocuments";
const LEGAL_PRECEDENT = "legalprecedents";
const PAYMENT_HISTORY = "paymenthistories";
const USER = "users";
const LEGAL_CLAUSE = "legalclauses";
const DISPUTE_DOCUMENT = "disputedocuments";
const LEGAL_OFFICER = "legalofficers";
const LAND_TRANSFER_CHAIN = "landtransferchains";
const LAND_OWNER = "landowners";
const LAND = "lands";
const AUDIT = "audits";
const DISPUTE_COMMENT = "disputecomments";
const USER_HAS_USER_TYPE = "userhasusertypes";
const DISPUTE = "disputes";
const USER_TYPE = "usertypes";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [LAND_DOCUMENT]: {
            entityName: "LandDocument",
            tableName: "lands_documents",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                docPath: {columnName: "docPath"},
                docSize: {columnName: "docSize"},
                docType: {columnName: "docType"},
                uploadedDate: {columnName: "uploadedDate"},
                docStatus: {columnName: "docStatus"},
                landsId: {columnName: "landsId"},
                "land.id": {relation: {entityName: "land", refField: "id"}},
                "land.landId": {relation: {entityName: "land", refField: "landId"}},
                "land.landName": {relation: {entityName: "land", refField: "landName"}},
                "land.landPlace": {relation: {entityName: "land", refField: "landPlace"}},
                "land.landLat": {relation: {entityName: "land", refField: "landLat"}},
                "land.landLang": {relation: {entityName: "land", refField: "landLang"}},
                "land.landSize": {relation: {entityName: "land", refField: "landSize"}},
                "land.landValue": {relation: {entityName: "land", refField: "landValue"}},
                "land.landType": {relation: {entityName: "land", refField: "landType"}},
                "land.registerDate": {relation: {entityName: "land", refField: "registerDate"}},
                "land.landStatus": {relation: {entityName: "land", refField: "landStatus"}},
                "land.priority": {relation: {entityName: "land", refField: "priority"}}
            },
            keyFields: ["id"],
            joinMetadata: {land: {entity: Land, fieldName: "land", refTable: "lands", refColumns: ["id"], joinColumns: ["landsId"], 'type: psql:ONE_TO_MANY}}
        },
        [LEGAL_PRECEDENT]: {
            entityName: "LegalPrecedent",
            tableName: "legal_precedents",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                year: {columnName: "year"},
                headline: {columnName: "headline"},
                court: {columnName: "court"},
                decision: {columnName: "decision"},
                summary: {columnName: "summary"},
                disputesId: {columnName: "disputesId"},
                "legalclauses[].id": {relation: {entityName: "legalclauses", refField: "id"}},
                "legalclauses[].legalClause": {relation: {entityName: "legalclauses", refField: "legalClause"}},
                "legalclauses[].legalPrecedentsId": {relation: {entityName: "legalclauses", refField: "legalPrecedentsId"}},
                "dispute.id": {relation: {entityName: "dispute", refField: "id"}},
                "dispute.caseId": {relation: {entityName: "dispute", refField: "caseId"}},
                "dispute.witnessName": {relation: {entityName: "dispute", refField: "witnessName"}},
                "dispute.disputesDetails": {relation: {entityName: "dispute", refField: "disputesDetails"}},
                "dispute.estimateTime": {relation: {entityName: "dispute", refField: "estimateTime"}},
                "dispute.status": {relation: {entityName: "dispute", refField: "status"}},
                "dispute.createdAt": {relation: {entityName: "dispute", refField: "createdAt"}},
                "dispute.landsId": {relation: {entityName: "dispute", refField: "landsId"}},
                "dispute.legalOfficerId": {relation: {entityName: "dispute", refField: "legalOfficerId"}},
                "dispute.usersId": {relation: {entityName: "dispute", refField: "usersId"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                legalclauses: {entity: LegalClause, fieldName: "legalclauses", refTable: "legal_clauses", refColumns: ["legalPrecedentsId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                dispute: {entity: Dispute, fieldName: "dispute", refTable: "disputes", refColumns: ["id"], joinColumns: ["disputesId"], 'type: psql:ONE_TO_MANY}
            }
        },
        [PAYMENT_HISTORY]: {
            entityName: "PaymentHistory",
            tableName: "payment_history",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                referanceNo: {columnName: "referanceNo"},
                amount: {columnName: "amount"},
                createdAt: {columnName: "createdAt"},
                legalOfficerId: {columnName: "legalOfficerId"},
                usersId: {columnName: "usersId"},
                "legalofficer.id": {relation: {entityName: "legalofficer", refField: "id"}},
                "legalofficer.firstName": {relation: {entityName: "legalofficer", refField: "firstName", refColumn: "first_name"}},
                "legalofficer.lastName": {relation: {entityName: "legalofficer", refField: "lastName", refColumn: "last_name"}},
                "legalofficer.baslId": {relation: {entityName: "legalofficer", refField: "baslId", refColumn: "BASL_ID"}},
                "legalofficer.initialCost": {relation: {entityName: "legalofficer", refField: "initialCost", refColumn: "initial_cost"}},
                "user.id": {relation: {entityName: "user", refField: "id"}},
                "user.userId": {relation: {entityName: "user", refField: "userId"}},
                "user.firstName": {relation: {entityName: "user", refField: "firstName"}},
                "user.lastName": {relation: {entityName: "user", refField: "lastName"}},
                "user.email": {relation: {entityName: "user", refField: "email"}},
                "user.password": {relation: {entityName: "user", refField: "password"}},
                "user.nic": {relation: {entityName: "user", refField: "nic"}},
                "user.sludi": {relation: {entityName: "user", refField: "sludi"}},
                "user.contactNo": {relation: {entityName: "user", refField: "contactNo"}},
                "user.address": {relation: {entityName: "user", refField: "address"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                legalofficer: {entity: LegalOfficer, fieldName: "legalofficer", refTable: "legal_officer", refColumns: ["id"], joinColumns: ["legalOfficerId"], 'type: psql:ONE_TO_MANY},
                user: {entity: User, fieldName: "user", refTable: "users", refColumns: ["id"], joinColumns: ["usersId"], 'type: psql:ONE_TO_MANY}
            }
        },
        [USER]: {
            entityName: "User",
            tableName: "users",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                userId: {columnName: "userId"},
                firstName: {columnName: "firstName"},
                lastName: {columnName: "lastName"},
                email: {columnName: "email"},
                password: {columnName: "password"},
                nic: {columnName: "nic"},
                sludi: {columnName: "sludi"},
                contactNo: {columnName: "contactNo"},
                address: {columnName: "address"},
                "audits[].id": {relation: {entityName: "audits", refField: "id"}},
                "audits[].requestPath": {relation: {entityName: "audits", refField: "requestPath"}},
                "audits[].requestMethod": {relation: {entityName: "audits", refField: "requestMethod"}},
                "audits[].userAgent": {relation: {entityName: "audits", refField: "userAgent"}},
                "audits[].requestPayload": {relation: {entityName: "audits", refField: "requestPayload"}},
                "audits[].requestHost": {relation: {entityName: "audits", refField: "requestHost"}},
                "audits[].requestedTime": {relation: {entityName: "audits", refField: "requestedTime"}},
                "audits[].usersId": {relation: {entityName: "audits", refField: "usersId"}},
                "disputes[].id": {relation: {entityName: "disputes", refField: "id"}},
                "disputes[].caseId": {relation: {entityName: "disputes", refField: "caseId"}},
                "disputes[].witnessName": {relation: {entityName: "disputes", refField: "witnessName"}},
                "disputes[].disputesDetails": {relation: {entityName: "disputes", refField: "disputesDetails"}},
                "disputes[].estimateTime": {relation: {entityName: "disputes", refField: "estimateTime"}},
                "disputes[].status": {relation: {entityName: "disputes", refField: "status"}},
                "disputes[].createdAt": {relation: {entityName: "disputes", refField: "createdAt"}},
                "disputes[].landsId": {relation: {entityName: "disputes", refField: "landsId"}},
                "disputes[].legalOfficerId": {relation: {entityName: "disputes", refField: "legalOfficerId"}},
                "disputes[].usersId": {relation: {entityName: "disputes", refField: "usersId"}},
                "paymenthistories[].id": {relation: {entityName: "paymenthistories", refField: "id"}},
                "paymenthistories[].referanceNo": {relation: {entityName: "paymenthistories", refField: "referanceNo"}},
                "paymenthistories[].amount": {relation: {entityName: "paymenthistories", refField: "amount"}},
                "paymenthistories[].createdAt": {relation: {entityName: "paymenthistories", refField: "createdAt"}},
                "paymenthistories[].legalOfficerId": {relation: {entityName: "paymenthistories", refField: "legalOfficerId"}},
                "paymenthistories[].usersId": {relation: {entityName: "paymenthistories", refField: "usersId"}},
                "userhasusertypes[].userTypesId": {relation: {entityName: "userhasusertypes", refField: "userTypesId"}},
                "userhasusertypes[].usersId": {relation: {entityName: "userhasusertypes", refField: "usersId"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                audits: {entity: Audit, fieldName: "audits", refTable: "audits", refColumns: ["usersId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                disputes: {entity: Dispute, fieldName: "disputes", refTable: "disputes", refColumns: ["usersId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                paymenthistories: {entity: PaymentHistory, fieldName: "paymenthistories", refTable: "payment_history", refColumns: ["usersId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                userhasusertypes: {entity: UserHasUserType, fieldName: "userhasusertypes", refTable: "users_has_user_types", refColumns: ["usersId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [LEGAL_CLAUSE]: {
            entityName: "LegalClause",
            tableName: "legal_clauses",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                legalClause: {columnName: "legalClause"},
                legalPrecedentsId: {columnName: "legalPrecedentsId"},
                "legalprecedent.id": {relation: {entityName: "legalprecedent", refField: "id"}},
                "legalprecedent.year": {relation: {entityName: "legalprecedent", refField: "year"}},
                "legalprecedent.headline": {relation: {entityName: "legalprecedent", refField: "headline"}},
                "legalprecedent.court": {relation: {entityName: "legalprecedent", refField: "court"}},
                "legalprecedent.decision": {relation: {entityName: "legalprecedent", refField: "decision"}},
                "legalprecedent.summary": {relation: {entityName: "legalprecedent", refField: "summary"}},
                "legalprecedent.disputesId": {relation: {entityName: "legalprecedent", refField: "disputesId"}}
            },
            keyFields: ["id"],
            joinMetadata: {legalprecedent: {entity: LegalPrecedent, fieldName: "legalprecedent", refTable: "legal_precedents", refColumns: ["id"], joinColumns: ["legalPrecedentsId"], 'type: psql:ONE_TO_MANY}}
        },
        [DISPUTE_DOCUMENT]: {
            entityName: "DisputeDocument",
            tableName: "disputes_document",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                docPath: {columnName: "docPath"},
                uploadedDate: {columnName: "uploadedDate"},
                disputesId: {columnName: "disputesId"},
                "dispute.id": {relation: {entityName: "dispute", refField: "id"}},
                "dispute.caseId": {relation: {entityName: "dispute", refField: "caseId"}},
                "dispute.witnessName": {relation: {entityName: "dispute", refField: "witnessName"}},
                "dispute.disputesDetails": {relation: {entityName: "dispute", refField: "disputesDetails"}},
                "dispute.estimateTime": {relation: {entityName: "dispute", refField: "estimateTime"}},
                "dispute.status": {relation: {entityName: "dispute", refField: "status"}},
                "dispute.createdAt": {relation: {entityName: "dispute", refField: "createdAt"}},
                "dispute.landsId": {relation: {entityName: "dispute", refField: "landsId"}},
                "dispute.legalOfficerId": {relation: {entityName: "dispute", refField: "legalOfficerId"}},
                "dispute.usersId": {relation: {entityName: "dispute", refField: "usersId"}}
            },
            keyFields: ["id"],
            joinMetadata: {dispute: {entity: Dispute, fieldName: "dispute", refTable: "disputes", refColumns: ["id"], joinColumns: ["disputesId"], 'type: psql:ONE_TO_MANY}}
        },
        [LEGAL_OFFICER]: {
            entityName: "LegalOfficer",
            tableName: "legal_officer",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                firstName: {columnName: "first_name"},
                lastName: {columnName: "last_name"},
                baslId: {columnName: "BASL_ID"},
                initialCost: {columnName: "initial_cost"},
                "disputes[].id": {relation: {entityName: "disputes", refField: "id"}},
                "disputes[].caseId": {relation: {entityName: "disputes", refField: "caseId"}},
                "disputes[].witnessName": {relation: {entityName: "disputes", refField: "witnessName"}},
                "disputes[].disputesDetails": {relation: {entityName: "disputes", refField: "disputesDetails"}},
                "disputes[].estimateTime": {relation: {entityName: "disputes", refField: "estimateTime"}},
                "disputes[].status": {relation: {entityName: "disputes", refField: "status"}},
                "disputes[].createdAt": {relation: {entityName: "disputes", refField: "createdAt"}},
                "disputes[].landsId": {relation: {entityName: "disputes", refField: "landsId"}},
                "disputes[].legalOfficerId": {relation: {entityName: "disputes", refField: "legalOfficerId"}},
                "disputes[].usersId": {relation: {entityName: "disputes", refField: "usersId"}},
                "paymenthistories[].id": {relation: {entityName: "paymenthistories", refField: "id"}},
                "paymenthistories[].referanceNo": {relation: {entityName: "paymenthistories", refField: "referanceNo"}},
                "paymenthistories[].amount": {relation: {entityName: "paymenthistories", refField: "amount"}},
                "paymenthistories[].createdAt": {relation: {entityName: "paymenthistories", refField: "createdAt"}},
                "paymenthistories[].legalOfficerId": {relation: {entityName: "paymenthistories", refField: "legalOfficerId"}},
                "paymenthistories[].usersId": {relation: {entityName: "paymenthistories", refField: "usersId"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                disputes: {entity: Dispute, fieldName: "disputes", refTable: "disputes", refColumns: ["legalOfficerId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                paymenthistories: {entity: PaymentHistory, fieldName: "paymenthistories", refTable: "payment_history", refColumns: ["legalOfficerId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [LAND_TRANSFER_CHAIN]: {
            entityName: "LandTransferChain",
            tableName: "land_transfer_chain",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                transferDate: {columnName: "transferDate"},
                verifiedBy: {columnName: "verifiedBy"},
                blockIndex: {columnName: "blockIndex"},
                blockHash: {columnName: "blockHash"},
                prevBlockHash: {columnName: "prevBlockHash"},
                fromLandOwnersId: {columnName: "fromLandOwnersId"},
                toLandOwnersId: {columnName: "toLandOwnersId"},
                landsId: {columnName: "landsId"},
                "landowner.id": {relation: {entityName: "landowner", refField: "id"}},
                "landowner.ownerId": {relation: {entityName: "landowner", refField: "ownerId"}},
                "landowner.firstName": {relation: {entityName: "landowner", refField: "firstName"}},
                "landowner.lastName": {relation: {entityName: "landowner", refField: "lastName"}},
                "landowner.nic": {relation: {entityName: "landowner", refField: "nic"}},
                "landowner.address": {relation: {entityName: "landowner", refField: "address"}},
                "landowner.contactNo": {relation: {entityName: "landowner", refField: "contactNo"}},
                "landowner1.id": {relation: {entityName: "landowner1", refField: "id"}},
                "landowner1.ownerId": {relation: {entityName: "landowner1", refField: "ownerId"}},
                "landowner1.firstName": {relation: {entityName: "landowner1", refField: "firstName"}},
                "landowner1.lastName": {relation: {entityName: "landowner1", refField: "lastName"}},
                "landowner1.nic": {relation: {entityName: "landowner1", refField: "nic"}},
                "landowner1.address": {relation: {entityName: "landowner1", refField: "address"}},
                "landowner1.contactNo": {relation: {entityName: "landowner1", refField: "contactNo"}},
                "land.id": {relation: {entityName: "land", refField: "id"}},
                "land.landId": {relation: {entityName: "land", refField: "landId"}},
                "land.landName": {relation: {entityName: "land", refField: "landName"}},
                "land.landPlace": {relation: {entityName: "land", refField: "landPlace"}},
                "land.landLat": {relation: {entityName: "land", refField: "landLat"}},
                "land.landLang": {relation: {entityName: "land", refField: "landLang"}},
                "land.landSize": {relation: {entityName: "land", refField: "landSize"}},
                "land.landValue": {relation: {entityName: "land", refField: "landValue"}},
                "land.landType": {relation: {entityName: "land", refField: "landType"}},
                "land.registerDate": {relation: {entityName: "land", refField: "registerDate"}},
                "land.landStatus": {relation: {entityName: "land", refField: "landStatus"}},
                "land.priority": {relation: {entityName: "land", refField: "priority"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                landowner: {entity: LandOwner, fieldName: "landowner", refTable: "land_owner", refColumns: ["id"], joinColumns: ["fromLandOwnersId"], 'type: psql:ONE_TO_MANY},
                landowner1: {entity: LandOwner, fieldName: "landowner1", refTable: "land_owner", refColumns: ["id"], joinColumns: ["toLandOwnersId"], 'type: psql:ONE_TO_MANY},
                land: {entity: Land, fieldName: "land", refTable: "lands", refColumns: ["id"], joinColumns: ["landsId"], 'type: psql:ONE_TO_MANY}
            }
        },
        [LAND_OWNER]: {
            entityName: "LandOwner",
            tableName: "land_owner",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                ownerId: {columnName: "ownerId"},
                firstName: {columnName: "firstName"},
                lastName: {columnName: "lastName"},
                nic: {columnName: "nic"},
                address: {columnName: "address"},
                contactNo: {columnName: "contactNo"},
                "landtransferchains[].id": {relation: {entityName: "landtransferchains", refField: "id"}},
                "landtransferchains[].transferDate": {relation: {entityName: "landtransferchains", refField: "transferDate"}},
                "landtransferchains[].verifiedBy": {relation: {entityName: "landtransferchains", refField: "verifiedBy"}},
                "landtransferchains[].blockIndex": {relation: {entityName: "landtransferchains", refField: "blockIndex"}},
                "landtransferchains[].blockHash": {relation: {entityName: "landtransferchains", refField: "blockHash"}},
                "landtransferchains[].prevBlockHash": {relation: {entityName: "landtransferchains", refField: "prevBlockHash"}},
                "landtransferchains[].fromLandOwnersId": {relation: {entityName: "landtransferchains", refField: "fromLandOwnersId"}},
                "landtransferchains[].toLandOwnersId": {relation: {entityName: "landtransferchains", refField: "toLandOwnersId"}},
                "landtransferchains[].landsId": {relation: {entityName: "landtransferchains", refField: "landsId"}},
                "landtransferchains1[].id": {relation: {entityName: "landtransferchains1", refField: "id"}},
                "landtransferchains1[].transferDate": {relation: {entityName: "landtransferchains1", refField: "transferDate"}},
                "landtransferchains1[].verifiedBy": {relation: {entityName: "landtransferchains1", refField: "verifiedBy"}},
                "landtransferchains1[].blockIndex": {relation: {entityName: "landtransferchains1", refField: "blockIndex"}},
                "landtransferchains1[].blockHash": {relation: {entityName: "landtransferchains1", refField: "blockHash"}},
                "landtransferchains1[].prevBlockHash": {relation: {entityName: "landtransferchains1", refField: "prevBlockHash"}},
                "landtransferchains1[].fromLandOwnersId": {relation: {entityName: "landtransferchains1", refField: "fromLandOwnersId"}},
                "landtransferchains1[].toLandOwnersId": {relation: {entityName: "landtransferchains1", refField: "toLandOwnersId"}},
                "landtransferchains1[].landsId": {relation: {entityName: "landtransferchains1", refField: "landsId"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                landtransferchains: {entity: LandTransferChain, fieldName: "landtransferchains", refTable: "land_transfer_chain", refColumns: ["fromLandOwnersId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                landtransferchains1: {entity: LandTransferChain, fieldName: "landtransferchains1", refTable: "land_transfer_chain", refColumns: ["toLandOwnersId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [LAND]: {
            entityName: "Land",
            tableName: "lands",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                landId: {columnName: "landId"},
                landName: {columnName: "landName"},
                landPlace: {columnName: "landPlace"},
                landLat: {columnName: "landLat"},
                landLang: {columnName: "landLang"},
                landSize: {columnName: "landSize"},
                landValue: {columnName: "landValue"},
                landType: {columnName: "landType"},
                registerDate: {columnName: "registerDate"},
                landStatus: {columnName: "landStatus"},
                priority: {columnName: "priority"},
                "disputes[].id": {relation: {entityName: "disputes", refField: "id"}},
                "disputes[].caseId": {relation: {entityName: "disputes", refField: "caseId"}},
                "disputes[].witnessName": {relation: {entityName: "disputes", refField: "witnessName"}},
                "disputes[].disputesDetails": {relation: {entityName: "disputes", refField: "disputesDetails"}},
                "disputes[].estimateTime": {relation: {entityName: "disputes", refField: "estimateTime"}},
                "disputes[].status": {relation: {entityName: "disputes", refField: "status"}},
                "disputes[].createdAt": {relation: {entityName: "disputes", refField: "createdAt"}},
                "disputes[].landsId": {relation: {entityName: "disputes", refField: "landsId"}},
                "disputes[].legalOfficerId": {relation: {entityName: "disputes", refField: "legalOfficerId"}},
                "disputes[].usersId": {relation: {entityName: "disputes", refField: "usersId"}},
                "landtransferchains[].id": {relation: {entityName: "landtransferchains", refField: "id"}},
                "landtransferchains[].transferDate": {relation: {entityName: "landtransferchains", refField: "transferDate"}},
                "landtransferchains[].verifiedBy": {relation: {entityName: "landtransferchains", refField: "verifiedBy"}},
                "landtransferchains[].blockIndex": {relation: {entityName: "landtransferchains", refField: "blockIndex"}},
                "landtransferchains[].blockHash": {relation: {entityName: "landtransferchains", refField: "blockHash"}},
                "landtransferchains[].prevBlockHash": {relation: {entityName: "landtransferchains", refField: "prevBlockHash"}},
                "landtransferchains[].fromLandOwnersId": {relation: {entityName: "landtransferchains", refField: "fromLandOwnersId"}},
                "landtransferchains[].toLandOwnersId": {relation: {entityName: "landtransferchains", refField: "toLandOwnersId"}},
                "landtransferchains[].landsId": {relation: {entityName: "landtransferchains", refField: "landsId"}},
                "landdocuments[].id": {relation: {entityName: "landdocuments", refField: "id"}},
                "landdocuments[].docPath": {relation: {entityName: "landdocuments", refField: "docPath"}},
                "landdocuments[].docSize": {relation: {entityName: "landdocuments", refField: "docSize"}},
                "landdocuments[].docType": {relation: {entityName: "landdocuments", refField: "docType"}},
                "landdocuments[].uploadedDate": {relation: {entityName: "landdocuments", refField: "uploadedDate"}},
                "landdocuments[].docStatus": {relation: {entityName: "landdocuments", refField: "docStatus"}},
                "landdocuments[].landsId": {relation: {entityName: "landdocuments", refField: "landsId"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                disputes: {entity: Dispute, fieldName: "disputes", refTable: "disputes", refColumns: ["landsId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                landtransferchains: {entity: LandTransferChain, fieldName: "landtransferchains", refTable: "land_transfer_chain", refColumns: ["landsId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                landdocuments: {entity: LandDocument, fieldName: "landdocuments", refTable: "lands_documents", refColumns: ["landsId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [AUDIT]: {
            entityName: "Audit",
            tableName: "audits",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                requestPath: {columnName: "requestPath"},
                requestMethod: {columnName: "requestMethod"},
                userAgent: {columnName: "userAgent"},
                requestPayload: {columnName: "requestPayload"},
                requestHost: {columnName: "requestHost"},
                requestedTime: {columnName: "requestedTime"},
                usersId: {columnName: "usersId"},
                "user.id": {relation: {entityName: "user", refField: "id"}},
                "user.userId": {relation: {entityName: "user", refField: "userId"}},
                "user.firstName": {relation: {entityName: "user", refField: "firstName"}},
                "user.lastName": {relation: {entityName: "user", refField: "lastName"}},
                "user.email": {relation: {entityName: "user", refField: "email"}},
                "user.password": {relation: {entityName: "user", refField: "password"}},
                "user.nic": {relation: {entityName: "user", refField: "nic"}},
                "user.sludi": {relation: {entityName: "user", refField: "sludi"}},
                "user.contactNo": {relation: {entityName: "user", refField: "contactNo"}},
                "user.address": {relation: {entityName: "user", refField: "address"}}
            },
            keyFields: ["id"],
            joinMetadata: {user: {entity: User, fieldName: "user", refTable: "users", refColumns: ["id"], joinColumns: ["usersId"], 'type: psql:ONE_TO_MANY}}
        },
        [DISPUTE_COMMENT]: {
            entityName: "DisputeComment",
            tableName: "dispute_comments",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                comment: {columnName: "comment"},
                createdAt: {columnName: "createdAt"},
                disputesId: {columnName: "disputesId"},
                "dispute.id": {relation: {entityName: "dispute", refField: "id"}},
                "dispute.caseId": {relation: {entityName: "dispute", refField: "caseId"}},
                "dispute.witnessName": {relation: {entityName: "dispute", refField: "witnessName"}},
                "dispute.disputesDetails": {relation: {entityName: "dispute", refField: "disputesDetails"}},
                "dispute.estimateTime": {relation: {entityName: "dispute", refField: "estimateTime"}},
                "dispute.status": {relation: {entityName: "dispute", refField: "status"}},
                "dispute.createdAt": {relation: {entityName: "dispute", refField: "createdAt"}},
                "dispute.landsId": {relation: {entityName: "dispute", refField: "landsId"}},
                "dispute.legalOfficerId": {relation: {entityName: "dispute", refField: "legalOfficerId"}},
                "dispute.usersId": {relation: {entityName: "dispute", refField: "usersId"}}
            },
            keyFields: ["id"],
            joinMetadata: {dispute: {entity: Dispute, fieldName: "dispute", refTable: "disputes", refColumns: ["id"], joinColumns: ["disputesId"], 'type: psql:ONE_TO_MANY}}
        },
        [USER_HAS_USER_TYPE]: {
            entityName: "UserHasUserType",
            tableName: "users_has_user_types",
            fieldMetadata: {
                userTypesId: {columnName: "userTypesId"},
                usersId: {columnName: "usersId"},
                "usertype.id": {relation: {entityName: "usertype", refField: "id"}},
                "usertype.userTypes": {relation: {entityName: "usertype", refField: "userTypes"}},
                "user.id": {relation: {entityName: "user", refField: "id"}},
                "user.userId": {relation: {entityName: "user", refField: "userId"}},
                "user.firstName": {relation: {entityName: "user", refField: "firstName"}},
                "user.lastName": {relation: {entityName: "user", refField: "lastName"}},
                "user.email": {relation: {entityName: "user", refField: "email"}},
                "user.password": {relation: {entityName: "user", refField: "password"}},
                "user.nic": {relation: {entityName: "user", refField: "nic"}},
                "user.sludi": {relation: {entityName: "user", refField: "sludi"}},
                "user.contactNo": {relation: {entityName: "user", refField: "contactNo"}},
                "user.address": {relation: {entityName: "user", refField: "address"}}
            },
            keyFields: ["userTypesId", "usersId"],
            joinMetadata: {
                usertype: {entity: UserType, fieldName: "usertype", refTable: "user_types", refColumns: ["id"], joinColumns: ["userTypesId"], 'type: psql:ONE_TO_MANY},
                user: {entity: User, fieldName: "user", refTable: "users", refColumns: ["id"], joinColumns: ["usersId"], 'type: psql:ONE_TO_MANY}
            }
        },
        [DISPUTE]: {
            entityName: "Dispute",
            tableName: "disputes",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                caseId: {columnName: "caseId"},
                witnessName: {columnName: "witnessName"},
                disputesDetails: {columnName: "disputesDetails"},
                estimateTime: {columnName: "estimateTime"},
                status: {columnName: "status"},
                createdAt: {columnName: "createdAt"},
                landsId: {columnName: "landsId"},
                legalOfficerId: {columnName: "legalOfficerId"},
                usersId: {columnName: "usersId"},
                "disputecomments[].id": {relation: {entityName: "disputecomments", refField: "id"}},
                "disputecomments[].comment": {relation: {entityName: "disputecomments", refField: "comment"}},
                "disputecomments[].createdAt": {relation: {entityName: "disputecomments", refField: "createdAt"}},
                "disputecomments[].disputesId": {relation: {entityName: "disputecomments", refField: "disputesId"}},
                "land.id": {relation: {entityName: "land", refField: "id"}},
                "land.landId": {relation: {entityName: "land", refField: "landId"}},
                "land.landName": {relation: {entityName: "land", refField: "landName"}},
                "land.landPlace": {relation: {entityName: "land", refField: "landPlace"}},
                "land.landLat": {relation: {entityName: "land", refField: "landLat"}},
                "land.landLang": {relation: {entityName: "land", refField: "landLang"}},
                "land.landSize": {relation: {entityName: "land", refField: "landSize"}},
                "land.landValue": {relation: {entityName: "land", refField: "landValue"}},
                "land.landType": {relation: {entityName: "land", refField: "landType"}},
                "land.registerDate": {relation: {entityName: "land", refField: "registerDate"}},
                "land.landStatus": {relation: {entityName: "land", refField: "landStatus"}},
                "land.priority": {relation: {entityName: "land", refField: "priority"}},
                "legalofficer.id": {relation: {entityName: "legalofficer", refField: "id"}},
                "legalofficer.firstName": {relation: {entityName: "legalofficer", refField: "firstName", refColumn: "first_name"}},
                "legalofficer.lastName": {relation: {entityName: "legalofficer", refField: "lastName", refColumn: "last_name"}},
                "legalofficer.baslId": {relation: {entityName: "legalofficer", refField: "baslId", refColumn: "BASL_ID"}},
                "legalofficer.initialCost": {relation: {entityName: "legalofficer", refField: "initialCost", refColumn: "initial_cost"}},
                "user.id": {relation: {entityName: "user", refField: "id"}},
                "user.userId": {relation: {entityName: "user", refField: "userId"}},
                "user.firstName": {relation: {entityName: "user", refField: "firstName"}},
                "user.lastName": {relation: {entityName: "user", refField: "lastName"}},
                "user.email": {relation: {entityName: "user", refField: "email"}},
                "user.password": {relation: {entityName: "user", refField: "password"}},
                "user.nic": {relation: {entityName: "user", refField: "nic"}},
                "user.sludi": {relation: {entityName: "user", refField: "sludi"}},
                "user.contactNo": {relation: {entityName: "user", refField: "contactNo"}},
                "user.address": {relation: {entityName: "user", refField: "address"}},
                "disputedocuments[].id": {relation: {entityName: "disputedocuments", refField: "id"}},
                "disputedocuments[].docPath": {relation: {entityName: "disputedocuments", refField: "docPath"}},
                "disputedocuments[].uploadedDate": {relation: {entityName: "disputedocuments", refField: "uploadedDate"}},
                "disputedocuments[].disputesId": {relation: {entityName: "disputedocuments", refField: "disputesId"}},
                "legalprecedents[].id": {relation: {entityName: "legalprecedents", refField: "id"}},
                "legalprecedents[].year": {relation: {entityName: "legalprecedents", refField: "year"}},
                "legalprecedents[].headline": {relation: {entityName: "legalprecedents", refField: "headline"}},
                "legalprecedents[].court": {relation: {entityName: "legalprecedents", refField: "court"}},
                "legalprecedents[].decision": {relation: {entityName: "legalprecedents", refField: "decision"}},
                "legalprecedents[].summary": {relation: {entityName: "legalprecedents", refField: "summary"}},
                "legalprecedents[].disputesId": {relation: {entityName: "legalprecedents", refField: "disputesId"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                disputecomments: {entity: DisputeComment, fieldName: "disputecomments", refTable: "dispute_comments", refColumns: ["disputesId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                land: {entity: Land, fieldName: "land", refTable: "lands", refColumns: ["id"], joinColumns: ["landsId"], 'type: psql:ONE_TO_MANY},
                legalofficer: {entity: LegalOfficer, fieldName: "legalofficer", refTable: "legal_officer", refColumns: ["id"], joinColumns: ["legalOfficerId"], 'type: psql:ONE_TO_MANY},
                user: {entity: User, fieldName: "user", refTable: "users", refColumns: ["id"], joinColumns: ["usersId"], 'type: psql:ONE_TO_MANY},
                disputedocuments: {entity: DisputeDocument, fieldName: "disputedocuments", refTable: "disputes_document", refColumns: ["disputesId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                legalprecedents: {entity: LegalPrecedent, fieldName: "legalprecedents", refTable: "legal_precedents", refColumns: ["disputesId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [USER_TYPE]: {
            entityName: "UserType",
            tableName: "user_types",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                userTypes: {columnName: "userTypes"},
                "userhasusertypes[].userTypesId": {relation: {entityName: "userhasusertypes", refField: "userTypesId"}},
                "userhasusertypes[].usersId": {relation: {entityName: "userhasusertypes", refField: "usersId"}}
            },
            keyFields: ["id"],
            joinMetadata: {userhasusertypes: {entity: UserHasUserType, fieldName: "userhasusertypes", refTable: "users_has_user_types", refColumns: ["userTypesId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        }
    };

    public isolated function init() returns persist:Error? {
        sql:ConnectionPool connPool = {
            maxOpenConnections: 100,
            maxConnectionLifeTime: 180,
            minIdleConnections: 5
        };
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions, connectionPool = connPool);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [LAND_DOCUMENT]: check new (dbClient, self.metadata.get(LAND_DOCUMENT), psql:MYSQL_SPECIFICS),
            [LEGAL_PRECEDENT]: check new (dbClient, self.metadata.get(LEGAL_PRECEDENT), psql:MYSQL_SPECIFICS),
            [PAYMENT_HISTORY]: check new (dbClient, self.metadata.get(PAYMENT_HISTORY), psql:MYSQL_SPECIFICS),
            [USER]: check new (dbClient, self.metadata.get(USER), psql:MYSQL_SPECIFICS),
            [LEGAL_CLAUSE]: check new (dbClient, self.metadata.get(LEGAL_CLAUSE), psql:MYSQL_SPECIFICS),
            [DISPUTE_DOCUMENT]: check new (dbClient, self.metadata.get(DISPUTE_DOCUMENT), psql:MYSQL_SPECIFICS),
            [LEGAL_OFFICER]: check new (dbClient, self.metadata.get(LEGAL_OFFICER), psql:MYSQL_SPECIFICS),
            [LAND_TRANSFER_CHAIN]: check new (dbClient, self.metadata.get(LAND_TRANSFER_CHAIN), psql:MYSQL_SPECIFICS),
            [LAND_OWNER]: check new (dbClient, self.metadata.get(LAND_OWNER), psql:MYSQL_SPECIFICS),
            [LAND]: check new (dbClient, self.metadata.get(LAND), psql:MYSQL_SPECIFICS),
            [AUDIT]: check new (dbClient, self.metadata.get(AUDIT), psql:MYSQL_SPECIFICS),
            [DISPUTE_COMMENT]: check new (dbClient, self.metadata.get(DISPUTE_COMMENT), psql:MYSQL_SPECIFICS),
            [USER_HAS_USER_TYPE]: check new (dbClient, self.metadata.get(USER_HAS_USER_TYPE), psql:MYSQL_SPECIFICS),
            [DISPUTE]: check new (dbClient, self.metadata.get(DISPUTE), psql:MYSQL_SPECIFICS),
            [USER_TYPE]: check new (dbClient, self.metadata.get(USER_TYPE), psql:MYSQL_SPECIFICS)
        };
    }

    isolated resource function get landdocuments(LandDocumentTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get landdocuments/[int id](LandDocumentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post landdocuments(LandDocumentInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_DOCUMENT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put landdocuments/[int id](LandDocumentUpdate value) returns LandDocument|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_DOCUMENT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/landdocuments/[id].get();
    }

    isolated resource function delete landdocuments/[int id]() returns LandDocument|persist:Error {
        LandDocument result = check self->/landdocuments/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_DOCUMENT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get legalprecedents(LegalPrecedentTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get legalprecedents/[int id](LegalPrecedentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post legalprecedents(LegalPrecedentInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_PRECEDENT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put legalprecedents/[int id](LegalPrecedentUpdate value) returns LegalPrecedent|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_PRECEDENT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/legalprecedents/[id].get();
    }

    isolated resource function delete legalprecedents/[int id]() returns LegalPrecedent|persist:Error {
        LegalPrecedent result = check self->/legalprecedents/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_PRECEDENT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get paymenthistories(PaymentHistoryTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get paymenthistories/[int id](PaymentHistoryTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post paymenthistories(PaymentHistoryInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(PAYMENT_HISTORY);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put paymenthistories/[int id](PaymentHistoryUpdate value) returns PaymentHistory|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(PAYMENT_HISTORY);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/paymenthistories/[id].get();
    }

    isolated resource function delete paymenthistories/[int id]() returns PaymentHistory|persist:Error {
        PaymentHistory result = check self->/paymenthistories/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(PAYMENT_HISTORY);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get users(UserTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get users/[int id](UserTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post users(UserInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put users/[int id](UserUpdate value) returns User|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/users/[id].get();
    }

    isolated resource function delete users/[int id]() returns User|persist:Error {
        User result = check self->/users/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get legalclauses(LegalClauseTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get legalclauses/[int id](LegalClauseTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post legalclauses(LegalClauseInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_CLAUSE);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put legalclauses/[int id](LegalClauseUpdate value) returns LegalClause|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_CLAUSE);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/legalclauses/[id].get();
    }

    isolated resource function delete legalclauses/[int id]() returns LegalClause|persist:Error {
        LegalClause result = check self->/legalclauses/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_CLAUSE);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get disputedocuments(DisputeDocumentTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get disputedocuments/[int id](DisputeDocumentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post disputedocuments(DisputeDocumentInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE_DOCUMENT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put disputedocuments/[int id](DisputeDocumentUpdate value) returns DisputeDocument|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE_DOCUMENT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/disputedocuments/[id].get();
    }

    isolated resource function delete disputedocuments/[int id]() returns DisputeDocument|persist:Error {
        DisputeDocument result = check self->/disputedocuments/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE_DOCUMENT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get legalofficers(LegalOfficerTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get legalofficers/[int id](LegalOfficerTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post legalofficers(LegalOfficerInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_OFFICER);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put legalofficers/[int id](LegalOfficerUpdate value) returns LegalOfficer|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_OFFICER);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/legalofficers/[id].get();
    }

    isolated resource function delete legalofficers/[int id]() returns LegalOfficer|persist:Error {
        LegalOfficer result = check self->/legalofficers/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LEGAL_OFFICER);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get landtransferchains(LandTransferChainTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get landtransferchains/[int id](LandTransferChainTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post landtransferchains(LandTransferChainInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_TRANSFER_CHAIN);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put landtransferchains/[int id](LandTransferChainUpdate value) returns LandTransferChain|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_TRANSFER_CHAIN);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/landtransferchains/[id].get();
    }

    isolated resource function delete landtransferchains/[int id]() returns LandTransferChain|persist:Error {
        LandTransferChain result = check self->/landtransferchains/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_TRANSFER_CHAIN);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get landowners(LandOwnerTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get landowners/[int id](LandOwnerTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post landowners(LandOwnerInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_OWNER);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put landowners/[int id](LandOwnerUpdate value) returns LandOwner|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_OWNER);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/landowners/[id].get();
    }

    isolated resource function delete landowners/[int id]() returns LandOwner|persist:Error {
        LandOwner result = check self->/landowners/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND_OWNER);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get lands(LandTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get lands/[int id](LandTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post lands(LandInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put lands/[int id](LandUpdate value) returns Land|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/lands/[id].get();
    }

    isolated resource function delete lands/[int id]() returns Land|persist:Error {
        Land result = check self->/lands/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(LAND);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get audits(AuditTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get audits/[int id](AuditTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post audits(AuditInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(AUDIT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put audits/[int id](AuditUpdate value) returns Audit|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(AUDIT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/audits/[id].get();
    }

    isolated resource function delete audits/[int id]() returns Audit|persist:Error {
        Audit result = check self->/audits/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(AUDIT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get disputecomments(DisputeCommentTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get disputecomments/[int id](DisputeCommentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post disputecomments(DisputeCommentInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE_COMMENT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put disputecomments/[int id](DisputeCommentUpdate value) returns DisputeComment|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE_COMMENT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/disputecomments/[id].get();
    }

    isolated resource function delete disputecomments/[int id]() returns DisputeComment|persist:Error {
        DisputeComment result = check self->/disputecomments/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE_COMMENT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get userhasusertypes(UserHasUserTypeTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get userhasusertypes/[int userTypesId]/[int usersId](UserHasUserTypeTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post userhasusertypes(UserHasUserTypeInsert[] data) returns [int, int][]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_HAS_USER_TYPE);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from UserHasUserTypeInsert inserted in data
            select [inserted.userTypesId, inserted.usersId];
    }

    isolated resource function put userhasusertypes/[int userTypesId]/[int usersId](UserHasUserTypeUpdate value) returns UserHasUserType|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_HAS_USER_TYPE);
        }
        _ = check sqlClient.runUpdateQuery({"userTypesId": userTypesId, "usersId": usersId}, value);
        return self->/userhasusertypes/[userTypesId]/[usersId].get();
    }

    isolated resource function delete userhasusertypes/[int userTypesId]/[int usersId]() returns UserHasUserType|persist:Error {
        UserHasUserType result = check self->/userhasusertypes/[userTypesId]/[usersId].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_HAS_USER_TYPE);
        }
        _ = check sqlClient.runDeleteQuery({"userTypesId": userTypesId, "usersId": usersId});
        return result;
    }

    isolated resource function get disputes(DisputeTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get disputes/[int id](DisputeTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post disputes(DisputeInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put disputes/[int id](DisputeUpdate value) returns Dispute|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/disputes/[id].get();
    }

    isolated resource function delete disputes/[int id]() returns Dispute|persist:Error {
        Dispute result = check self->/disputes/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(DISPUTE);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get usertypes(UserTypeTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get usertypes/[int id](UserTypeTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post usertypes(UserTypeInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_TYPE);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put usertypes/[int id](UserTypeUpdate value) returns UserType|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_TYPE);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/usertypes/[id].get();
    }

    isolated resource function delete usertypes/[int id]() returns UserType|persist:Error {
        UserType result = check self->/usertypes/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_TYPE);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    remote isolated function queryNativeSQL(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>) returns stream<rowType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

