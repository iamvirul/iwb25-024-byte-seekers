/*
 Navicat Premium Dump SQL

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : land_chain

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 24/07/2025 00:58:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for disputes
-- ----------------------------
DROP TABLE IF EXISTS `disputes`;
CREATE TABLE `disputes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `case_id` varchar(50) NOT NULL,
  `lands_id` int NOT NULL,
  `witness_name` varchar(60) NOT NULL,
  `disputes_details` text NOT NULL,
  `legal_officer_id` int NOT NULL,
  `estimate_time` varchar(45) NOT NULL,
  `status` enum('PENDING','RESOLVED','REJECTED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_disputes_lands1_idx` (`lands_id`),
  KEY `fk_disputes_legal_officer1_idx` (`legal_officer_id`),
  CONSTRAINT `fk_disputes_lands1` FOREIGN KEY (`lands_id`) REFERENCES `lands` (`id`),
  CONSTRAINT `fk_disputes_legal_officer1` FOREIGN KEY (`legal_officer_id`) REFERENCES `legal_officer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of disputes
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for disputes_document
-- ----------------------------
DROP TABLE IF EXISTS `disputes_document`;
CREATE TABLE `disputes_document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doc_id` varchar(60) NOT NULL,
  `doc_name` varchar(60) NOT NULL,
  `uploaded_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disputes_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_disputes_document_disputes1_idx` (`disputes_id`),
  CONSTRAINT `fk_disputes_document_disputes1` FOREIGN KEY (`disputes_id`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of disputes_document
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for land_owner
-- ----------------------------
DROP TABLE IF EXISTS `land_owner`;
CREATE TABLE `land_owner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` varchar(60) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of land_owner
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for land_transfer_chain
-- ----------------------------
DROP TABLE IF EXISTS `land_transfer_chain`;
CREATE TABLE `land_transfer_chain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lands_id` int NOT NULL,
  `from_land_owners_id` int NOT NULL,
  `to_land_owners_id` int NOT NULL,
  `transfer_date` datetime NOT NULL,
  `verified_by` varchar(100) NOT NULL,
  `block_index` int NOT NULL,
  `block_hash` varchar(128) NOT NULL,
  `prev_block_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_land_transfer_chain_lands1_idx` (`lands_id`),
  KEY `fk_land_transfer_chain_land_owners1_idx` (`from_land_owners_id`),
  KEY `fk_land_transfer_chain_land_owners2_idx` (`to_land_owners_id`),
  CONSTRAINT `fk_land_transfer_chain_land_owners1` FOREIGN KEY (`from_land_owners_id`) REFERENCES `land_owner` (`id`),
  CONSTRAINT `fk_land_transfer_chain_land_owners2` FOREIGN KEY (`to_land_owners_id`) REFERENCES `land_owner` (`id`),
  CONSTRAINT `fk_land_transfer_chain_lands1` FOREIGN KEY (`lands_id`) REFERENCES `lands` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of land_transfer_chain
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for lands
-- ----------------------------
DROP TABLE IF EXISTS `lands`;
CREATE TABLE `lands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `_hashId` varchar(60) NOT NULL,
  `land_id` varchar(60) NOT NULL,
  `land_name` varchar(60) NOT NULL,
  `land_place` varchar(60) NOT NULL,
  `land_lat` decimal(9,6) NOT NULL,
  `land_lang` decimal(9,6) NOT NULL,
  `land_size` float NOT NULL,
  `land_value` decimal(20,6) NOT NULL,
  `land_type` varchar(45) NOT NULL,
  `register_date` date NOT NULL,
  `land_status` enum('PENDING','VERIFIED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `priority` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of lands
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for lands_documents
-- ----------------------------
DROP TABLE IF EXISTS `lands_documents`;
CREATE TABLE `lands_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doc_id` varchar(60) NOT NULL,
  `doc_name` varchar(60) NOT NULL,
  `doc_size` varchar(10) NOT NULL,
  `doc_type` varchar(45) NOT NULL,
  `uploaded_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `doc_status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `lands_id` int NOT NULL,
  `nlp_analysis_result_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lands_documents_lands1_idx` (`lands_id`),
  KEY `fk_lands_documents_nlp_analysis_result1_idx` (`nlp_analysis_result_id`),
  CONSTRAINT `fk_lands_documents_lands1` FOREIGN KEY (`lands_id`) REFERENCES `lands` (`id`),
  CONSTRAINT `fk_lands_documents_nlp_analysis_result1` FOREIGN KEY (`nlp_analysis_result_id`) REFERENCES `nlp_analysis_result` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of lands_documents
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for legal_clauses
-- ----------------------------
DROP TABLE IF EXISTS `legal_clauses`;
CREATE TABLE `legal_clauses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `legal_clause` text NOT NULL,
  `legal_precedents_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_legal_clauses_legal_precedents1_idx` (`legal_precedents_id`),
  CONSTRAINT `fk_legal_clauses_legal_precedents1` FOREIGN KEY (`legal_precedents_id`) REFERENCES `legal_precedents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of legal_clauses
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for legal_officer
-- ----------------------------
DROP TABLE IF EXISTS `legal_officer`;
CREATE TABLE `legal_officer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `BASL_ID` varchar(50) NOT NULL,
  `initial_cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of legal_officer
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for legal_precedents
-- ----------------------------
DROP TABLE IF EXISTS `legal_precedents`;
CREATE TABLE `legal_precedents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `disputes_id` int NOT NULL,
  `year` date NOT NULL,
  `headline` varchar(100) NOT NULL,
  `court` enum('SUPREME_COURT','APPELLATE_COURT','HIGH_COURT','DISTRICT_COURT') NOT NULL,
  `decision` text NOT NULL,
  `summary` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_legal_precedents_disputes1_idx` (`disputes_id`),
  CONSTRAINT `fk_legal_precedents_disputes1` FOREIGN KEY (`disputes_id`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of legal_precedents
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for nlp_analysis_result
-- ----------------------------
DROP TABLE IF EXISTS `nlp_analysis_result`;
CREATE TABLE `nlp_analysis_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `_hashId` varchar(60) NOT NULL,
  `results` text,
  `result_summary` text,
  `tags` varchar(60) DEFAULT NULL,
  `trust` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of nlp_analysis_result
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user_types
-- ----------------------------
DROP TABLE IF EXISTS `user_types`;
CREATE TABLE `user_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_types` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of user_types
-- ----------------------------
BEGIN;
INSERT INTO `user_types` (`id`, `user_types`) VALUES (1, 'admin');
INSERT INTO `user_types` (`id`, `user_types`) VALUES (2, 'land_owner');
INSERT INTO `user_types` (`id`, `user_types`) VALUES (3, 'land_officer');
INSERT INTO `user_types` (`id`, `user_types`) VALUES (4, 'legal_officer');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nic` blob NOT NULL,
  `sludi` blob,
  `contact_no` blob NOT NULL,
  `address` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `user_id`, `first_name`, `last_name`, `email`, `password`, `nic`, `sludi`, `contact_no`, `address`) VALUES (1, 'LCLO-2ce3347f-e515-4f31-8f81-f27f1856afb1', 'Virul', 'Wickramasinghe', 'virulwickramasinghe@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$WA775lgnlsbyvKXGAGOb0Q==$3WcVbFQX4N9XFl8lxHwmX79LXVNRLI6c+kU/fiFAS70=', 0x323030353238313030363334, 0x7375646931323334, 0x30373638313031303037, 0x3130372C486972616E6120526F61642C47616E67756C612C50616E6164757261);
INSERT INTO `users` (`id`, `user_id`, `first_name`, `last_name`, `email`, `password`, `nic`, `sludi`, `contact_no`, `address`) VALUES (2, 'LCLO-50f8d641-9e60-4014-8d23-aa593f495018', 'Hiranya', 'Gunawardhane', 'hiranyagunawardhane@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$TUW31Mk0L7hhJlIpobT0iw==$zwZ0f2gr+b1hFNDPC03BoR6kOD8EZhnPEy6E55n5bNc=', 0x59782F68426477766A747175455A7061566653443946444648696C644454716752644F6B6377697064756E4F6C2F786366574C494A62577659376F73554D4E6961386456754C3778783062570D0A6550314A6C64697235653531584847775078577370795064307143496C574859535165784A616A43497342744C566E4A44382B6B2F4E532B785A6C507175573031346533705070386E6167450D0A325A794E395655383464376C3858465737323641793650626372786C3037475443657878744F4F797A6A62524334372F4175714D78496B57784E7137464F50312B576D44443368506A6C6E5A0D0A417376386156524D3844376D79787A4F772F35353057776933324F4A384977492B384F444548665A6F64466F4B72436D346E31304F69734F337A654D642F7653344549736C716F4B74636C560D0A596E42326176463133647369713668424D3667473171303968365761524750674E61334471413D3D, 0x464E4E3367455A704D757457316561373851444C34425A45535259724C79424F396D397674767254524F39756365597A757A73306D3652474967467332306E675A78674B58384D457A7754390D0A366A624250316637584F4C71345333682B2B703446547950506768554A7149724978764E41324938445075515331624430755358464930762B4F4E58367944757A4B61644E4C486D69424E430D0A77564B765751333848515071783533626878724837384430447A6E46616777695843704C734F4377726F454A5146392F506C5245744570454E6A464C3948436F4C43375843377A74394437680D0A6F49334C656E554C4D5A6F735A355262754B4261524964323343366B543066336B74596550562B4D545943756C45326E754C49465A6630384371423663724E6954564237456C68744933382F0D0A6750794D2B574C367174754A67776B476944525635785155486B2F594E2F2F3864586F7951673D3D, 0x4F72737465655475466879336779475446344B39316D4B68736446376F4E6168355A4E6871424B6F6E4672554865694E4B736C4844656C2F6D4E2F636D73645262314766335079792B36504A0D0A4851674A3475526E2F3945582B49516C646B355545786579775761463645786A2F4569306E6B704D55444D625579556C4C70306D3649494E2F4831375653735836622B73527A5457436F596E0D0A75492F47426C5231642F376A3967387146496E31707379503958362F614B5A62694664636D4F5A7859766754354C6A66395456517750706B717139787A76747364613858796D5755527232530D0A374B495176385A6273346E5857347A5237426E756B4851366A4A567175514236715348437A734E6155416B636C494D666655635159456446535152306B6D5150776C7668312F566A4248415A0D0A532B4568374A42354E424861585569336A4F36494F7875596F536D573354736E30665A3159773D3D, 0x6D6B4D6C7A465573504652386250594237626B573432562B742B754E336F34726F3058356A4D575468716F41306550624E58367333496E386D49776B386C46655965322F786C7875636547620D0A6C4B446B6668455676503463676D784543614371564B52436977425A63765544666D584F444B6E53695A46446B316B536373766262465A64656B796F6B587A4C32787977696B4A6B576457790D0A376E2F617950334F524779495532486236637079623163387234706751394A596948415A56446A46765A375A315A30496C7070736A63307231586A424D35366B3556374A356B4C304D6C39610D0A677245516937357A50326737516D71773951483174675047624932614559554E37483566574E67726344666B676438526A51794265526B7251733063325032384B4A7330317A3755725338680D0A63502B464C356A46475347784E744C5832566D416D4B4F2F787368775970426A5842746872673D3D);
COMMIT;

-- ----------------------------
-- Table structure for users_has_user_types
-- ----------------------------
DROP TABLE IF EXISTS `users_has_user_types`;
CREATE TABLE `users_has_user_types` (
  `users_id` int NOT NULL,
  `user_types_id` int NOT NULL,
  PRIMARY KEY (`users_id`,`user_types_id`),
  KEY `fk_users_has_user_types_user_types1_idx` (`user_types_id`),
  KEY `fk_users_has_user_types_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_user_types_user_types1` FOREIGN KEY (`user_types_id`) REFERENCES `user_types` (`id`),
  CONSTRAINT `fk_users_has_user_types_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of users_has_user_types
-- ----------------------------
BEGIN;
INSERT INTO `users_has_user_types` (`users_id`, `user_types_id`) VALUES (2, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
