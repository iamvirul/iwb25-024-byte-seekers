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

 Date: 07/08/2025 22:13:50
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
  `userAgent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `requestPayload` text NOT NULL,
  `requestHost` varchar(100) NOT NULL,
  `requestedTime` datetime NOT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_audits_users1_idx` (`usersId`),
  CONSTRAINT `audits_ibfk_1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of audits
-- ----------------------------
BEGIN;
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (1, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 11:10:47', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (2, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 11:10:52', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (3, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:21:20', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (4, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:21:20', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (5, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:21:20', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (6, '/land_officer/land/landowner/add', 'POST', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{\"firstName\":\"Kamal\",\"lastName\":\"Perera\",\"nic\":\"200034502345\",\"address\":\"Colombo,Sri Lanka\",\"contactNo\":\"0765189765\",\"ownerId\":\"LCLO-40216\"}', 'localhost:9070', '2025-08-07 11:21:48', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (7, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:22:03', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (8, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:22:03', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (9, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:22:03', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (10, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:25:29', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (11, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:25:29', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (12, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:25:30', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (13, '/land_officer/land/register', 'POST', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{\"landId\":\"LAND-3751\",\"landName\":\"මහරගම නිවස\",\"landPlace\":\"මහරගම\",\"landLat\":6.721273625932905,\"landLang\":79.90899777887803,\"landSize\":200,\"landValue\":2000000,\"landType\":\"Home Land\",\"registerDate\":{\"year\":2025,\"month\":8,\"day\":7},\"landStatus\":\"VERIFIED\",\"priority\":1,\"from_owner\":null,\"to_owner\":{\"ownerId\":\"\",\"firstName\":\"Asela\",\"lastName\":\"Rathnayake\",\"nic\":\"963456789V\",\"address\":\"Anuradhapura,Sri Lanka\",\"contactNo\":\"078761109\"},\"verified_by\":\"REGISTRAR-01\",\"transferDate\":\"2025-08-07T11:32:00.000Z\"}', 'localhost:9070', '2025-08-07 11:35:53', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (14, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:36:15', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (15, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:36:15', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (16, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:36:15', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (17, '/land_officer/user/land/details?landId=1', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:36:19', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (18, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:38:33', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (19, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:38:33', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (20, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:38:33', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (21, '/land_officer/land/register', 'POST', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{\"landId\":\"LAND-9956\",\"landName\":\"මහරගම නිවස\",\"landPlace\":\"මහරගම\",\"landLat\":6.850922956185473,\"landLang\":79.92203642678179,\"landSize\":300,\"landValue\":2000000,\"landType\":\"Home Land\",\"registerDate\":{\"year\":2025,\"month\":8,\"day\":7},\"landStatus\":\"VERIFIED\",\"priority\":1,\"from_owner\":null,\"to_owner\":{\"ownerId\":\"\",\"firstName\":\"අසේල\",\"lastName\":\"රත්නායක\",\"nic\":\"963456789V\",\"address\":\"Anuradhapura,Sri Lanka\",\"contactNo\":\"07681901098\"},\"verified_by\":\"REGISTRAR-01\",\"transferDate\":\"2025-08-07T11:39:00.000Z\"}', 'localhost:9070', '2025-08-07 11:41:11', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (22, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:41:49', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (23, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:41:49', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (24, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:41:49', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (25, '/land_officer/user/land/details?landId=1', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:41:52', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (26, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:42:13', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (27, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:42:13', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (28, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:42:13', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (29, '/land_officer/user/land/details?landId=1', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:42:18', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (30, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:43:37', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (31, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:43:37', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (32, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:43:37', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (33, '/land_officer/land/register', 'POST', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{\"landId\":\"LAND-5068\",\"landName\":\"නුගේගොඩ බිම\",\"landPlace\":\"නුගේගොඩ\",\"landLat\":6.8633480031297935,\"landLang\":79.90211999773298,\"landSize\":80,\"landValue\":10000000,\"landType\":\"Home Land\",\"registerDate\":{\"year\":2025,\"month\":8,\"day\":7},\"landStatus\":\"VERIFIED\",\"priority\":1,\"from_owner\":null,\"to_owner\":{\"ownerId\":\"\",\"firstName\":\"රොෂාන්\",\"lastName\":\"ජයසිංහ\",\"nic\":\"973456789V\",\"address\":\"Gampaha,Sri Lanka\",\"contactNo\":\"0786511097\"},\"verified_by\":\"REGISTRAR-01\",\"transferDate\":\"2025-08-07T11:45:00.000Z\"}', 'localhost:9070', '2025-08-07 11:48:03', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (34, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:52:20', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (35, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:52:20', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (36, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 11:52:21', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (37, '/land_officer/user/land/details?landId=2', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 11:52:24', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (38, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 11:53:21', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (39, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 11:53:21', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (40, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 11:53:25', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (41, '/land_owner/disputes/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 11:54:16', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (42, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 11:54:21', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (43, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 12:00:58', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (44, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 12:01:33', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (45, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:05:43', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (46, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:05:43', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (47, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:05:43', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (48, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:05:53', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (49, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:05:53', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (50, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:05:53', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (51, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:06:02', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (52, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:06:02', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (53, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:06:02', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (54, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:06:10', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (55, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:06:10', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (56, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:06:10', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (57, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:06:40', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (58, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:06:40', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (59, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:06:40', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (60, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:08:50', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (61, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:08:50', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (62, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:08:51', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (63, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:10:04', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (64, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:10:04', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (65, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:10:04', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (66, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:10:25', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (67, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:10:25', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (68, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:10:25', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (69, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:13:55', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (70, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:13:55', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (71, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:13:56', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (72, '/land_officer/user/land/details?landId=2', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:13:59', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (73, '/land_officer/land/register', 'POST', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{\"landId\":\"LAND-1092\",\"landName\":\"කඩුවෙල ගොවි බිම\",\"landPlace\":\"කඩුවෙල\",\"landLat\":7.052319259443447,\"landLang\":79.89352326617477,\"landSize\":10,\"landValue\":100000,\"landType\":\"Home Land\",\"registerDate\":{\"year\":2025,\"month\":8,\"day\":7},\"landStatus\":\"VERIFIED\",\"priority\":1,\"from_owner\":null,\"to_owner\":{\"ownerId\":\"\",\"firstName\":\"සුනිල්\",\"lastName\":\"සිල්වා\",\"nic\":\"923456789V\",\"address\":\"Piliyandala,Colombo\",\"contactNo\":\"0765410987\"},\"verified_by\":\"REGISTRAR-01\",\"transferDate\":\"2025-08-07T12:20:00.000Z\"}', 'localhost:9070', '2025-08-07 12:23:08', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (74, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:56:41', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (75, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:56:42', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (76, '/land_officer/user/landowners', 'GET', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '{}', 'localhost:9070', '2025-08-07 12:56:42', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (77, '/land_officer/data/stats/all', 'GET', 'ballerina', '{}', 'localhost:9070', '2025-08-07 12:56:43', 2);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (78, '/legal_officer/data/1', 'GET', 'ballerina', '{}', 'localhost:9080', '2025-08-07 16:37:29', 3);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (79, '/legal_officer/data/1', 'GET', 'ballerina', '{}', 'localhost:9080', '2025-08-07 16:37:29', 3);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (80, '/legal_officer/data/1', 'GET', 'ballerina', '{}', 'localhost:9080', '2025-08-07 16:37:33', 3);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (81, '/legal_officer/data/1', 'GET', 'ballerina', '{}', 'localhost:9080', '2025-08-07 16:39:59', 3);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (82, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:40:55', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (83, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:40:55', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (84, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:41:00', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (85, '/land_owner/disputes/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:41:14', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (86, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:41:17', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (87, '/land_owner/disputes/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:42:56', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (88, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:42:58', 1);
INSERT INTO `audits` (`id`, `requestPath`, `requestMethod`, `userAgent`, `requestPayload`, `requestHost`, `requestedTime`, `usersId`) VALUES (89, '/land_owner/stats/1', 'GET', 'ballerina', '{}', 'localhost:9098', '2025-08-07 16:43:03', 1);
COMMIT;

-- ----------------------------
-- Table structure for dispute_comments
-- ----------------------------
DROP TABLE IF EXISTS `dispute_comments`;
CREATE TABLE `dispute_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` timestamp NOT NULL,
  `disputesId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dispute_comments_disputes1_idx` (`disputesId`),
  CONSTRAINT `dispute_comments_ibfk_1` FOREIGN KEY (`disputesId`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dispute_comments
-- ----------------------------
BEGIN;
INSERT INTO `dispute_comments` (`id`, `comment`, `createdAt`, `disputesId`) VALUES (1, 'මෙම විවාදය සම්බන්ධයෙන් දෙපාර්ශ්වයකින්ම හිමිකම පිළිබඳව පවසා ඇත. නමුත් ඉඩමේ භූමිකත්ති සන්ධානය හා භාවිතය පිළිබඳව පළමු පාර්ශ්වය (සමන් පෙරේරා) විසින් ගතවූ අවුරුදු 10ක කාලය තුළ ඉඩම පවත්වාගෙන ගොස් ඇති බව සඳහන් වේ. නීතිමයව, මෙම භාවිතය නීතිගත හිමිකමක් සඳහා සාධකයක් විය හැකි බැවින්, පූර්ව අයිතිවාසිකම් ලේඛන, නියෝග, හා ගනුදෙනු ලිපි සහතික ලබා ගැනීම අත්‍යවශ්‍ය වේ. දෙපාර්ශ්වයන්ගෙන් තොරතුරු රැස් කර විශේෂ පරීක්ෂණයක් සිදු කළ යුතුය.', '2025-08-07 16:02:52', 2);
COMMIT;

-- ----------------------------
-- Table structure for disputes
-- ----------------------------
DROP TABLE IF EXISTS `disputes`;
CREATE TABLE `disputes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caseId` varchar(50) NOT NULL,
  `witnessName` varchar(60) NOT NULL,
  `disputesDetails` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of disputes
-- ----------------------------
BEGIN;
INSERT INTO `disputes` (`id`, `caseId`, `witnessName`, `disputesDetails`, `estimateTime`, `status`, `createdAt`, `landsId`, `legalOfficerId`, `usersId`) VALUES (1, 'CASE-154630540275', 'සුමින්ද ඩයස් ', 'ඉඩමේ හිමිකම් විවාදය\r\nමෙම ඉඩම සම්බන්ධව දැනට පුද්ගලයින් දෙදෙනෙක් හිමිකම පවසමින් විවාදයක නිරත වී සිටිති. සත්‍යාපිත ලිපි සහ සාක්ෂි පිළිබඳව පරීක්ෂණයක් අවශ්‍ය වේ. පලමු පාර්ශ්වය පසුගිය අවුරුදු 10ක කාලයක් මෙම ඉඩම භාවිතා කරමින් සිටී.', '', 'PENDING', '2025-08-07 15:46:31', 1, 1, 1);
INSERT INTO `disputes` (`id`, `caseId`, `witnessName`, `disputesDetails`, `estimateTime`, `status`, `createdAt`, `landsId`, `legalOfficerId`, `usersId`) VALUES (2, 'CASE-1549406013', 'අමර දිසානායක ', 'සීමා සම්බන්ධ විවාදය\r\nමහරගම නිවසට යාබදව පිහිටි ඉඩමක් හිමිකරුවෙකු සීමාව ඉක්මවා ව්‍යාප්ත ව්‍යාපාරික ගොඩනැගිල්ලක් ඉදිකර තිබේ. එය අපගේ ඉඩමේ කොටසක් ආවරණය කරමින් තිබේ. සීමා ලකුණු මකා දැමීමක් සහ නව සීමා නිර්මාණය කිරීමක් සිදුවී ඇත.', 'සති 2', 'PENDING', '2025-08-07 15:49:41', 1, 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for disputes_document
-- ----------------------------
DROP TABLE IF EXISTS `disputes_document`;
CREATE TABLE `disputes_document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `docPath` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uploadedDate` timestamp NOT NULL,
  `disputesId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_disputes_document_disputes1_idx` (`disputesId`),
  CONSTRAINT `disputes_document_ibfk_1` FOREIGN KEY (`disputesId`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of disputes_document
-- ----------------------------
BEGIN;
INSERT INTO `disputes_document` (`id`, `docPath`, `uploadedDate`, `disputesId`) VALUES (1, 'https://storage.googleapis.com/download/storage/v1/b/land_chain/o/CASE-154630540275_doc1.jpg?generation=1754581609039986&alt=media', '2025-08-07 15:46:49', 1);
INSERT INTO `disputes_document` (`id`, `docPath`, `uploadedDate`, `disputesId`) VALUES (2, 'https://storage.googleapis.com/download/storage/v1/b/land_chain/o/CASE-1549406013_doc1.pdf?generation=1754581787842074&alt=media', '2025-08-07 15:49:48', 2);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of land_owner
-- ----------------------------
BEGIN;
INSERT INTO `land_owner` (`id`, `ownerId`, `firstName`, `lastName`, `nic`, `address`, `contactNo`) VALUES (1, 'LCLO-40216', 'කමල්', 'පෙරේරා', '200034502345', 'Colombo,Sri Lanka', '0765189765');
INSERT INTO `land_owner` (`id`, `ownerId`, `firstName`, `lastName`, `nic`, `address`, `contactNo`) VALUES (3, 'LCLO-40228', 'අසේල', 'රත්නායක', '963456789V', 'Anuradhapura,Sri Lanka', '07681901098');
INSERT INTO `land_owner` (`id`, `ownerId`, `firstName`, `lastName`, `nic`, `address`, `contactNo`) VALUES (4, 'LCLO-40230', 'රොෂාන්', 'ජයසිංහ', '973456789V', 'Gampaha,Sri Lanka', '0786511097');
INSERT INTO `land_owner` (`id`, `ownerId`, `firstName`, `lastName`, `nic`, `address`, `contactNo`) VALUES (5, 'LCLO-bce8b8ba-3144-4819-a353-b0a18df7f22c', 'සුනිල්', 'සිල්වා', '923456789V', 'Piliyandala,Colombo', '0765410987');
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
  `fromLandOwnersId` int DEFAULT NULL,
  `toLandOwnersId` int NOT NULL,
  `landsId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_land_transfer_chain_lands1_idx` (`landsId`),
  KEY `fk_land_transfer_chain_land_owners1_idx` (`fromLandOwnersId`),
  KEY `fk_land_transfer_chain_land_owners2_idx` (`toLandOwnersId`),
  CONSTRAINT `land_transfer_chain_ibfk_1` FOREIGN KEY (`fromLandOwnersId`) REFERENCES `land_owner` (`id`),
  CONSTRAINT `land_transfer_chain_ibfk_2` FOREIGN KEY (`toLandOwnersId`) REFERENCES `land_owner` (`id`),
  CONSTRAINT `land_transfer_chain_ibfk_3` FOREIGN KEY (`landsId`) REFERENCES `lands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of land_transfer_chain
