// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer.
// It should not be modified by hand.

import ballerina/persist;

isolated final H2Client h2Client = check new ("jdbc:h2:./test", "sa", "");

public isolated function setupTestDB() returns persist:Error? {
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "users_has_user_types";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "lands_documents";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "disputes_document";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "land_transfer_chain";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "dispute_comments";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_clauses";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_precedents";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "audits";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "disputes";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "payment_history";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_officer";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "user_types";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "users";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "land_owner";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "lands";`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "lands" (
	"id" INT AUTO_INCREMENT,
	"landId" VARCHAR(60) NOT NULL,
	"landName" VARCHAR(60) NOT NULL,
	"landPlace" VARCHAR(60) NOT NULL,
	"landLat" DECIMAL(9,6) NOT NULL,
	"landLang" DECIMAL(9,6) NOT NULL,
	"landSize" FLOAT NOT NULL,
	"landValue" DECIMAL(20,6) NOT NULL,
	"landType" VARCHAR(45) NOT NULL,
	"registerDate" DATE NOT NULL,
	"landStatus" VARCHAR(8) CHECK ("landStatus" IN ('PENDING', 'VERIFIED', 'REJECTED')) NOT NULL,
	"priority" INT NOT NULL,
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "land_owner" (
	"id" INT AUTO_INCREMENT,
	"ownerId" VARCHAR(60) NOT NULL,
	"firstName" VARCHAR(50) NOT NULL,
	"lastName" VARCHAR(50) NOT NULL,
	"nic" VARCHAR(20) NOT NULL,
	"address" VARCHAR(255),
	"contactNo" VARCHAR(20),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "users" (
	"id" INT AUTO_INCREMENT,
	"userId" VARCHAR(100) NOT NULL,
	"firstName" VARCHAR(50) NOT NULL,
	"lastName" VARCHAR(50) NOT NULL,
	"email" VARCHAR(200) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"nic" LONGBLOB NOT NULL,
	"sludi" LONGBLOB,
	"contactNo" LONGBLOB NOT NULL,
	"address" LONGBLOB,
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "user_types" (
	"id" INT AUTO_INCREMENT,
	"userTypes" VARCHAR(45) NOT NULL,
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "legal_officer" (
	"id" INT AUTO_INCREMENT,
	"first_name" VARCHAR(50) NOT NULL,
	"last_name" VARCHAR(50) NOT NULL,
	"BASL_ID" VARCHAR(50) NOT NULL,
	"initial_cost" DECIMAL(10,2),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "payment_history" (
	"id" INT AUTO_INCREMENT,
	"referanceNo" VARCHAR(45) NOT NULL,
	"amount" DECIMAL(10,2) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"legalOfficerId" INT NOT NULL,
	FOREIGN KEY("legalOfficerId") REFERENCES "legal_officer"("id"),
	"usersId" INT NOT NULL,
	FOREIGN KEY("usersId") REFERENCES "users"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "disputes" (
	"id" INT AUTO_INCREMENT,
	"caseId" VARCHAR(50) NOT NULL,
	"witnessName" VARCHAR(60) NOT NULL,
	"disputesDetails" VARCHAR(191) NOT NULL,
	"estimateTime" VARCHAR(45) NOT NULL,
	"status" VARCHAR(8) CHECK ("status" IN ('PENDING', 'RESOLVED')) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"landsId" INT NOT NULL,
	FOREIGN KEY("landsId") REFERENCES "lands"("id"),
	"legalOfficerId" INT NOT NULL,
	FOREIGN KEY("legalOfficerId") REFERENCES "legal_officer"("id"),
	"usersId" INT NOT NULL,
	FOREIGN KEY("usersId") REFERENCES "users"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "audits" (
	"id" INT AUTO_INCREMENT,
	"requestPath" VARCHAR(60) NOT NULL,
	"requestMethod" VARCHAR(45) NOT NULL,
	"userAgent" VARCHAR(100) NOT NULL,
	"requestPayload" VARCHAR(191) NOT NULL,
	"requestHost" VARCHAR(100) NOT NULL,
	"requestedTime" DATETIME NOT NULL,
	"usersId" INT NOT NULL,
	FOREIGN KEY("usersId") REFERENCES "users"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "legal_precedents" (
	"id" INT AUTO_INCREMENT,
	"year" DATE NOT NULL,
	"headline" VARCHAR(100) NOT NULL,
	"court" VARCHAR(15) CHECK ("court" IN ('SUPREME_COURT', 'APPELLATE_COURT', 'HIGH_COURT', 'DISTRICT_COURT')) NOT NULL,
	"decision" VARCHAR(191) NOT NULL,
	"summary" VARCHAR(191) NOT NULL,
	"disputesId" INT NOT NULL,
	FOREIGN KEY("disputesId") REFERENCES "disputes"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "legal_clauses" (
	"id" INT AUTO_INCREMENT,
	"legalClause" VARCHAR(191) NOT NULL,
	"legalPrecedentsId" INT NOT NULL,
	FOREIGN KEY("legalPrecedentsId") REFERENCES "legal_precedents"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "dispute_comments" (
	"id" INT AUTO_INCREMENT,
	"comment" VARCHAR(191) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"disputesId" INT NOT NULL,
	FOREIGN KEY("disputesId") REFERENCES "disputes"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "land_transfer_chain" (
	"id" INT AUTO_INCREMENT,
	"transferDate" DATETIME NOT NULL,
	"verifiedBy" VARCHAR(100) NOT NULL,
	"blockIndex" INT NOT NULL,
	"blockHash" VARCHAR(128) NOT NULL,
	"prevBlockHash" VARCHAR(128) NOT NULL,
	"fromLandOwnersId" INT NOT NULL,
	FOREIGN KEY("fromLandOwnersId") REFERENCES "land_owner"("id"),
	"toLandOwnersId" INT NOT NULL,
	FOREIGN KEY("toLandOwnersId") REFERENCES "land_owner"("id"),
	"landsId" INT NOT NULL,
	FOREIGN KEY("landsId") REFERENCES "lands"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "disputes_document" (
	"id" INT AUTO_INCREMENT,
	"docPath" VARCHAR(100) NOT NULL,
	"uploadedDate" TIMESTAMP NOT NULL,
	"disputesId" INT NOT NULL,
	FOREIGN KEY("disputesId") REFERENCES "disputes"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "lands_documents" (
	"id" INT AUTO_INCREMENT,
	"docPath" VARCHAR(60) NOT NULL,
	"docSize" VARCHAR(10) NOT NULL,
	"docType" VARCHAR(45) NOT NULL,
	"uploadedDate" TIMESTAMP NOT NULL,
	"docStatus" VARCHAR(8) CHECK ("docStatus" IN ('PENDING', 'APPROVED', 'REJECTED')) NOT NULL,
	"landsId" INT NOT NULL,
	FOREIGN KEY("landsId") REFERENCES "lands"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "users_has_user_types" (
	"userTypesId" INT NOT NULL,
	FOREIGN KEY("userTypesId") REFERENCES "user_types"("id"),
	"usersId" INT NOT NULL,
	FOREIGN KEY("usersId") REFERENCES "users"("id"),
	PRIMARY KEY("userTypesId","usersId")
);`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_lands_documents_lands1_idx" ON "lands_documents" ("landsId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_legal_precedents_disputes1_idx" ON "legal_precedents" ("disputesId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_payment_history_users1_idx" ON "payment_history" ("usersId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_payment_history_legal_officer1_idx" ON "payment_history" ("legalOfficerId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_legal_clauses_legal_precedents1_idx" ON "legal_clauses" ("legalPrecedentsId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_disputes_document_disputes1_idx" ON "disputes_document" ("disputesId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_land_transfer_chain_land_owners1_idx" ON "land_transfer_chain" ("fromLandOwnersId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_land_transfer_chain_land_owners2_idx" ON "land_transfer_chain" ("toLandOwnersId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_land_transfer_chain_lands1_idx" ON "land_transfer_chain" ("landsId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_audits_users1_idx" ON "audits" ("usersId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_dispute_comments_disputes1_idx" ON "dispute_comments" ("disputesId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_users_has_user_types_user_types1_idx" ON "users_has_user_types" ("userTypesId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_users_has_user_types_users1_idx" ON "users_has_user_types" ("usersId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_disputes_lands1_idx" ON "disputes" ("landsId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_disputes_legal_officer1_idx" ON "disputes" ("legalOfficerId");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_disputes_users1_idx" ON "disputes" ("usersId");`);
}

public isolated function cleanupTestDB() returns persist:Error? {
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "users_has_user_types";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "lands_documents";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "disputes_document";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "land_transfer_chain";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "dispute_comments";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_clauses";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_precedents";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "audits";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "disputes";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "payment_history";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_officer";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "user_types";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "users";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "land_owner";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "lands";`);
}

