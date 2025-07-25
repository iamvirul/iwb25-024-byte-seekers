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
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "disputes";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_officer";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "user_types";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "users";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "nlp_analysis_result";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "land_owner";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "lands";`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "lands" (
	"id" INT AUTO_INCREMENT,
	"land_id" VARCHAR(60) NOT NULL,
	"land_name" VARCHAR(60) NOT NULL,
	"land_place" VARCHAR(60) NOT NULL,
	"land_lat" DECIMAL(9,6) NOT NULL,
	"land_lang" DECIMAL(9,6) NOT NULL,
	"land_size" FLOAT NOT NULL,
	"land_value" DECIMAL(20,6) NOT NULL,
	"land_type" VARCHAR(45) NOT NULL,
	"register_date" DATE NOT NULL,
	"land_status" VARCHAR(8) CHECK ("land_status" IN ('PENDING', 'VERIFIED', 'REJECTED')) NOT NULL,
	"priority" INT NOT NULL,
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "land_owner" (
	"id" INT AUTO_INCREMENT,
	"owner_id" VARCHAR(60) NOT NULL,
	"first_name" VARCHAR(50) NOT NULL,
	"last_name" VARCHAR(50) NOT NULL,
	"nic" VARCHAR(20) NOT NULL,
	"address" VARCHAR(255),
	"contact_no" VARCHAR(20),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "nlp_analysis_result" (
	"id" INT AUTO_INCREMENT,
	"_hashId" VARCHAR(60) NOT NULL,
	"results" VARCHAR(191),
	"result_summary" VARCHAR(191),
	"tags" VARCHAR(60),
	"trust" VARCHAR(20),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "users" (
	"id" INT AUTO_INCREMENT,
	"user_id" VARCHAR(100) NOT NULL,
	"first_name" VARCHAR(50) NOT NULL,
	"last_name" VARCHAR(50) NOT NULL,
	"email" VARCHAR(200) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"nic" LONGBLOB NOT NULL,
	"sludi" LONGBLOB,
	"contact_no" LONGBLOB NOT NULL,
	"address" LONGBLOB,
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "user_types" (
	"id" INT AUTO_INCREMENT,
	"user_types" VARCHAR(45) NOT NULL,
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
CREATE TABLE "disputes" (
	"id" INT AUTO_INCREMENT,
	"case_id" VARCHAR(50) NOT NULL,
	"witness_name" VARCHAR(60) NOT NULL,
	"disputes_details" VARCHAR(191) NOT NULL,
	"estimate_time" VARCHAR(45),
	"status" VARCHAR(8) CHECK ("status" IN ('PENDING', 'RESOLVED', 'REJECTED')) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"lands_id" INT NOT NULL,
	FOREIGN KEY("lands_id") REFERENCES "lands"("id"),
	"legal_officer_id" INT NOT NULL,
	FOREIGN KEY("legal_officer_id") REFERENCES "legal_officer"("id"),
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
	"disputes_id" INT NOT NULL,
	FOREIGN KEY("disputes_id") REFERENCES "disputes"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "legal_clauses" (
	"id" INT AUTO_INCREMENT,
	"legal_clause" VARCHAR(191) NOT NULL,
	"legal_precedents_id" INT NOT NULL,
	FOREIGN KEY("legal_precedents_id") REFERENCES "legal_precedents"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "dispute_comments" (
	"id" INT AUTO_INCREMENT,
	"comment" VARCHAR(191) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"disputes_id" INT NOT NULL,
	FOREIGN KEY("disputes_id") REFERENCES "disputes"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "land_transfer_chain" (
	"id" INT AUTO_INCREMENT,
	"transfer_date" DATETIME NOT NULL,
	"verified_by" VARCHAR(100) NOT NULL,
	"block_index" INT NOT NULL,
	"block_hash" VARCHAR(128) NOT NULL,
	"prev_block_hash" VARCHAR(128) NOT NULL,
	"from_land_owners_id" INT NOT NULL,
	FOREIGN KEY("from_land_owners_id") REFERENCES "land_owner"("id"),
	"to_land_owners_id" INT NOT NULL,
	FOREIGN KEY("to_land_owners_id") REFERENCES "land_owner"("id"),
	"lands_id" INT NOT NULL,
	FOREIGN KEY("lands_id") REFERENCES "lands"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "disputes_document" (
	"id" INT AUTO_INCREMENT,
	"doc_path" VARCHAR(100) NOT NULL,
	"uploaded_date" TIMESTAMP NOT NULL,
	"disputes_id" INT NOT NULL,
	FOREIGN KEY("disputes_id") REFERENCES "disputes"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "lands_documents" (
	"id" INT AUTO_INCREMENT,
	"doc_path" VARCHAR(60) NOT NULL,
	"doc_size" VARCHAR(10) NOT NULL,
	"doc_type" VARCHAR(45) NOT NULL,
	"uploaded_date" TIMESTAMP NOT NULL,
	"doc_status" VARCHAR(8) CHECK ("doc_status" IN ('PENDING', 'APPROVED', 'REJECTED')) NOT NULL,
	"lands_id" INT NOT NULL,
	FOREIGN KEY("lands_id") REFERENCES "lands"("id"),
	"nlp_analysis_result_id" INT NOT NULL,
	FOREIGN KEY("nlp_analysis_result_id") REFERENCES "nlp_analysis_result"("id"),
	PRIMARY KEY("id")
);`);
    _ = check h2Client->executeNativeSQL(`
CREATE TABLE "users_has_user_types" (
	"user_types_id" INT NOT NULL,
	FOREIGN KEY("user_types_id") REFERENCES "user_types"("id"),
	"users_id" INT NOT NULL,
	FOREIGN KEY("users_id") REFERENCES "users"("id"),
	PRIMARY KEY("users_id","user_types_id")
);`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_lands_documents_lands1_idx" ON "lands_documents" ("lands_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_lands_documents_nlp_analysis_result1_idx" ON "lands_documents" ("nlp_analysis_result_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_legal_precedents_disputes1_idx" ON "legal_precedents" ("disputes_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_legal_clauses_legal_precedents1_idx" ON "legal_clauses" ("legal_precedents_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_disputes_document_disputes1_idx" ON "disputes_document" ("disputes_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_land_transfer_chain_lands1_idx" ON "land_transfer_chain" ("lands_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_land_transfer_chain_land_owners1_idx" ON "land_transfer_chain" ("from_land_owners_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_land_transfer_chain_land_owners2_idx" ON "land_transfer_chain" ("to_land_owners_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_dispute_comments_disputes1_idx" ON "dispute_comments" ("disputes_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_users_has_user_types_users1_idx" ON "users_has_user_types" ("users_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_users_has_user_types_user_types1_idx" ON "users_has_user_types" ("user_types_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_disputes_lands1_idx" ON "disputes" ("lands_id");`);
    _ = check h2Client->executeNativeSQL(`CREATE INDEX "fk_disputes_legal_officer1_idx" ON "disputes" ("legal_officer_id");`);
}

public isolated function cleanupTestDB() returns persist:Error? {
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "users_has_user_types";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "lands_documents";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "disputes_document";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "land_transfer_chain";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "dispute_comments";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_clauses";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_precedents";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "disputes";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "legal_officer";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "user_types";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "users";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "nlp_analysis_result";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "land_owner";`);
    _ = check h2Client->executeNativeSQL(`DROP TABLE IF EXISTS "lands";`);
}

