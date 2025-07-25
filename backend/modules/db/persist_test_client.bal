// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/h2.driver as _;
import ballerinax/java.jdbc;
import ballerinax/persist.sql as psql;

const LAND_DOCUMENT = "landdocuments";
const LEGAL_PRECEDENT = "legalprecedents";
const USER = "users";
const LEGAL_CLAUSE = "legalclauses";
const DISPUTE_DOCUMENT = "disputedocuments";
const LEGAL_OFFICER = "legalofficers";
const LAND_TRANSFER_CHAIN = "landtransferchains";
const NLP_ANALYSIS_RESULT = "nlpanalysisresults";
const LAND_OWNER = "landowners";
const LAND = "lands";
const DISPUTE_COMMENT = "disputecomments";
const USER_HAS_USER_TYPE = "userhasusertypes";
const DISPUTE = "disputes";
const USER_TYPE = "usertypes";

public isolated client class H2Client {
    *persist:AbstractPersistClient;

    private final jdbc:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [LAND_DOCUMENT]: {
            entityName: "LandDocument",
            tableName: "lands_documents",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                docPath: {columnName: "doc_path"},
                docSize: {columnName: "doc_size"},
                docType: {columnName: "doc_type"},
                uploadedDate: {columnName: "uploaded_date"},
                docStatus: {columnName: "doc_status"},
                landsId: {columnName: "lands_id"},
                nlpAnalysisResultId: {columnName: "nlp_analysis_result_id"},
                "land.id": {relation: {entityName: "land", refField: "id"}},
                "land.landId": {relation: {entityName: "land", refField: "landId", refColumn: "land_id"}},
                "land.landName": {relation: {entityName: "land", refField: "landName", refColumn: "land_name"}},
                "land.landPlace": {relation: {entityName: "land", refField: "landPlace", refColumn: "land_place"}},
                "land.landLat": {relation: {entityName: "land", refField: "landLat", refColumn: "land_lat"}},
                "land.landLang": {relation: {entityName: "land", refField: "landLang", refColumn: "land_lang"}},
                "land.landSize": {relation: {entityName: "land", refField: "landSize", refColumn: "land_size"}},
                "land.landValue": {relation: {entityName: "land", refField: "landValue", refColumn: "land_value"}},
                "land.landType": {relation: {entityName: "land", refField: "landType", refColumn: "land_type"}},
                "land.registerDate": {relation: {entityName: "land", refField: "registerDate", refColumn: "register_date"}},
                "land.landStatus": {relation: {entityName: "land", refField: "landStatus", refColumn: "land_status"}},
                "land.priority": {relation: {entityName: "land", refField: "priority"}},
                "nlpanalysisresult.id": {relation: {entityName: "nlpanalysisresult", refField: "id"}},
                "nlpanalysisresult.hashId": {relation: {entityName: "nlpanalysisresult", refField: "hashId", refColumn: "_hashId"}},
                "nlpanalysisresult.results": {relation: {entityName: "nlpanalysisresult", refField: "results"}},
                "nlpanalysisresult.resultSummary": {relation: {entityName: "nlpanalysisresult", refField: "resultSummary", refColumn: "result_summary"}},
                "nlpanalysisresult.tags": {relation: {entityName: "nlpanalysisresult", refField: "tags"}},
                "nlpanalysisresult.trust": {relation: {entityName: "nlpanalysisresult", refField: "trust"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                land: {entity: Land, fieldName: "land", refTable: "lands", refColumns: ["id"], joinColumns: ["lands_id"], 'type: psql:ONE_TO_MANY},
                nlpanalysisresult: {entity: NlpAnalysisResult, fieldName: "nlpanalysisresult", refTable: "nlp_analysis_result", refColumns: ["id"], joinColumns: ["nlp_analysis_result_id"], 'type: psql:ONE_TO_MANY}
            }
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
                disputesId: {columnName: "disputes_id"},
                "legalclauses[].id": {relation: {entityName: "legalclauses", refField: "id"}},
                "legalclauses[].legalClause": {relation: {entityName: "legalclauses", refField: "legalClause", refColumn: "legal_clause"}},
                "legalclauses[].legalPrecedentsId": {relation: {entityName: "legalclauses", refField: "legalPrecedentsId", refColumn: "legal_precedents_id"}},
                "dispute.id": {relation: {entityName: "dispute", refField: "id"}},
                "dispute.caseId": {relation: {entityName: "dispute", refField: "caseId", refColumn: "case_id"}},
                "dispute.witnessName": {relation: {entityName: "dispute", refField: "witnessName", refColumn: "witness_name"}},
                "dispute.disputesDetails": {relation: {entityName: "dispute", refField: "disputesDetails", refColumn: "disputes_details"}},
                "dispute.estimateTime": {relation: {entityName: "dispute", refField: "estimateTime", refColumn: "estimate_time"}},
                "dispute.status": {relation: {entityName: "dispute", refField: "status"}},
                "dispute.createdAt": {relation: {entityName: "dispute", refField: "createdAt", refColumn: "created_at"}},
                "dispute.landsId": {relation: {entityName: "dispute", refField: "landsId", refColumn: "lands_id"}},
                "dispute.legalOfficerId": {relation: {entityName: "dispute", refField: "legalOfficerId", refColumn: "legal_officer_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                legalclauses: {entity: LegalClause, fieldName: "legalclauses", refTable: "legal_clauses", refColumns: ["legal_precedents_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                dispute: {entity: Dispute, fieldName: "dispute", refTable: "disputes", refColumns: ["id"], joinColumns: ["disputes_id"], 'type: psql:ONE_TO_MANY}
            }
        },
        [USER]: {
            entityName: "User",
            tableName: "users",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                userId: {columnName: "user_id"},
                firstName: {columnName: "first_name"},
                lastName: {columnName: "last_name"},
                email: {columnName: "email"},
                password: {columnName: "password"},
                nic: {columnName: "nic"},
                sludi: {columnName: "sludi"},
                contactNo: {columnName: "contact_no"},
                address: {columnName: "address"},
                "userhasusertypes[].userTypesId": {relation: {entityName: "userhasusertypes", refField: "userTypesId", refColumn: "user_types_id"}},
                "userhasusertypes[].usersId": {relation: {entityName: "userhasusertypes", refField: "usersId", refColumn: "users_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {userhasusertypes: {entity: UserHasUserType, fieldName: "userhasusertypes", refTable: "users_has_user_types", refColumns: ["users_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        },
        [LEGAL_CLAUSE]: {
            entityName: "LegalClause",
            tableName: "legal_clauses",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                legalClause: {columnName: "legal_clause"},
                legalPrecedentsId: {columnName: "legal_precedents_id"},
                "legalprecedent.id": {relation: {entityName: "legalprecedent", refField: "id"}},
                "legalprecedent.year": {relation: {entityName: "legalprecedent", refField: "year"}},
                "legalprecedent.headline": {relation: {entityName: "legalprecedent", refField: "headline"}},
                "legalprecedent.court": {relation: {entityName: "legalprecedent", refField: "court"}},
                "legalprecedent.decision": {relation: {entityName: "legalprecedent", refField: "decision"}},
                "legalprecedent.summary": {relation: {entityName: "legalprecedent", refField: "summary"}},
                "legalprecedent.disputesId": {relation: {entityName: "legalprecedent", refField: "disputesId", refColumn: "disputes_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {legalprecedent: {entity: LegalPrecedent, fieldName: "legalprecedent", refTable: "legal_precedents", refColumns: ["id"], joinColumns: ["legal_precedents_id"], 'type: psql:ONE_TO_MANY}}
        },
        [DISPUTE_DOCUMENT]: {
            entityName: "DisputeDocument",
            tableName: "disputes_document",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                docPath: {columnName: "doc_path"},
                uploadedDate: {columnName: "uploaded_date"},
                disputesId: {columnName: "disputes_id"},
                "dispute.id": {relation: {entityName: "dispute", refField: "id"}},
                "dispute.caseId": {relation: {entityName: "dispute", refField: "caseId", refColumn: "case_id"}},
                "dispute.witnessName": {relation: {entityName: "dispute", refField: "witnessName", refColumn: "witness_name"}},
                "dispute.disputesDetails": {relation: {entityName: "dispute", refField: "disputesDetails", refColumn: "disputes_details"}},
                "dispute.estimateTime": {relation: {entityName: "dispute", refField: "estimateTime", refColumn: "estimate_time"}},
                "dispute.status": {relation: {entityName: "dispute", refField: "status"}},
                "dispute.createdAt": {relation: {entityName: "dispute", refField: "createdAt", refColumn: "created_at"}},
                "dispute.landsId": {relation: {entityName: "dispute", refField: "landsId", refColumn: "lands_id"}},
                "dispute.legalOfficerId": {relation: {entityName: "dispute", refField: "legalOfficerId", refColumn: "legal_officer_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {dispute: {entity: Dispute, fieldName: "dispute", refTable: "disputes", refColumns: ["id"], joinColumns: ["disputes_id"], 'type: psql:ONE_TO_MANY}}
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
                "disputes[].caseId": {relation: {entityName: "disputes", refField: "caseId", refColumn: "case_id"}},
                "disputes[].witnessName": {relation: {entityName: "disputes", refField: "witnessName", refColumn: "witness_name"}},
                "disputes[].disputesDetails": {relation: {entityName: "disputes", refField: "disputesDetails", refColumn: "disputes_details"}},
                "disputes[].estimateTime": {relation: {entityName: "disputes", refField: "estimateTime", refColumn: "estimate_time"}},
                "disputes[].status": {relation: {entityName: "disputes", refField: "status"}},
                "disputes[].createdAt": {relation: {entityName: "disputes", refField: "createdAt", refColumn: "created_at"}},
                "disputes[].landsId": {relation: {entityName: "disputes", refField: "landsId", refColumn: "lands_id"}},
                "disputes[].legalOfficerId": {relation: {entityName: "disputes", refField: "legalOfficerId", refColumn: "legal_officer_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {disputes: {entity: Dispute, fieldName: "disputes", refTable: "disputes", refColumns: ["legal_officer_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        },
        [LAND_TRANSFER_CHAIN]: {
            entityName: "LandTransferChain",
            tableName: "land_transfer_chain",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                transferDate: {columnName: "transfer_date"},
                verifiedBy: {columnName: "verified_by"},
                blockIndex: {columnName: "block_index"},
                blockHash: {columnName: "block_hash"},
                prevBlockHash: {columnName: "prev_block_hash"},
                fromLandOwnersId: {columnName: "from_land_owners_id"},
                toLandOwnersId: {columnName: "to_land_owners_id"},
                landsId: {columnName: "lands_id"},
                "landowner.id": {relation: {entityName: "landowner", refField: "id"}},
                "landowner.ownerId": {relation: {entityName: "landowner", refField: "ownerId", refColumn: "owner_id"}},
                "landowner.firstName": {relation: {entityName: "landowner", refField: "firstName", refColumn: "first_name"}},
                "landowner.lastName": {relation: {entityName: "landowner", refField: "lastName", refColumn: "last_name"}},
                "landowner.nic": {relation: {entityName: "landowner", refField: "nic"}},
                "landowner.address": {relation: {entityName: "landowner", refField: "address"}},
                "landowner.contactNo": {relation: {entityName: "landowner", refField: "contactNo", refColumn: "contact_no"}},
                "landowner1.id": {relation: {entityName: "landowner1", refField: "id"}},
                "landowner1.ownerId": {relation: {entityName: "landowner1", refField: "ownerId", refColumn: "owner_id"}},
                "landowner1.firstName": {relation: {entityName: "landowner1", refField: "firstName", refColumn: "first_name"}},
                "landowner1.lastName": {relation: {entityName: "landowner1", refField: "lastName", refColumn: "last_name"}},
                "landowner1.nic": {relation: {entityName: "landowner1", refField: "nic"}},
                "landowner1.address": {relation: {entityName: "landowner1", refField: "address"}},
                "landowner1.contactNo": {relation: {entityName: "landowner1", refField: "contactNo", refColumn: "contact_no"}},
                "land.id": {relation: {entityName: "land", refField: "id"}},
                "land.landId": {relation: {entityName: "land", refField: "landId", refColumn: "land_id"}},
                "land.landName": {relation: {entityName: "land", refField: "landName", refColumn: "land_name"}},
                "land.landPlace": {relation: {entityName: "land", refField: "landPlace", refColumn: "land_place"}},
                "land.landLat": {relation: {entityName: "land", refField: "landLat", refColumn: "land_lat"}},
                "land.landLang": {relation: {entityName: "land", refField: "landLang", refColumn: "land_lang"}},
                "land.landSize": {relation: {entityName: "land", refField: "landSize", refColumn: "land_size"}},
                "land.landValue": {relation: {entityName: "land", refField: "landValue", refColumn: "land_value"}},
                "land.landType": {relation: {entityName: "land", refField: "landType", refColumn: "land_type"}},
                "land.registerDate": {relation: {entityName: "land", refField: "registerDate", refColumn: "register_date"}},
                "land.landStatus": {relation: {entityName: "land", refField: "landStatus", refColumn: "land_status"}},
                "land.priority": {relation: {entityName: "land", refField: "priority"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                landowner: {entity: LandOwner, fieldName: "landowner", refTable: "land_owner", refColumns: ["id"], joinColumns: ["from_land_owners_id"], 'type: psql:ONE_TO_MANY},
                landowner1: {entity: LandOwner, fieldName: "landowner1", refTable: "land_owner", refColumns: ["id"], joinColumns: ["to_land_owners_id"], 'type: psql:ONE_TO_MANY},
                land: {entity: Land, fieldName: "land", refTable: "lands", refColumns: ["id"], joinColumns: ["lands_id"], 'type: psql:ONE_TO_MANY}
            }
        },
        [NLP_ANALYSIS_RESULT]: {
            entityName: "NlpAnalysisResult",
            tableName: "nlp_analysis_result",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                hashId: {columnName: "_hashId"},
                results: {columnName: "results"},
                resultSummary: {columnName: "result_summary"},
                tags: {columnName: "tags"},
                trust: {columnName: "trust"},
                "landdocuments[].id": {relation: {entityName: "landdocuments", refField: "id"}},
                "landdocuments[].docPath": {relation: {entityName: "landdocuments", refField: "docPath", refColumn: "doc_path"}},
                "landdocuments[].docSize": {relation: {entityName: "landdocuments", refField: "docSize", refColumn: "doc_size"}},
                "landdocuments[].docType": {relation: {entityName: "landdocuments", refField: "docType", refColumn: "doc_type"}},
                "landdocuments[].uploadedDate": {relation: {entityName: "landdocuments", refField: "uploadedDate", refColumn: "uploaded_date"}},
                "landdocuments[].docStatus": {relation: {entityName: "landdocuments", refField: "docStatus", refColumn: "doc_status"}},
                "landdocuments[].landsId": {relation: {entityName: "landdocuments", refField: "landsId", refColumn: "lands_id"}},
                "landdocuments[].nlpAnalysisResultId": {relation: {entityName: "landdocuments", refField: "nlpAnalysisResultId", refColumn: "nlp_analysis_result_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {landdocuments: {entity: LandDocument, fieldName: "landdocuments", refTable: "lands_documents", refColumns: ["nlp_analysis_result_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        },
        [LAND_OWNER]: {
            entityName: "LandOwner",
            tableName: "land_owner",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                ownerId: {columnName: "owner_id"},
                firstName: {columnName: "first_name"},
                lastName: {columnName: "last_name"},
                nic: {columnName: "nic"},
                address: {columnName: "address"},
                contactNo: {columnName: "contact_no"},
                "landtransferchains[].id": {relation: {entityName: "landtransferchains", refField: "id"}},
                "landtransferchains[].transferDate": {relation: {entityName: "landtransferchains", refField: "transferDate", refColumn: "transfer_date"}},
                "landtransferchains[].verifiedBy": {relation: {entityName: "landtransferchains", refField: "verifiedBy", refColumn: "verified_by"}},
                "landtransferchains[].blockIndex": {relation: {entityName: "landtransferchains", refField: "blockIndex", refColumn: "block_index"}},
                "landtransferchains[].blockHash": {relation: {entityName: "landtransferchains", refField: "blockHash", refColumn: "block_hash"}},
                "landtransferchains[].prevBlockHash": {relation: {entityName: "landtransferchains", refField: "prevBlockHash", refColumn: "prev_block_hash"}},
                "landtransferchains[].fromLandOwnersId": {relation: {entityName: "landtransferchains", refField: "fromLandOwnersId", refColumn: "from_land_owners_id"}},
                "landtransferchains[].toLandOwnersId": {relation: {entityName: "landtransferchains", refField: "toLandOwnersId", refColumn: "to_land_owners_id"}},
                "landtransferchains[].landsId": {relation: {entityName: "landtransferchains", refField: "landsId", refColumn: "lands_id"}},
                "landtransferchains1[].id": {relation: {entityName: "landtransferchains1", refField: "id"}},
                "landtransferchains1[].transferDate": {relation: {entityName: "landtransferchains1", refField: "transferDate", refColumn: "transfer_date"}},
                "landtransferchains1[].verifiedBy": {relation: {entityName: "landtransferchains1", refField: "verifiedBy", refColumn: "verified_by"}},
                "landtransferchains1[].blockIndex": {relation: {entityName: "landtransferchains1", refField: "blockIndex", refColumn: "block_index"}},
                "landtransferchains1[].blockHash": {relation: {entityName: "landtransferchains1", refField: "blockHash", refColumn: "block_hash"}},
                "landtransferchains1[].prevBlockHash": {relation: {entityName: "landtransferchains1", refField: "prevBlockHash", refColumn: "prev_block_hash"}},
                "landtransferchains1[].fromLandOwnersId": {relation: {entityName: "landtransferchains1", refField: "fromLandOwnersId", refColumn: "from_land_owners_id"}},
                "landtransferchains1[].toLandOwnersId": {relation: {entityName: "landtransferchains1", refField: "toLandOwnersId", refColumn: "to_land_owners_id"}},
                "landtransferchains1[].landsId": {relation: {entityName: "landtransferchains1", refField: "landsId", refColumn: "lands_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                landtransferchains: {entity: LandTransferChain, fieldName: "landtransferchains", refTable: "land_transfer_chain", refColumns: ["from_land_owners_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                landtransferchains1: {entity: LandTransferChain, fieldName: "landtransferchains1", refTable: "land_transfer_chain", refColumns: ["to_land_owners_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [LAND]: {
            entityName: "Land",
            tableName: "lands",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                landId: {columnName: "land_id"},
                landName: {columnName: "land_name"},
                landPlace: {columnName: "land_place"},
                landLat: {columnName: "land_lat"},
                landLang: {columnName: "land_lang"},
                landSize: {columnName: "land_size"},
                landValue: {columnName: "land_value"},
                landType: {columnName: "land_type"},
                registerDate: {columnName: "register_date"},
                landStatus: {columnName: "land_status"},
                priority: {columnName: "priority"},
                "disputes[].id": {relation: {entityName: "disputes", refField: "id"}},
                "disputes[].caseId": {relation: {entityName: "disputes", refField: "caseId", refColumn: "case_id"}},
                "disputes[].witnessName": {relation: {entityName: "disputes", refField: "witnessName", refColumn: "witness_name"}},
                "disputes[].disputesDetails": {relation: {entityName: "disputes", refField: "disputesDetails", refColumn: "disputes_details"}},
                "disputes[].estimateTime": {relation: {entityName: "disputes", refField: "estimateTime", refColumn: "estimate_time"}},
                "disputes[].status": {relation: {entityName: "disputes", refField: "status"}},
                "disputes[].createdAt": {relation: {entityName: "disputes", refField: "createdAt", refColumn: "created_at"}},
                "disputes[].landsId": {relation: {entityName: "disputes", refField: "landsId", refColumn: "lands_id"}},
                "disputes[].legalOfficerId": {relation: {entityName: "disputes", refField: "legalOfficerId", refColumn: "legal_officer_id"}},
                "landtransferchains[].id": {relation: {entityName: "landtransferchains", refField: "id"}},
                "landtransferchains[].transferDate": {relation: {entityName: "landtransferchains", refField: "transferDate", refColumn: "transfer_date"}},
                "landtransferchains[].verifiedBy": {relation: {entityName: "landtransferchains", refField: "verifiedBy", refColumn: "verified_by"}},
                "landtransferchains[].blockIndex": {relation: {entityName: "landtransferchains", refField: "blockIndex", refColumn: "block_index"}},
                "landtransferchains[].blockHash": {relation: {entityName: "landtransferchains", refField: "blockHash", refColumn: "block_hash"}},
                "landtransferchains[].prevBlockHash": {relation: {entityName: "landtransferchains", refField: "prevBlockHash", refColumn: "prev_block_hash"}},
                "landtransferchains[].fromLandOwnersId": {relation: {entityName: "landtransferchains", refField: "fromLandOwnersId", refColumn: "from_land_owners_id"}},
                "landtransferchains[].toLandOwnersId": {relation: {entityName: "landtransferchains", refField: "toLandOwnersId", refColumn: "to_land_owners_id"}},
                "landtransferchains[].landsId": {relation: {entityName: "landtransferchains", refField: "landsId", refColumn: "lands_id"}},
                "landdocuments[].id": {relation: {entityName: "landdocuments", refField: "id"}},
                "landdocuments[].docPath": {relation: {entityName: "landdocuments", refField: "docPath", refColumn: "doc_path"}},
                "landdocuments[].docSize": {relation: {entityName: "landdocuments", refField: "docSize", refColumn: "doc_size"}},
                "landdocuments[].docType": {relation: {entityName: "landdocuments", refField: "docType", refColumn: "doc_type"}},
                "landdocuments[].uploadedDate": {relation: {entityName: "landdocuments", refField: "uploadedDate", refColumn: "uploaded_date"}},
                "landdocuments[].docStatus": {relation: {entityName: "landdocuments", refField: "docStatus", refColumn: "doc_status"}},
                "landdocuments[].landsId": {relation: {entityName: "landdocuments", refField: "landsId", refColumn: "lands_id"}},
                "landdocuments[].nlpAnalysisResultId": {relation: {entityName: "landdocuments", refField: "nlpAnalysisResultId", refColumn: "nlp_analysis_result_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                disputes: {entity: Dispute, fieldName: "disputes", refTable: "disputes", refColumns: ["lands_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                landtransferchains: {entity: LandTransferChain, fieldName: "landtransferchains", refTable: "land_transfer_chain", refColumns: ["lands_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                landdocuments: {entity: LandDocument, fieldName: "landdocuments", refTable: "lands_documents", refColumns: ["lands_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [DISPUTE_COMMENT]: {
            entityName: "DisputeComment",
            tableName: "dispute_comments",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                comment: {columnName: "comment"},
                createdAt: {columnName: "created_at"},
                disputesId: {columnName: "disputes_id"},
                "dispute.id": {relation: {entityName: "dispute", refField: "id"}},
                "dispute.caseId": {relation: {entityName: "dispute", refField: "caseId", refColumn: "case_id"}},
                "dispute.witnessName": {relation: {entityName: "dispute", refField: "witnessName", refColumn: "witness_name"}},
                "dispute.disputesDetails": {relation: {entityName: "dispute", refField: "disputesDetails", refColumn: "disputes_details"}},
                "dispute.estimateTime": {relation: {entityName: "dispute", refField: "estimateTime", refColumn: "estimate_time"}},
                "dispute.status": {relation: {entityName: "dispute", refField: "status"}},
                "dispute.createdAt": {relation: {entityName: "dispute", refField: "createdAt", refColumn: "created_at"}},
                "dispute.landsId": {relation: {entityName: "dispute", refField: "landsId", refColumn: "lands_id"}},
                "dispute.legalOfficerId": {relation: {entityName: "dispute", refField: "legalOfficerId", refColumn: "legal_officer_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {dispute: {entity: Dispute, fieldName: "dispute", refTable: "disputes", refColumns: ["id"], joinColumns: ["disputes_id"], 'type: psql:ONE_TO_MANY}}
        },
        [USER_HAS_USER_TYPE]: {
            entityName: "UserHasUserType",
            tableName: "users_has_user_types",
            fieldMetadata: {
                userTypesId: {columnName: "user_types_id"},
                usersId: {columnName: "users_id"},
                "usertype.id": {relation: {entityName: "usertype", refField: "id"}},
                "usertype.userTypes": {relation: {entityName: "usertype", refField: "userTypes", refColumn: "user_types"}},
                "user.id": {relation: {entityName: "user", refField: "id"}},
                "user.userId": {relation: {entityName: "user", refField: "userId", refColumn: "user_id"}},
                "user.firstName": {relation: {entityName: "user", refField: "firstName", refColumn: "first_name"}},
                "user.lastName": {relation: {entityName: "user", refField: "lastName", refColumn: "last_name"}},
                "user.email": {relation: {entityName: "user", refField: "email"}},
                "user.password": {relation: {entityName: "user", refField: "password"}},
                "user.nic": {relation: {entityName: "user", refField: "nic"}},
                "user.sludi": {relation: {entityName: "user", refField: "sludi"}},
                "user.contactNo": {relation: {entityName: "user", refField: "contactNo", refColumn: "contact_no"}},
                "user.address": {relation: {entityName: "user", refField: "address"}}
            },
            keyFields: ["usersId", "userTypesId"],
            joinMetadata: {
                usertype: {entity: UserType, fieldName: "usertype", refTable: "user_types", refColumns: ["id"], joinColumns: ["user_types_id"], 'type: psql:ONE_TO_MANY},
                user: {entity: User, fieldName: "user", refTable: "users", refColumns: ["id"], joinColumns: ["users_id"], 'type: psql:ONE_TO_MANY}
            }
        },
        [DISPUTE]: {
            entityName: "Dispute",
            tableName: "disputes",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                caseId: {columnName: "case_id"},
                witnessName: {columnName: "witness_name"},
                disputesDetails: {columnName: "disputes_details"},
                estimateTime: {columnName: "estimate_time"},
                status: {columnName: "status"},
                createdAt: {columnName: "created_at"},
                landsId: {columnName: "lands_id"},
                legalOfficerId: {columnName: "legal_officer_id"},
                "disputecomments[].id": {relation: {entityName: "disputecomments", refField: "id"}},
                "disputecomments[].comment": {relation: {entityName: "disputecomments", refField: "comment"}},
                "disputecomments[].createdAt": {relation: {entityName: "disputecomments", refField: "createdAt", refColumn: "created_at"}},
                "disputecomments[].disputesId": {relation: {entityName: "disputecomments", refField: "disputesId", refColumn: "disputes_id"}},
                "land.id": {relation: {entityName: "land", refField: "id"}},
                "land.landId": {relation: {entityName: "land", refField: "landId", refColumn: "land_id"}},
                "land.landName": {relation: {entityName: "land", refField: "landName", refColumn: "land_name"}},
                "land.landPlace": {relation: {entityName: "land", refField: "landPlace", refColumn: "land_place"}},
                "land.landLat": {relation: {entityName: "land", refField: "landLat", refColumn: "land_lat"}},
                "land.landLang": {relation: {entityName: "land", refField: "landLang", refColumn: "land_lang"}},
                "land.landSize": {relation: {entityName: "land", refField: "landSize", refColumn: "land_size"}},
                "land.landValue": {relation: {entityName: "land", refField: "landValue", refColumn: "land_value"}},
                "land.landType": {relation: {entityName: "land", refField: "landType", refColumn: "land_type"}},
                "land.registerDate": {relation: {entityName: "land", refField: "registerDate", refColumn: "register_date"}},
                "land.landStatus": {relation: {entityName: "land", refField: "landStatus", refColumn: "land_status"}},
                "land.priority": {relation: {entityName: "land", refField: "priority"}},
                "legalofficer.id": {relation: {entityName: "legalofficer", refField: "id"}},
                "legalofficer.firstName": {relation: {entityName: "legalofficer", refField: "firstName", refColumn: "first_name"}},
                "legalofficer.lastName": {relation: {entityName: "legalofficer", refField: "lastName", refColumn: "last_name"}},
                "legalofficer.baslId": {relation: {entityName: "legalofficer", refField: "baslId", refColumn: "BASL_ID"}},
                "legalofficer.initialCost": {relation: {entityName: "legalofficer", refField: "initialCost", refColumn: "initial_cost"}},
                "disputedocuments[].id": {relation: {entityName: "disputedocuments", refField: "id"}},
                "disputedocuments[].docPath": {relation: {entityName: "disputedocuments", refField: "docPath", refColumn: "doc_path"}},
                "disputedocuments[].uploadedDate": {relation: {entityName: "disputedocuments", refField: "uploadedDate", refColumn: "uploaded_date"}},
                "disputedocuments[].disputesId": {relation: {entityName: "disputedocuments", refField: "disputesId", refColumn: "disputes_id"}},
                "legalprecedents[].id": {relation: {entityName: "legalprecedents", refField: "id"}},
                "legalprecedents[].year": {relation: {entityName: "legalprecedents", refField: "year"}},
                "legalprecedents[].headline": {relation: {entityName: "legalprecedents", refField: "headline"}},
                "legalprecedents[].court": {relation: {entityName: "legalprecedents", refField: "court"}},
                "legalprecedents[].decision": {relation: {entityName: "legalprecedents", refField: "decision"}},
                "legalprecedents[].summary": {relation: {entityName: "legalprecedents", refField: "summary"}},
                "legalprecedents[].disputesId": {relation: {entityName: "legalprecedents", refField: "disputesId", refColumn: "disputes_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {
                disputecomments: {entity: DisputeComment, fieldName: "disputecomments", refTable: "dispute_comments", refColumns: ["disputes_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                land: {entity: Land, fieldName: "land", refTable: "lands", refColumns: ["id"], joinColumns: ["lands_id"], 'type: psql:ONE_TO_MANY},
                legalofficer: {entity: LegalOfficer, fieldName: "legalofficer", refTable: "legal_officer", refColumns: ["id"], joinColumns: ["legal_officer_id"], 'type: psql:ONE_TO_MANY},
                disputedocuments: {entity: DisputeDocument, fieldName: "disputedocuments", refTable: "disputes_document", refColumns: ["disputes_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE},
                legalprecedents: {entity: LegalPrecedent, fieldName: "legalprecedents", refTable: "legal_precedents", refColumns: ["disputes_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}
            }
        },
        [USER_TYPE]: {
            entityName: "UserType",
            tableName: "user_types",
            fieldMetadata: {
                id: {columnName: "id", dbGenerated: true},
                userTypes: {columnName: "user_types"},
                "userhasusertypes[].userTypesId": {relation: {entityName: "userhasusertypes", refField: "userTypesId", refColumn: "user_types_id"}},
                "userhasusertypes[].usersId": {relation: {entityName: "userhasusertypes", refField: "usersId", refColumn: "users_id"}}
            },
            keyFields: ["id"],
            joinMetadata: {userhasusertypes: {entity: UserHasUserType, fieldName: "userhasusertypes", refTable: "users_has_user_types", refColumns: ["user_types_id"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        }
    };

    public isolated function init(string url, string? user = (), string? password = (), jdbc:Options? connectionOptions = ()) returns persist:Error? {
        jdbc:Client|error dbClient = new (url = url, user = user, password = password, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [LAND_DOCUMENT]: check new (dbClient, self.metadata.get(LAND_DOCUMENT), psql:H2_SPECIFICS),
            [LEGAL_PRECEDENT]: check new (dbClient, self.metadata.get(LEGAL_PRECEDENT), psql:H2_SPECIFICS),
            [USER]: check new (dbClient, self.metadata.get(USER), psql:H2_SPECIFICS),
            [LEGAL_CLAUSE]: check new (dbClient, self.metadata.get(LEGAL_CLAUSE), psql:H2_SPECIFICS),
            [DISPUTE_DOCUMENT]: check new (dbClient, self.metadata.get(DISPUTE_DOCUMENT), psql:H2_SPECIFICS),
            [LEGAL_OFFICER]: check new (dbClient, self.metadata.get(LEGAL_OFFICER), psql:H2_SPECIFICS),
            [LAND_TRANSFER_CHAIN]: check new (dbClient, self.metadata.get(LAND_TRANSFER_CHAIN), psql:H2_SPECIFICS),
            [NLP_ANALYSIS_RESULT]: check new (dbClient, self.metadata.get(NLP_ANALYSIS_RESULT), psql:H2_SPECIFICS),
            [LAND_OWNER]: check new (dbClient, self.metadata.get(LAND_OWNER), psql:H2_SPECIFICS),
            [LAND]: check new (dbClient, self.metadata.get(LAND), psql:H2_SPECIFICS),
            [DISPUTE_COMMENT]: check new (dbClient, self.metadata.get(DISPUTE_COMMENT), psql:H2_SPECIFICS),
            [USER_HAS_USER_TYPE]: check new (dbClient, self.metadata.get(USER_HAS_USER_TYPE), psql:H2_SPECIFICS),
            [DISPUTE]: check new (dbClient, self.metadata.get(DISPUTE), psql:H2_SPECIFICS),
            [USER_TYPE]: check new (dbClient, self.metadata.get(USER_TYPE), psql:H2_SPECIFICS)
        };
    }

    isolated resource function get landdocuments(LandDocumentTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get landdocuments/[int id](LandDocumentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get legalprecedents/[int id](LegalPrecedentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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

    isolated resource function get users(UserTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get users/[int id](UserTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get legalclauses/[int id](LegalClauseTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get disputedocuments/[int id](DisputeDocumentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get legalofficers/[int id](LegalOfficerTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get landtransferchains/[int id](LandTransferChainTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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

    isolated resource function get nlpanalysisresults(NlpAnalysisResultTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get nlpanalysisresults/[int id](NlpAnalysisResultTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "queryOne"
    } external;

    isolated resource function post nlpanalysisresults(NlpAnalysisResultInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(NLP_ANALYSIS_RESULT);
        }
        sql:ExecutionResult[] result = check sqlClient.runBatchInsertQuery(data);
        return from sql:ExecutionResult inserted in result
            where inserted.lastInsertId != ()
            select <int>inserted.lastInsertId;
    }

    isolated resource function put nlpanalysisresults/[int id](NlpAnalysisResultUpdate value) returns NlpAnalysisResult|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(NLP_ANALYSIS_RESULT);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/nlpanalysisresults/[id].get();
    }

    isolated resource function delete nlpanalysisresults/[int id]() returns NlpAnalysisResult|persist:Error {
        NlpAnalysisResult result = check self->/nlpanalysisresults/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(NLP_ANALYSIS_RESULT);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get landowners(LandOwnerTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get landowners/[int id](LandOwnerTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get lands/[int id](LandTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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

    isolated resource function get disputecomments(DisputeCommentTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get disputecomments/[int id](DisputeCommentTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get userhasusertypes/[int usersId]/[int userTypesId](UserHasUserTypeTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "queryOne"
    } external;

    isolated resource function post userhasusertypes(UserHasUserTypeInsert[] data) returns [int, int][]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_HAS_USER_TYPE);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from UserHasUserTypeInsert inserted in data
            select [inserted.usersId, inserted.userTypesId];
    }

    isolated resource function put userhasusertypes/[int usersId]/[int userTypesId](UserHasUserTypeUpdate value) returns UserHasUserType|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_HAS_USER_TYPE);
        }
        _ = check sqlClient.runUpdateQuery({"usersId": usersId, "userTypesId": userTypesId}, value);
        return self->/userhasusertypes/[usersId]/[userTypesId].get();
    }

    isolated resource function delete userhasusertypes/[int usersId]/[int userTypesId]() returns UserHasUserType|persist:Error {
        UserHasUserType result = check self->/userhasusertypes/[usersId]/[userTypesId].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(USER_HAS_USER_TYPE);
        }
        _ = check sqlClient.runDeleteQuery({"usersId": usersId, "userTypesId": userTypesId});
        return result;
    }

    isolated resource function get disputes(DisputeTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get disputes/[int id](DisputeTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
        name: "query"
    } external;

    isolated resource function get usertypes/[int id](UserTypeTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor",
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
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.H2Processor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

