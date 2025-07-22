-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `lands_documents`;
DROP TABLE IF EXISTS `lands`;
DROP TABLE IF EXISTS `nlp_analysis_result`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
	`id` INT AUTO_INCREMENT,
	`user_id` VARCHAR(100) NOT NULL,
	`first_name` VARCHAR(50) NOT NULL,
	`last_name` VARCHAR(50) NOT NULL,
	`email` VARCHAR(200) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`nic` LONGBLOB NOT NULL,
	`sludi` LONGBLOB NOT NULL,
	`contact_no` LONGBLOB NOT NULL,
	`address` LONGBLOB,
	`user_status` ENUM('PENDING', 'ACTIVE', 'INACTIVE') NOT NULL,
	`user_type` ENUM('LAND_OWNER', 'LAND_OFFICER', 'ADMIN') NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `nlp_analysis_result` (
	`id` INT AUTO_INCREMENT,
	`_hashId` VARCHAR(60) NOT NULL,
	`results` VARCHAR(191),
	`result_summary` VARCHAR(191),
	`tags` VARCHAR(60),
	`trust` VARCHAR(20),
	PRIMARY KEY(`id`)
);

CREATE TABLE `lands` (
	`id` INT AUTO_INCREMENT,
	`_hashId` VARCHAR(60) NOT NULL,
	`land_id` VARCHAR(60) NOT NULL,
	`land_name` VARCHAR(60) NOT NULL,
	`land_place` VARCHAR(60) NOT NULL,
	`land_lat` DECIMAL(9,6) NOT NULL,
	`land_lang` DECIMAL(9,6) NOT NULL,
	`land_size` DOUBLE NOT NULL,
	`land_value` DECIMAL(20,6) NOT NULL,
	`land_type` VARCHAR(45) NOT NULL,
	`register_date` DATE NOT NULL,
	`land_status` ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL,
	`priority` INT NOT NULL,
	`land_owner_id` INT NOT NULL,
	FOREIGN KEY(`land_owner_id`) REFERENCES `users`(`id`),
	PRIMARY KEY(`id`)
);

CREATE TABLE `lands_documents` (
	`id` INT AUTO_INCREMENT,
	`doc_id` VARCHAR(60) NOT NULL,
	`doc_name` VARCHAR(60) NOT NULL,
	`doc_size` VARCHAR(10) NOT NULL,
	`doc_type` VARCHAR(45) NOT NULL,
	`uploaded_date` TIMESTAMP NOT NULL,
	`doc_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL,
	`lands_id` INT NOT NULL,
	FOREIGN KEY(`lands_id`) REFERENCES `lands`(`id`),
	`nlp_analysis_result_id` INT NOT NULL,
	FOREIGN KEY(`nlp_analysis_result_id`) REFERENCES `nlp_analysis_result`(`id`),
	PRIMARY KEY(`id`)
);


CREATE INDEX `fk_lands_documents_lands1_idx` ON `lands_documents` (`lands_id`);
CREATE INDEX `fk_lands_documents_nlp_analysis_result1_idx` ON `lands_documents` (`nlp_analysis_result_id`);
CREATE INDEX `fk_lands_users_idx` ON `lands` (`land_owner_id`);
