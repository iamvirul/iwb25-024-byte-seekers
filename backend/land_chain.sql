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

 Date: 07/08/2025 17:45:45
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
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `docPath` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of land_owner
-- ----------------------------
BEGIN;
INSERT INTO `land_owner` (`id`, `ownerId`, `firstName`, `lastName`, `nic`, `address`, `contactNo`) VALUES (1, 'LCLO-40216', 'කමල්', 'පෙරේරා', '200034502345', 'Colombo,Sri Lanka', '0765189765');
INSERT INTO `land_owner` (`id`, `ownerId`, `firstName`, `lastName`, `nic`, `address`, `contactNo`) VALUES (3, 'LCLO-40228', 'අසේල', 'රත්නායක', '963456789V', 'Anuradhapura,Sri Lanka', '07681901098');
INSERT INTO `land_owner` (`id`, `ownerId`, `firstName`, `lastName`, `nic`, `address`, `contactNo`) VALUES (4, 'LCLO-40230', 'රොෂාන්', 'ජයසිංහ', '973456789V', 'Gampaha,Sri Lanka', '0786511097');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of land_transfer_chain
-- ----------------------------
BEGIN;
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (1, '2025-08-07 11:39:00', 'REGISTRAR-01', 1, '86044d146ed7f05e2a4600963f9d7d0676da381a8bc6500e64744b2ef3de6200', '0', NULL, 3, 1);
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (2, '2025-08-07 15:12:00', '', 2, 'c50653e6969e6b31339e4dfd02bdcd459a5789f0282bcbc73ac063bbf41ffad2', '86044d146ed7f05e2a4600963f9d7d0676da381a8bc6500e64744b2ef3de6200', 3, 1, 1);
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (3, '2025-08-07 11:45:00', 'REGISTRAR-01', 1, '319344b5ae3fb885ef9f083063ff0a02b3a223d088533f089f12ef23b646c239', '0', NULL, 4, 2);
INSERT INTO `land_transfer_chain` (`id`, `transferDate`, `verifiedBy`, `blockIndex`, `blockHash`, `prevBlockHash`, `fromLandOwnersId`, `toLandOwnersId`, `landsId`) VALUES (4, '2025-08-07 07:22:00', '', 2, 'c1d1edf39486f41dcd81f1e8c75d24c003c4c7dfb8d17c8e39cce5969a31a2b4', '319344b5ae3fb885ef9f083063ff0a02b3a223d088533f089f12ef23b646c239', 4, 1, 2);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of lands
-- ----------------------------
BEGIN;
INSERT INTO `lands` (`id`, `landId`, `landName`, `landPlace`, `landLat`, `landLang`, `landSize`, `landValue`, `landType`, `registerDate`, `landStatus`, `priority`) VALUES (1, '9c6566c2-5846-4fb6-bc9a-6b45d67b6902', 'මහරගම නිවස', 'මහරගම', 6.850923, 79.922036, 300, 2000000.000000, 'Home Land', '2025-08-07', 'VERIFIED', 1);
INSERT INTO `lands` (`id`, `landId`, `landName`, `landPlace`, `landLat`, `landLang`, `landSize`, `landValue`, `landType`, `registerDate`, `landStatus`, `priority`) VALUES (2, '76cf7360-3ea3-4185-a743-285a9b4f8281', 'නුගේගොඩ බිම', 'නුගේගොඩ', 6.863348, 79.902120, 80, 10000000.000000, 'Home Land', '2025-08-07', 'VERIFIED', 1);
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
INSERT INTO `users` (`id`, `userId`, `firstName`, `lastName`, `email`, `password`, `nic`, `sludi`, `contactNo`, `address`) VALUES (1, 'LCLO-7d7ba8bb-3e71-4f6b-8d03-0cd587dac658', 'Kamal', 'Perera', 'kamalperera@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$jHTABAoznQTMfEssajsgRA==$UULdqeXIpALIQ76nrGPASjFixezoemEmkNaSd6SeU3w=', 0x796661796A675854673978546A5A4B71626473546F3637636E36427A43346C5A4D546D686F3670395536626C4D36344B4D5A49387A5861494E51345848564F502F50483269624E76636E44740D0A72716C4246565532455178693179595357534D72305335784A4B714863693959565A7356694A6466493250346E4F6474423965712B684E352F7347527973454B74746350306377736F57434E0D0A50684F5A66716734714737313036503336684263553234346A6C716555425131547A2F2B4464346D443244365735414E73444556346F59753331335553506365536D4278526D453752634B710D0A5555615A46536E4F39675A385A6D7371744E7A2B496E574F345667537553467966656D472F556638597A7045474E6F68793158645873494D2B7648422B6E734E5455497565546A4B74314A6A0D0A633241486434396661757030594D4C675479396C7364673041585A6D6D6445557867554975513D3D, 0x793638426D61314638632F616B646470794C706C70346A6F3651657A4B77336145704D703044304445564C597A526C326B7A3130464D44697A77366D6A316F647A483742394F6646386A36710D0A424772365837707A3677336B48676B55344E58544C79555548746441737134377637763445314F44316657686F5A37324430717130337249367A625A4E595653666152355871563673664E550D0A57764D504C74656E6776585A6A585346585A564B36473239682F7230306E51364E7138724F434A706A69764575646762336177433276664B6662673044747164626550535A796944502B4D6A0D0A774447435A43637277394B6A565070517A4C5A4C2B48544543443856303346536F7A466742414171777944764D507172566E5170396C36454B3777646D5679644174584649695272556851660D0A376D7674566473774A35615833707275735A664E43335739496431467343572F7956515373773D3D, 0x5978736848356A4D547A78734952624A652B78644669377235632B53745570654E6A347A30702F55744A5752722B41466359756B6D706D542B38525764697171425563745A657A30516958700D0A46637231434D714E67334D5935624E4D76672B774248374C68416E59302B697158473239517A764E474A30506750526F5332682F3757337743376E5076677231756A69617A795132533443320D0A466D765436724B4B6C4768496E434552715541746530704532384D56744A5652774E6748467561624D6F564D6A373853643832686B436D77556F4C554D35574B356648755666596E4C4346620D0A6F4678622B46733079344E617768746D556B697A687A7937667744774B7865546F4D306F644842434951496B7455436873336A516B49584C714F2B4B6E5438374C77447234427A56505342380D0A31722B5065415954794D4C594C3753622B5561596A7832594A56415868696733662F6F5343673D3D, 0x71682B6941414675786B4F7971643165665A5A6C522B595379557235566B4D6E5A464D75693743446E4147796B41335374396757677556645A555A6A43566B72796438754754734D746D4E630D0A5A2F5934325732445A6D6565327A386D62467356364F2F566D4C756E717169673170644F7174524C6F304131666F6C75612F566F74357A433374786241482F36506D7573594A7141534836330D0A326D64426A714E7A5533702F34544E703361663147794733686F526A655838643331735352522B354A35686D387154314E317463324E6D68366450622B3965674A63623063556167312F34630D0A4D47715177416B7432594D564E526872432B76744275764650716544594C4859674C71695A5A68677576634536634D61617043675878695546452B504D436833332F6732456C6C72584B7A340D0A6D636D5167666B74714B4B6162766C49636E4B6B366F426761453136637646596276733234513D3D);
INSERT INTO `users` (`id`, `userId`, `firstName`, `lastName`, `email`, `password`, `nic`, `sludi`, `contactNo`, `address`) VALUES (2, 'LCLO-59c1834e-0ce4-454f-807f-2a6a7337a2f5', 'Nimal', 'Fernando', 'nimalfernando@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$J2aUJn6S0tpFI0hlctM+lw==$btZ7zg/qOpBgrvglvps3VyYG9PCAP2nqiIkrI2tfcwk=', 0x6C65706F5A416749786171417546346D4E44744E596F77534556754470364E435872476873785731546349797062455761306E72716574575A6E366938714A4352305030397552716D7A344B0D0A493743694D56544370584E4D31453876322B38304553467154616F6478764F3639636752534865535563662B4C5964354D55754A2B54475868726634765334317771627850716441584958590D0A35534E6D4B514777397458322F7A532B3950553553664B75683451536F643939384535324D77684476612F596C4B5450466877645643545930686D544365564155694B54513851344149546D0D0A79687A45376C616D71646A554C6F5637786E666D397A31754D6266427762634464544D7547495A62413048536E54547972566E6443446C585A576B746D526C61336371302B783641337867510D0A522B346F7A31316F7878634F663447445A5659762B576364617433665447766C7031723964673D3D, 0x6935487838446B766436366D3747655935627A6735316D68686B666961514E464D68734F4B5A31764539644677305A3978616F764D38354A34317A4751775747784A544A36322B6A7372424D0D0A51717366713966793076494A43336B61412F694642722B6F502B4572352B3662417A6D596B59704239383956696D797A4B442F74414E557479434E776B637947656D4536303737572B6738510D0A42635743772F737030384E79586D4256467A50507039676131684E49736A7076544A556737313636556B567A6B71534D30304949566E6535612B6C4E2B774B586F6955477132673554647A690D0A703739774C563431304F5543367046584237523455346E5A32544D4D623551355059462F37756244773065397644544D65345065354A5A4E47725136414A7532646F505A467062762B6370390D0A666B763346505976655133767A736C352F4B30474264794F42347A746D343731574742364A413D3D, 0x77424853626D79534C7832526141765576674847726F6B3255646873545A724B64375935337648544E6A6C6A4E6D364C37753362344466474C547436626A56794A4952433457467A762F77360D0A6446335A344B4A3244647A36353542414D31366B656B4F78774C77665750437848562F5270434F6D76512F433034304364515A686C735563776E664257726458656D45733559695558436B2B0D0A4B37482B75324B684A6966736D4B643268757A4F376959456A435955535A5A36456966737A2B715A4C6E70373953454A56354C76687276687A697A647A5270393950586C75767644554A7A780D0A53386B77464C6D61393376436C356D33755542776E64776E5173475379527A6156736A2B4C2B755356694D4979433074487A66785375356F384E67663250766859325A7A3163363352766E330D0A597A6D716E2F6F716E44727057376D4B72696754334E58346C6E6751704247614650745952773D3D, 0x6468456862732B7454654C3561786A7073305177586F32456450786E5064436F2B502F672F76534F514B336A6B55796D417239724D55557551662B635A47426A574A302F6875374673374C490D0A383635457767344752376D3432535A6F4371544D4A50676377676A3336346465776E6A797270364C6548553556364C38546C6561466579743942433165616167624C587057397368413833770D0A597678344E4650366B79675455524B56674A6F67665453387771506E453047464631345875465250344648315653576C447847315A67615A524862586B596B4543356F4650412F387A4E774A0D0A3568577942304268374F4C4F355A50444B4A594271386E7A4B737A7A6F6A6272505942442F6E394A69414462386D4262396578747933644C714C414561564A654931726E65506D46723967500D0A647A4C4F5863364E335A573277626C436656332B4C30684E4B466E6D555458355771595671673D3D);
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
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
