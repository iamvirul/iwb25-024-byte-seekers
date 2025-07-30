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

 Date: 30/07/2025 13:29:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for audits
-- ----------------------------
DROP TABLE IF EXISTS `audits`;
CREATE TABLE `audits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requestPath` varchar(60) NOT NULL,
  `requestMethod` varchar(45) NOT NULL,
  `userAgent` varchar(100) NOT NULL,
  `requestPayload` varchar(191) NOT NULL,
  `requestHost` varchar(100) NOT NULL,
  `requestedTime` datetime NOT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_audits_users1_idx` (`usersId`),
  CONSTRAINT `audits_ibfk_1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of audits
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for dispute_comments
-- ----------------------------
DROP TABLE IF EXISTS `dispute_comments`;
CREATE TABLE `dispute_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(191) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `disputesId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dispute_comments_disputes1_idx` (`disputesId`),
  CONSTRAINT `dispute_comments_ibfk_1` FOREIGN KEY (`disputesId`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dispute_comments
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for disputes
-- ----------------------------
DROP TABLE IF EXISTS `disputes`;
CREATE TABLE `disputes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caseId` varchar(50) NOT NULL,
  `witnessName` varchar(60) NOT NULL,
  `disputesDetails` varchar(191) NOT NULL,
  `estimateTime` varchar(45) NOT NULL,
  `status` enum('PENDING','RESOLVED') NOT NULL,
  `createdAt` timestamp NOT NULL,
  `landsId` int NOT NULL,
  `legalOfficerId` int NOT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_disputes_lands1_idx` (`landsId`),
  KEY `fk_disputes_legal_officer1_idx` (`legalOfficerId`),
  KEY `fk_disputes_users1_idx` (`usersId`),
  CONSTRAINT `disputes_ibfk_1` FOREIGN KEY (`landsId`) REFERENCES `lands` (`id`),
  CONSTRAINT `disputes_ibfk_2` FOREIGN KEY (`legalOfficerId`) REFERENCES `legal_officer` (`id`),
  CONSTRAINT `disputes_ibfk_3` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `docPath` varchar(100) NOT NULL,
  `uploadedDate` timestamp NOT NULL,
  `disputesId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_disputes_document_disputes1_idx` (`disputesId`),
  CONSTRAINT `disputes_document_ibfk_1` FOREIGN KEY (`disputesId`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `ownerId` varchar(60) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contactNo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `transferDate` datetime NOT NULL,
  `verifiedBy` varchar(100) NOT NULL,
  `blockIndex` int NOT NULL,
  `blockHash` varchar(128) NOT NULL,
  `prevBlockHash` varchar(128) NOT NULL,
  `fromLandOwnersId` int NOT NULL,
  `toLandOwnersId` int NOT NULL,
  `landsId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_land_transfer_chain_lands1_idx` (`landsId`),
  KEY `fk_land_transfer_chain_land_owners1_idx` (`fromLandOwnersId`),
  KEY `fk_land_transfer_chain_land_owners2_idx` (`toLandOwnersId`),
  CONSTRAINT `land_transfer_chain_ibfk_1` FOREIGN KEY (`fromLandOwnersId`) REFERENCES `land_owner` (`id`),
  CONSTRAINT `land_transfer_chain_ibfk_2` FOREIGN KEY (`toLandOwnersId`) REFERENCES `land_owner` (`id`),
  CONSTRAINT `land_transfer_chain_ibfk_3` FOREIGN KEY (`landsId`) REFERENCES `lands` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `landId` varchar(60) NOT NULL,
  `landName` varchar(60) NOT NULL,
  `landPlace` varchar(60) NOT NULL,
  `landLat` decimal(9,6) NOT NULL,
  `landLang` decimal(9,6) NOT NULL,
  `landSize` double NOT NULL,
  `landValue` decimal(20,6) NOT NULL,
  `landType` varchar(45) NOT NULL,
  `registerDate` date NOT NULL,
  `landStatus` enum('PENDING','VERIFIED','REJECTED') NOT NULL,
  `priority` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `docPath` varchar(60) NOT NULL,
  `docSize` varchar(10) NOT NULL,
  `docType` varchar(45) NOT NULL,
  `uploadedDate` timestamp NOT NULL,
  `docStatus` enum('PENDING','APPROVED','REJECTED') NOT NULL,
  `landsId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lands_documents_lands1_idx` (`landsId`),
  CONSTRAINT `lands_documents_ibfk_1` FOREIGN KEY (`landsId`) REFERENCES `lands` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `legalClause` varchar(191) NOT NULL,
  `legalPrecedentsId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_legal_clauses_legal_precedents1_idx` (`legalPrecedentsId`),
  CONSTRAINT `legal_clauses_ibfk_1` FOREIGN KEY (`legalPrecedentsId`) REFERENCES `legal_precedents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `year` date NOT NULL,
  `headline` varchar(100) NOT NULL,
  `court` enum('SUPREME_COURT','APPELLATE_COURT','HIGH_COURT','DISTRICT_COURT') NOT NULL,
  `decision` varchar(191) NOT NULL,
  `summary` varchar(191) NOT NULL,
  `disputesId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_legal_precedents_disputes1_idx` (`disputesId`),
  CONSTRAINT `legal_precedents_ibfk_1` FOREIGN KEY (`disputesId`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of legal_precedents
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for payment_history
-- ----------------------------
DROP TABLE IF EXISTS `payment_history`;
CREATE TABLE `payment_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `referanceNo` varchar(45) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `usersId` int NOT NULL,
  `legalOfficerId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_payment_history_users1_idx` (`usersId`),
  KEY `fk_payment_history_legal_officer1_idx` (`legalOfficerId`),
  CONSTRAINT `fk_payment_history_legal_officer1` FOREIGN KEY (`legalOfficerId`) REFERENCES `legal_officer` (`id`),
  CONSTRAINT `fk_payment_history_users1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of payment_history
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user_types
-- ----------------------------
DROP TABLE IF EXISTS `user_types`;
CREATE TABLE `user_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userTypes` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_types
-- ----------------------------
BEGIN;
INSERT INTO `user_types` (`id`, `userTypes`) VALUES (1, 'admin');
INSERT INTO `user_types` (`id`, `userTypes`) VALUES (2, 'land_owner');
INSERT INTO `user_types` (`id`, `userTypes`) VALUES (3, 'land_officer');
INSERT INTO `user_types` (`id`, `userTypes`) VALUES (4, 'legal_officer');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nic` longblob NOT NULL,
  `sludi` longblob,
  `contactNo` longblob NOT NULL,
  `address` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `userId`, `firstName`, `lastName`, `email`, `password`, `nic`, `sludi`, `contactNo`, `address`) VALUES (2, 'LCLO-ecc9c40b-d421-496a-a709-436a376f9ec3', 'Kamal', 'Perera', 'kamalperera@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$upOqB/PsEx/4bPfy2bnHZQ==$AS32Fii3joNRiHU09K3OqZYwORCpnEhq7pU/ppeqj8M=', 0x6B56455A3246585A763165653635514B43334939714E54524F555574796A6E483745706D3039715035506E72367770367159676643647256643563472B703370472B7761442B6234325558370D0A3848354D6F2B4F736A5746564B797845505938457646696871726F533934506F67524243714B38474E766B4E2B77634D614D6B4848335957742F702F436C6D445070557144596E4C2F6E34700D0A784C3046303872366C7A787259706C33766F542B384279416D62636E525A33463834595A7130422B5A612B5076644D694D472B754846674D39754F584C527455735337676A542F6931626A450D0A737534506B7A7236664A6E53306756546138776C413752356A434F6F57354F2F416D355858763068587A53566D6D6E7267496144416672577077364465365633456A72546869496A7A7078650D0A63506D797A4C4C4A37344B5265795953625758434A6E644C7556466F616863413243536471673D3D, 0x41464C4A6A742F54394C6C31544A41413759504576317179343758466C6533306B4A716F422B4A506C5236622F7A63717662325A6553534854364A4E746279367737386234542F43493573490D0A363339526A352F71783676316C44306A3748676843436735704F694570414C4D6236574454484B62786C4B66726F7261387865324277336E51756B76516C7A414F5A4B5666756B366F536F680D0A336E7936485575396764346263627A6C4F44757A684B4137515A76525553684A75624C59316B476C77412B67314854524C41365746667A494142666853636751704D497A326F594C58566B680D0A6635622F6734484C556D48797A34795576356567416D42662B766B7541322F306F4F667945506F502F7957456A666F6E6762726866364679555764334F4772783537416A2F6C4245306F62690D0A515A6539544666734E4F684B396F45424E56394C7879522B5650447345354B513262776838413D3D, 0x6A4C2B4A4B766A425A307167774B596A584F4B71546C4B47786C4A706B636F4C426A73306335504335766D7A33324F696B7468386E71645A4A6F71374F7163424B62793057356C3678376D5A0D0A522B443237625636593454772F4C424155775749517137693355456951536A4142305847796D70663850534E434E6275736A7266596C3950757868336D786C712F6E5A522F7A6875703078730D0A4A2B704F48454D4D337238674C6874614D4C306774497A566C636C41775976484266487956556A624F4B3454705370314B453659334342697937773571462F36333639612B576A656A2F434A0D0A5A58764466763474444D306255707946345A5446745043415A4F455334635A73464A333247735449795678337030566A6B3136744353324750334A4E6E515A35382F362B4C756A626E594E310D0A6F374F55494C594F726B3830474861414F715A716148592B667547534A6557613942636B4F673D3D, 0x7835584B4D423278793059794B634D4931516C66323377764236577667414279334568433638766E7054514653704465796F676E4C424757382B637050787972586552314D64312B784C4F390D0A6D424264477770465A4964464266616E6D30326F35555779666D524F54686471736D56585474375268306339516242636E766458464F763472396978524B38305A7A6E75445355344E4541300D0A386359316F636874536C38686845614276666658735671514A57316F4B48494E344B5479666E44374658354C306A4846776D53684941507661435A34426158366C56304F6E784C623342626D0D0A335242566E3334496E3954685070744D57704656364837474175477952416C62456E6C7A76447455456668466A79447A71555449336D31364954724D7141535850734B41382F68774262517A0D0A506D6B4A714B766B4563764C5037584E4A6969337A6D466E754850424745447A4C30396354513D3D);
COMMIT;

-- ----------------------------
-- Table structure for users_has_user_types
-- ----------------------------
DROP TABLE IF EXISTS `users_has_user_types`;
CREATE TABLE `users_has_user_types` (
  `userTypesId` int NOT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`usersId`,`userTypesId`),
  KEY `fk_users_has_user_types_users1_idx` (`usersId`),
  KEY `fk_users_has_user_types_user_types1_idx` (`userTypesId`),
  CONSTRAINT `users_has_user_types_ibfk_1` FOREIGN KEY (`userTypesId`) REFERENCES `user_types` (`id`),
  CONSTRAINT `users_has_user_types_ibfk_2` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users_has_user_types
-- ----------------------------
BEGIN;
INSERT INTO `users_has_user_types` (`userTypesId`, `usersId`) VALUES (1, 2);
INSERT INTO `users_has_user_types` (`userTypesId`, `usersId`) VALUES (2, 2);
INSERT INTO `users_has_user_types` (`userTypesId`, `usersId`) VALUES (3, 2);
INSERT INTO `users_has_user_types` (`userTypesId`, `usersId`) VALUES (4, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
