/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50636
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50636
File Encoding         : 65001

Date: 2017-06-29 15:06:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_chatlogs
-- ----------------------------
DROP TABLE IF EXISTS `t_chatlogs`;
CREATE TABLE `t_chatlogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sendTime` bigint(20) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `t_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;
