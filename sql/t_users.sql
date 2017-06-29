/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50636
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50636
File Encoding         : 65001

Date: 2017-06-29 15:06:29
*/

SET FOREIGN_KEY_CHECKS=0;

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
