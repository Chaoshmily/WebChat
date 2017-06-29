/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50636
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50636
File Encoding         : 65001

Date: 2017-06-29 15:06:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_admins
-- ----------------------------
DROP TABLE IF EXISTS `t_admins`;
CREATE TABLE `t_admins` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_bases
-- ----------------------------
DROP TABLE IF EXISTS `t_bases`;
CREATE TABLE `t_bases` (
  `id` int(11) NOT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `hobby` varchar(200) DEFAULT NULL,
  `say` varchar(200) DEFAULT NULL,
  `bc` varchar(20) DEFAULT NULL,
  `fc` varchar(20) DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `t_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `online` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