-- ----------------------------
BEGIN;
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (1, '2025-08-07 11:39:00', 'REGISTRAR-01', 1, '86044d146ed7f05e2a4600963f9d7d0676da381a8bc6500e64744b2ef3de6200', '0', NULL, 3, 1);
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (2, '2025-08-07 15:12:00', '', 2, 'c50653e6969e6b31339e4dfd02bdcd459a5789f0282bcbc73ac063bbf41ffad2', '86044d146ed7f05e2a4600963f9d7d0676da381a8bc6500e64744b2ef3de6200', 3, 1, 1);
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (3, '2025-08-07 11:45:00', 'REGISTRAR-01', 1, '319344b5ae3fb885ef9f083063ff0a02b3a223d088533f089f12ef23b646c239', '0', NULL, 4, 2);
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (4, '2025-08-07 07:22:00', '', 2, 'c1d1edf39486f41dcd81f1e8c75d24c003c4c7dfb8d17c8e39cce5969a31a2b4', '319344b5ae3fb885ef9f083063ff0a02b3a223d088533f089f12ef23b646c239', 4, 1, 2);
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (5, '2025-08-07 12:20:00', 'REGISTRAR-01', 1, '81fcd98aeaa63f7e00b5a99a6c8d6d096a25136dff7f80a6a981a86100ccbec9', '0', NULL, 5, 3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of lands
-- ----------------------------
BEGIN;
INSERT INTO `lands` (`id`, `landId`, `landName`, `landPlace`, `landLat`, `landLang`, `landSize`, `landValue`, `landType`, `registerDate`, `landStatus`, `priority`) VALUES (1, '9c6566c2-5846-4fb6-bc9a-6b45d67b6902', 'මහරගම නිවස', 'මහරගම', 6.850923, 79.922036, 300, 2000000.000000, 'Home Land', '2025-08-07', 'VERIFIED', 1);
INSERT INTO `lands` (`id`, `landId`, `landName`, `landPlace`, `landLat`, `landLang`, `landSize`, `landValue`, `landType`, `registerDate`, `landStatus`, `priority`) VALUES (2, '76cf7360-3ea3-4185-a743-285a9b4f8281', 'නුගේගොඩ බිම', 'නුගේගොඩ', 6.863348, 79.902120, 80, 10000000.000000, 'Home Land', '2025-08-07', 'VERIFIED', 1);
INSERT INTO `lands` (`id`, `landId`, `landName`, `landPlace`, `landLat`, `landLang`, `landSize`, `landValue`, `landType`, `registerDate`, `landStatus`, `priority`) VALUES (3, 'ba36e5ba-9ce0-4023-87a2-2bc4ea623a67', 'කඩුවෙල ගොවි බිම', 'කඩුවෙල', 7.052319, 79.893523, 10, 100000.000000, 'Home Land', '2025-08-07', 'VERIFIED', 1);
COMMIT;

-- ----------------------------
-- Table structure for lands_documents
-- ----------------------------
DROP TABLE IF EXISTS `lands_documents`;
CREATE TABLE `lands_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `docPath` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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
  `legalClause` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `legalPrecedentsId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_legal_clauses_legal_precedents1_idx` (`legalPrecedentsId`),
  CONSTRAINT `legal_clauses_ibfk_1` FOREIGN KEY (`legalPrecedentsId`) REFERENCES `legal_precedents` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of legal_clauses
-- ----------------------------
BEGIN;
INSERT INTO `legal_clauses` (`id`, `legalClause`, `legalPrecedentsId`) VALUES (1, 'මෙම වාර්තාව සකස් කරනු ලබන්නේ LAND-0100 ලෙස ලියාපදිංචි කළ ඉඩම සම්බන්ධව, දෙපාර්ශ්වයකින් හිමිකමක් පවසන විවාදයකට අදාළවය. සමන් පෙරේරා මහතා විසින් මෙම විවාදය ඉදිරිපත් කර ඇති අතර, ඔහු සඳහන් කරන්නේ අවුරුදු 10කට ආසන්න කාලයක් එම ඉඩම භාවිතා කරමින් පවත්වාගෙන ගොස් ඇති බවය. එමෙන්ම තවත් පාර්ශ්වයෙකුද එම ඉඩම සම්බන්ධව හිමිකමක් පවසන අතර, එමඟින් නීතිමය විභාගයක අවශ්‍යතාවක් ඇති වී ඇත.  ඉහත තොරතුරු මත පදනම්ව,  අදාළ ලේඛන (ඔප්පු, ගනුදෙනු, උරුම ලිපි),  භාවිතය පිළිබඳ සාක්ෂි,  භූමියෙහි වත්මන් තත්ත්වය, පරීක්ෂා කිරීමෙන් පසු නීතිමය ක්‍රියාමාර්ග ගත යුතුය.', 1);
INSERT INTO `legal_clauses` (`id`, `legalClause`, `legalPrecedentsId`) VALUES (2, 'දිවයිනේ දේපළ ගනුදෙනු නීතිය (Registration of Documents Ordinance, No. 23 of 1927)', 1);
INSERT INTO `legal_clauses` (`id`, `legalClause`, `legalPrecedentsId`) VALUES (3, 'නිතිමය වංචාවන් පිළිබඳ පනත (Penal Code, Section 415 & 417)', 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of legal_officer
-- ----------------------------
BEGIN;
INSERT INTO `legal_officer` (`id`, `first_name`, `last_name`, `BASL_ID`, `initial_cost`) VALUES (1, 'Kasun', 'Gamage', 'BSL-099372', 5000.00);
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
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `disputesId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_legal_precedents_disputes1_idx` (`disputesId`),
  CONSTRAINT `legal_precedents_ibfk_1` FOREIGN KEY (`disputesId`) REFERENCES `disputes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of legal_precedents
-- ----------------------------
BEGIN;
INSERT INTO `legal_precedents` (`id`, `year`, `headline`, `court`, `decision`, `summary`, `disputesId`) VALUES (1, '2025-01-01', '9c6566c2-5846-4fb6-bc9a-6b45d67b6902', 'HIGH_COURT', 'පැමිණිලිකරුට පක්ෂව ', 'මෙම වාර්තාව සකස් කරනු ලබන්නේ LAND-0100 ලෙස ලියාපදිංචි කළ ඉඩම සම්බන්ධව, දෙපාර්ශ්වයකින් හිමිකමක් පවසන විවාදයකට අදාළවය.\nසමන් පෙරේරා මහතා විසින් මෙම විවාදය ඉදිරිපත් කර ඇති අතර, ඔහු සඳහන් කරන්නේ අවුරුදු 10කට ආසන්න කාලයක් එම ඉඩම භාවිතා කරමින් පවත්වාගෙන ගොස් ඇති බවය.\nඑමෙන්ම තවත් පාර්ශ්වයෙකුද එම ඉඩම සම්බන්ධව හිමිකමක් පවසන අතර, එමඟින් නීතිමය විභාගයක අවශ්‍යතාවක් ඇති වී ඇත.\nඉහත තොරතුරු මත පදනම්ව,\nඅදාළ ලේඛන (ඔප්පු, ගනුදෙනු, උරුම ලිපි),\nභාවිතය පිළිබඳ සාක්ෂි,\nභූමියෙහි වත්මන් තත්ත්වය,\nපරීක්ෂා කිරීමෙන් පසු නීතිමය ක්‍රියාමාර්ග ගත යුතුය.', 2);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `userId`, `firstName`, `lastName`, `email`, `password`, `nic`, `sludi`, `contactNo`, `address`) VALUES (1, 'LCLO-7d7ba8bb-3e71-4f6b-8d03-0cd587dac658', 'Kamal', 'Perera', 'kamalperera@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$jHTABAoznQTMfEssajsgRA==$UULdqeXIpALIQ76nrGPASjFixezoemEmkNaSd6SeU3w=', 0x796661796A675854673978546A5A4B71626473546F3637636E36427A43346C5A4D546D686F3670395536626C4D36344B4D5A49387A5861494E51345848564F502F50483269624E76636E44740D0A72716C4246565532455178693179595357534D72305335784A4B714863693959565A7356694A6466493250346E4F6474423965712B684E352F7347527973454B74746350306377736F57434E0D0A50684F5A66716734714737313036503336684263553234346A6C716555425131547A2F2B4464346D443244365735414E73444556346F59753331335553506365536D4278526D453752634B710D0A5555615A46536E4F39675A385A6D7371744E7A2B496E574F345667537553467966656D472F556638597A7045474E6F68793158645873494D2B7648422B6E734E5455497565546A4B74314A6A0D0A633241486434396661757030594D4C675479396C7364673041585A6D6D6445557867554975513D3D, 0x793638426D61314638632F616B646470794C706C70346A6F3651657A4B77336145704D703044304445564C597A526C326B7A3130464D44697A77366D6A316F647A483742394F6646386A36710D0A424772365837707A3677336B48676B55344E58544C79555548746441737134377637763445314F44316657686F5A37324430717130337249367A625A4E595653666152355871563673664E550D0A57764D504C74656E6776585A6A585346585A564B36473239682F7230306E51364E7138724F434A706A69764575646762336177433276664B6662673044747164626550535A796944502B4D6A0D0A774447435A43637277394B6A565070517A4C5A4C2B48544543443856303346536F7A466742414171777944764D507172566E5170396C36454B3777646D5679644174584649695272556851660D0A376D7674566473774A35615833707275735A664E43335739496431467343572F7956515373773D3D, 0x5978736848356A4D547A78734952624A652B78644669377235632B53745570654E6A347A30702F55744A5752722B41466359756B6D706D542B38525764697171425563745A657A30516958700D0A46637231434D714E67334D5935624E4D76672B774248374C68416E59302B697158473239517A764E474A30506750526F5332682F3757337743376E5076677231756A69617A795132533443320D0A466D765436724B4B6C4768496E434552715541746530704532384D56744A5652774E6748467561624D6F564D6A373853643832686B436D77556F4C554D35574B356648755666596E4C4346620D0A6F4678622B46733079344E617768746D556B697A687A7937667744774B7865546F4D306F644842434951496B7455436873336A516B49584C714F2B4B6E5438374C77447234427A56505342380D0A31722B5065415954794D4C594C3753622B5561596A7832594A56415868696733662F6F5343673D3D, 0x71682B6941414675786B4F7971643165665A5A6C522B595379557235566B4D6E5A464D75693743446E4147796B41335374396757677556645A555A6A43566B72796438754754734D746D4E630D0A5A2F5934325732445A6D6565327A386D62467356364F2F566D4C756E717169673170644F7174524C6F304131666F6C75612F566F74357A433374786241482F36506D7573594A7141534836330D0A326D64426A714E7A5533702F34544E703361663147794733686F526A655838643331735352522B354A35686D387154314E317463324E6D68366450622B3965674A63623063556167312F34630D0A4D47715177416B7432594D564E526872432B76744275764650716544594C4859674C71695A5A68677576634536634D61617043675878695546452B504D436833332F6732456C6C72584B7A340D0A6D636D5167666B74714B4B6162766C49636E4B6B366F426761453136637646596276733234513D3D);
INSERT INTO `users` (`id`, `userId`, `firstName`, `lastName`, `email`, `password`, `nic`, `sludi`, `contactNo`, `address`) VALUES (2, 'LCLO-59c1834e-0ce4-454f-807f-2a6a7337a2f5', 'Nimal', 'Fernando', 'nimalfernando@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$J2aUJn6S0tpFI0hlctM+lw==$btZ7zg/qOpBgrvglvps3VyYG9PCAP2nqiIkrI2tfcwk=', 0x6C65706F5A416749786171417546346D4E44744E596F77534556754470364E435872476873785731546349797062455761306E72716574575A6E366938714A4352305030397552716D7A344B0D0A493743694D56544370584E4D31453876322B38304553467154616F6478764F3639636752534865535563662B4C5964354D55754A2B54475868726634765334317771627850716441584958590D0A35534E6D4B514777397458322F7A532B3950553553664B75683451536F643939384535324D77684476612F596C4B5450466877645643545930686D544365564155694B54513851344149546D0D0A79687A45376C616D71646A554C6F5637786E666D397A31754D6266427762634464544D7547495A62413048536E54547972566E6443446C585A576B746D526C61336371302B783641337867510D0A522B346F7A31316F7878634F663447445A5659762B576364617433665447766C7031723964673D3D, 0x6935487838446B766436366D3747655935627A6735316D68686B666961514E464D68734F4B5A31764539644677305A3978616F764D38354A34317A4751775747784A544A36322B6A7372424D0D0A51717366713966793076494A43336B61412F694642722B6F502B4572352B3662417A6D596B59704239383956696D797A4B442F74414E557479434E776B637947656D4536303737572B6738510D0A42635743772F737030384E79586D4256467A50507039676131684E49736A7076544A556737313636556B567A6B71534D30304949566E6535612B6C4E2B774B586F6955477132673554647A690D0A703739774C563431304F5543367046584237523455346E5A32544D4D623551355059462F37756244773065397644544D65345065354A5A4E47725136414A7532646F505A467062762B6370390D0A666B763346505976655133767A736C352F4B30474264794F42347A746D343731574742364A413D3D, 0x77424853626D79534C7832526141765576674847726F6B3255646873545A724B64375935337648544E6A6C6A4E6D364C37753362344466474C547436626A56794A4952433457467A762F77360D0A6446335A344B4A3244647A36353542414D31366B656B4F78774C77665750437848562F5270434F6D76512F433034304364515A686C735563776E664257726458656D45733559695558436B2B0D0A4B37482B75324B684A6966736D4B643268757A4F376959456A435955535A5A36456966737A2B715A4C6E70373953454A56354C76687276687A697A647A5270393950586C75767644554A7A780D0A53386B77464C6D61393376436C356D33755542776E64776E5173475379527A6156736A2B4C2B755356694D4979433074487A66785375356F384E67663250766859325A7A3163363352766E330D0A597A6D716E2F6F716E44727057376D4B72696754334E58346C6E6751704247614650745952773D3D, 0x6468456862732B7454654C3561786A7073305177586F32456450786E5064436F2B502F672F76534F514B336A6B55796D417239724D55557551662B635A47426A574A302F6875374673374C490D0A383635457767344752376D3432535A6F4371544D4A50676377676A3336346465776E6A797270364C6548553556364C38546C6561466579743942433165616167624C587057397368413833770D0A597678344E4650366B79675455524B56674A6F67665453387771506E453047464631345875465250344648315653576C447847315A67615A524862586B596B4543356F4650412F387A4E774A0D0A3568577942304268374F4C4F355A50444B4A594271386E7A4B737A7A6F6A6272505942442F6E394A69414462386D4262396578747933644C714C414561564A654931726E65506D46723967500D0A647A4C4F5863364E335A573277626C436656332B4C30684E4B466E6D555458355771595671673D3D);
INSERT INTO `users` (`id`, `userId`, `firstName`, `lastName`, `email`, `password`, `nic`, `sludi`, `contactNo`, `address`) VALUES (3, 'LCLO-eb3e08df-3ed5-45b3-921e-ef37c514a6bf', 'Kasun', 'Gamage', 'kasungamage@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$E5Ili1jFivpZjyoKC0q/SQ==$7O+XzWt4vTSzJ4rrhsS43w1wx3O7v0+7BLOUctq49D4=', 0x482F69707366737461637734766A6C6E357371625766494D4846736874634B61625459636E6A445535344847526A68694D7A4A79744A474C612B635A4750662F714737486468524E576B55710D0A6E4B7744765A644D41365A482F58334C4D4A4944333741536D352F52755930384C6444686C486D586D6A68713135686F5945706F35546D4C333571416C74546C2F2B6B31736F336B734569660D0A357443574644304D36484153666A66726F684C6E674435556F62644575496C776D657047534742456D37386F664E52746833502F6C5271756E65676C42476D63656E3233596E613878566F750D0A6834424D4C6F7374612F633563315264727162393244516477433831385146594C7A474A685631364B6376597974564B53473034787577584466624C306A4355366D657A70627449303576550D0A432F7A586F44613565657A7879494556787867675743307839532B7855735158795A4E4A44413D3D, 0x453632564832444B4D2B38715956695A2F5473796C582B5343784D533833376930546F414C4C6938544950716C2F656A6941367A6274535672655754396671674378394D61515934454D78330D0A677A6B534F786C686B6D636773656C416F684138572F456A544F725A5036622B574947597444465176514D59774A35626C503035704E6A643834743051556B474F57516F386957537562784E0D0A4F7A344F6D486E75443478655063376F706232536432534B5A59595174536571573331356F6C3136715839544C794631435077457A2B5943765777464957577A3661616E676A5432493836710D0A693637454E366F323439514542394139304A62745A48616775544D30474D54594A6139462F614D3242556A586A4742714A6B65324E6C347A4173383836777933746F746F6A2F393162656C300D0A51395165306D51314A64686F68526C56666873786667675845454B45734C4A5330376F4A6E673D3D, 0x626C6764524A37752B47374352706230525932593351796458343459747468636E474A693870486F7546337A41496C566B354C795936554674724D6C573531514563434E426348442B3572540D0A737747624A434A74387064706671452B79502B4F6C784642587243416F75674A663542567850316F566D766D48735168513741594A7149463344466A746174386E79347A39655A315447614B0D0A52547836454E4F504D4457595A5136334C5569787745547534634B754E6B784F5A56354E52594B7375505169635A48695A6C585A582F5533384942474D5267585753486C58587668364D57640D0A4645482F4E686167362F4F7542556A61305365415245637830377671346365416C713053484761654245697759586E72533675464239654650545439392F4347704E3445736B7A434234336D0D0A3530545A5953694B4A2F363949595649395451664B61324E62456335634A68574F775A646B673D3D, 0x41456941426F6F2F7A786C794176706D42515233544168336435776B7849596C4F70496C334D63566B654B33494E51717572624F482B527652484972627A4472502B6A2B576A3957525542310D0A6A4A697A67434F762F52764F4D36493769417A69486773374E4D426741522F7773464D4F39424336794B6A487846567A4F4E6A51435142505A7A3549344A4C4868635856477832514A3362640D0A7373482F385831786736756A524645526446586D667A376A6C614479786C676B7839536373746D52734A355177376A636D716267464D584F3841665954567073594D6B377141592B4D614C700D0A4E596237477345414A592B4E6E56752B2F30622F5458466D2B4A474D2F375267472B4F525252655A694F51327369314D555379437839456C3634736B36794943776441776E6A747155356A370D0A565143446F73436550712F4275787A5461446E2F7469656F327155502F48334A654454782F673D3D);
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
INSERT INTO `users_has_user_types` (`userTypesId`, `usersId`) VALUES (2, 1);
INSERT INTO `users_has_user_types` (`userTypesId`, `usersId`) VALUES (3, 2);
INSERT INTO `users_has_user_types` (`userTypesId`, `usersId`) VALUES (4, 3);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
