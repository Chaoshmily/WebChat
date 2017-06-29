/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50636
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50636
File Encoding         : 65001

Date: 2017-06-29 15:06:18
*/

SET FOREIGN_KEY_CHECKS=0;

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
