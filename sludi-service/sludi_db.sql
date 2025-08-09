/*
 Navicat Premium Dump SQL

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : sludi_db

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 09/08/2025 22:50:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `nic` varchar(12) DEFAULT NULL,
  `sludi` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sludi` (`sludi`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (1, 'Kamal', 'Perera', '200034502345', 'SL-UDI-000000001');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (2, 'Nimal', 'Fernando', '912345678V', 'SL-UDI-000000002');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (3, 'Sunil', 'Silva', '923456789V', 'SL-UDI-000000003');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (4, 'Amal', 'Gunawardena', '933456789V', 'SL-UDI-000000004');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (5, 'Dilan', 'Wickrama', '943456789V', 'SL-UDI-000000005');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (6, 'Ruwan', 'Bandara', '953456789V', 'SL-UDI-000000006');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (7, 'Asela', 'Rathnayake', '963456789V', 'SL-UDI-000000007');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (8, 'Roshan', 'Jayasinghe', '973456789V', 'SL-UDI-000000008');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (9, 'Chamara', 'Abeysekara', '983456789V', 'SL-UDI-000000009');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (10, 'Suresh', 'Hettiarachchi', '993456789V', 'SL-UDI-000000010');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (11, 'Dinuka', 'Ranasinghe', '003456789V', 'SL-UDI-000000011');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (12, 'Sameera', 'De Silva', '013456789V', 'SL-UDI-000000012');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (13, 'Thilina', 'Weerasinghe', '023456789V', 'SL-UDI-000000013');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (14, 'Malith', 'Dissanayake', '033456789V', 'SL-UDI-000000014');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (15, 'Ravindu', 'Jayawardana', '043456789V', 'SL-UDI-000000015');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (16, 'Shehan', 'Ratnayake', '053456789V', 'SL-UDI-000000016');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (17, 'Sajith', 'Weerasooriya', '063456789V', 'SL-UDI-000000017');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (18, 'Kasun', 'Gamage', '073456789V', 'SL-UDI-000000018');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (19, 'Isuru', 'Senanayake', '083456789V', 'SL-UDI-000000019');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (20, 'Harsha', 'Pathirana', '093456789V', 'SL-UDI-000000020');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (21, 'Chinthaka', 'Nanayakkara', '103456789V', 'SL-UDI-000000021');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (22, 'Ranga', 'Dias', '113456789V', 'SL-UDI-000000022');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (23, 'Niroshan', 'Jayalath', '123456789V', 'SL-UDI-000000023');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (24, 'Gihan', 'Liyanage', '133456789V', 'SL-UDI-000000024');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (25, 'Samantha', 'Pereira', '143456789V', 'SL-UDI-000000025');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (26, 'Lahiru', 'Silva', '153456789V', 'SL-UDI-000000026');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (27, 'Nadeesha', 'Kumari', '163456789V', 'SL-UDI-000000027');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (28, 'Hasitha', 'Perera', '173456789V', 'SL-UDI-000000028');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (29, 'Dilshan', 'Fernando', '183456789V', 'SL-UDI-000000029');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (30, 'Rashmi', 'Senarath', '193456789V', 'SL-UDI-000000030');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (31, 'Nimesha', 'Lakmali', '203456789V', 'SL-UDI-000000031');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (32, 'Tharaka', 'Jayasinghe', '213456789V', 'SL-UDI-000000032');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (33, 'Madushanka', 'Rajapaksha', '223456789V', 'SL-UDI-000000033');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (34, 'Devinda', 'Wickramasinghe', '233456789V', 'SL-UDI-000000034');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (35, 'Manjula', 'Samarasinghe', '243456789V', 'SL-UDI-000000035');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (36, 'Suranga', 'Amarasinghe', '253456789V', 'SL-UDI-000000036');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (37, 'Dinesh', 'Rajapaksha', '263456789V', 'SL-UDI-000000037');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (38, 'Indika', 'Wijesinghe', '273456789V', 'SL-UDI-000000038');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (39, 'Pasindu', 'Jayawardena', '283456789V', 'SL-UDI-000000039');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (40, 'Sewwandi', 'Bandara', '293456789V', 'SL-UDI-000000040');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (41, 'Piyumi', 'Navaratne', '303456789V', 'SL-UDI-000000041');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (42, 'Dilini', 'Senanayake', '313456789V', 'SL-UDI-000000042');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (43, 'Sajee', 'Jayasinghe', '323456789V', 'SL-UDI-000000043');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (44, 'Buddhika', 'Ratnayake', '333456789V', 'SL-UDI-000000044');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (45, 'Vindya', 'Wickrama', '343456789V', 'SL-UDI-000000045');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (46, 'Erandi', 'Rajakaruna', '353456789V', 'SL-UDI-000000046');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (47, 'Pasan', 'Gunasekara', '363456789V', 'SL-UDI-000000047');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (48, 'Minoli', 'Hettiarachchi', '373456789V', 'SL-UDI-000000048');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (49, 'Tharushi', 'Dias', '383456789V', 'SL-UDI-000000049');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (50, 'Dinithi', 'Weerasekara', '393456789V', 'SL-UDI-000000050');
INSERT INTO `users` (`id`, `fname`, `lname`, `nic`, `sludi`) VALUES (51, 'Hiranya', 'Gunawardhane', '200583703767', 'SL-UDI-000000051');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
