/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : test_ic50

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-01-17 14:38:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_APP`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_APP`;
CREATE TABLE `TBL_AA_APP` (
  `APP_ID` VARCHAR(32) NOT NULL,
  `APP_CODE` VARCHAR(32) NOT NULL,
  `APP_NAME` VARCHAR(50) NOT NULL,
  `APP_DESC` VARCHAR(255) DEFAULT NULL,
  `CREATED_DT` DATETIME NOT NULL,
  `CREATED_BY` VARCHAR(32) NOT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`APP_ID`),
  UNIQUE KEY `APP_CODE` (`APP_CODE`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_GROUP`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_GROUP`;
CREATE TABLE `TBL_AA_GROUP` (
  `GROUP_ID` VARCHAR(32) NOT NULL,
  `GROUP_NAME` VARCHAR(50) NOT NULL,
  `GROUP_DESC` VARCHAR(255) DEFAULT NULL,
  `GROUP_LABEL` VARCHAR(50) DEFAULT NULL,
  `GROUP_PARENT_ID` VARCHAR(32) DEFAULT NULL,
  `LEFT_INDEX` INT(11) DEFAULT NULL,
  `RIGHT_INDEX` INT(11) DEFAULT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`GROUP_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_GROUP_ADMIN`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_GROUP_ADMIN`;
CREATE TABLE `TBL_AA_GROUP_ADMIN` (
  `GROUP_ID` VARCHAR(32) NOT NULL,
  `ADMIN_TYPE` VARCHAR(1) NOT NULL,
  `ADMIN_ID` VARCHAR(32) NOT NULL,
  `DELEGATOR_ID` VARCHAR(32) DEFAULT NULL,
  `PRECEDENCE` INT(11) DEFAULT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`GROUP_ID`,`ADMIN_TYPE`,`ADMIN_ID`),
  KEY `ADMIN_ID` (`ADMIN_ID`),
  KEY `DELEGATOR_ID` (`DELEGATOR_ID`),
  CONSTRAINT `TBL_AA_GROUP_ADMIN_IBFK_1` FOREIGN KEY (`GROUP_ID`) REFERENCES `TBL_AA_GROUP` (`GROUP_ID`),
  CONSTRAINT `TBL_AA_GROUP_ADMIN_IBFK_2` FOREIGN KEY (`ADMIN_ID`) REFERENCES `TBL_AA_SUBJECT` (`SUBJECT_ID`),
  CONSTRAINT `TBL_AA_GROUP_ADMIN_IBFK_3` FOREIGN KEY (`DELEGATOR_ID`) REFERENCES `TBL_AA_SUBJECT` (`SUBJECT_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_GROUP2RES`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_GROUP2RES`;
CREATE TABLE `TBL_AA_GROUP2RES` (
  `GROUP_ID` VARCHAR(32) NOT NULL,
  `RESOURCES_ID` VARCHAR(32) NOT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`GROUP_ID`,`RESOURCES_ID`),
  KEY `RESOURCES_ID` (`RESOURCES_ID`),
  CONSTRAINT `TBL_AA_GROUP2RES_IBFK_1` FOREIGN KEY (`GROUP_ID`) REFERENCES `TBL_AA_GROUP` (`GROUP_ID`),
  CONSTRAINT `TBL_AA_GROUP2RES_IBFK_2` FOREIGN KEY (`RESOURCES_ID`) REFERENCES `TBL_AA_RESOURCES` (`RESOURCES_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- RECORDS OF TBL_AA_GROUP2RES
-- ----------------------------


-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_RES2RES`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_RES2RES`;
CREATE TABLE `TBL_AA_RES2RES` (
  `RESOURCES_ID` VARCHAR(32) NOT NULL,
  `PARENT_RES_ID` VARCHAR(32) NOT NULL,
  `EFFECTIVE_DT` DATE DEFAULT NULL,
  `EXPIRY_DT` DATE DEFAULT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`RESOURCES_ID`,`PARENT_RES_ID`),
  KEY `PARENT_RES_ID` (`PARENT_RES_ID`),
  CONSTRAINT `TBL_AA_RES2RES_IBFK_1` FOREIGN KEY (`RESOURCES_ID`) REFERENCES `TBL_AA_RESOURCES` (`RESOURCES_ID`),
  CONSTRAINT `TBL_AA_RES2RES_IBFK_2` FOREIGN KEY (`PARENT_RES_ID`) REFERENCES `TBL_AA_RESOURCES` (`RESOURCES_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_RESOURCES`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_RESOURCES`;
CREATE TABLE `TBL_AA_RESOURCES` (
  `RESOURCES_ID` VARCHAR(32) NOT NULL,
  `APP_ID` VARCHAR(32) NOT NULL,
  `RESOURCE_NAME` VARCHAR(100) NOT NULL,
  `RESOURCE_DESC` VARCHAR(255) DEFAULT NULL,
  `RESOURCE_PATH` VARCHAR(100) DEFAULT NULL,
  `RESOURCE_TYPE` VARCHAR(50) NOT NULL,
  `EFFECTIVE_FROM` DATE DEFAULT NULL,
  `EFFECTIVE_TO` DATE DEFAULT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`RESOURCES_ID`),
  KEY `APP_ID` (`APP_ID`),
  CONSTRAINT `TBL_AA_RESOURCES_IBFK_1` FOREIGN KEY (`APP_ID`) REFERENCES `TBL_AA_APP` (`APP_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_SUBJECT`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_SUBJECT`;
CREATE TABLE `TBL_AA_SUBJECT` (
  `SUBJECT_ID` VARCHAR(32) NOT NULL,
  `FIRST_NAME` VARCHAR(100) NOT NULL,
  `LAST_NAME` VARCHAR(100) DEFAULT NULL,
  `EMAIL` VARCHAR(200) DEFAULT NULL,
  `PHONE_NUM` VARCHAR(20) DEFAULT NULL,
  `EFFECTIVE_DT` DATE DEFAULT NULL,
  `EXPIRY_DT` DATE DEFAULT NULL,
  `STATUS` VARCHAR(1) NOT NULL,
  `LOGICAL_DEL` INT(11) DEFAULT NULL,
  `LAST_LOGIN_DT` DATETIME DEFAULT NULL,
  `LAST_LOGIN_IP` VARCHAR(40) DEFAULT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`SUBJECT_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_SUBJECT_LOGIN`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_SUBJECT_LOGIN`;
CREATE TABLE `TBL_AA_SUBJECT_LOGIN` (
  `SUBJECT_ID` VARCHAR(32) NOT NULL,
  `LOGIN_MECHANISM` VARCHAR(32) NOT NULL,
  `LOGIN_NAME` VARCHAR(32) NOT NULL,
  `PASSWORD` VARCHAR(2000) DEFAULT NULL,
  `RECALL_QUESTION` VARCHAR(100) DEFAULT NULL,
  `RECALL_ANS` VARCHAR(500) DEFAULT NULL,
  `PASSWORD_CHANGED_DATE` DATETIME DEFAULT NULL,
  `ATTEMPTS_MADE` INT(11) DEFAULT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`SUBJECT_ID`,`LOGIN_MECHANISM`),
  CONSTRAINT `TBL_AA_SUBJECT_LOGIN_IBFK_1` FOREIGN KEY (`SUBJECT_ID`) REFERENCES `TBL_AA_SUBJECT` (`SUBJECT_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;


-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_SUBJECT2GROUP`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_SUBJECT2GROUP`;
CREATE TABLE `TBL_AA_SUBJECT2GROUP` (
  `SUBJECT_ID` VARCHAR(32) NOT NULL,
  `GROUP_ID` VARCHAR(32) NOT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`SUBJECT_ID`,`GROUP_ID`),
  KEY `GROUP_ID` (`GROUP_ID`),
  CONSTRAINT `TBL_AA_SUBJECT2GROUP_IBFK_1` FOREIGN KEY (`SUBJECT_ID`) REFERENCES `TBL_AA_SUBJECT` (`SUBJECT_ID`),
  CONSTRAINT `TBL_AA_SUBJECT2GROUP_IBFK_2` FOREIGN KEY (`GROUP_ID`) REFERENCES `TBL_AA_GROUP` (`GROUP_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_SUBJECT2RES`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_SUBJECT2RES`;
CREATE TABLE `TBL_AA_SUBJECT2RES` (
  `SUBJECT_ID` VARCHAR(32) NOT NULL,
  `RESOURCES_ID` VARCHAR(32) NOT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `CREATED_BY` VARCHAR(32) DEFAULT NULL,
  `UPDATED_DT` DATETIME DEFAULT NULL,
  `UPDATED_BY` VARCHAR(32) DEFAULT NULL,
  `VERSION` INT(11) NOT NULL,
  PRIMARY KEY (`SUBJECT_ID`,`RESOURCES_ID`),
  KEY `RESOURCES_ID` (`RESOURCES_ID`),
  CONSTRAINT `TBL_AA_SUBJECT2RES_IBFK_1` FOREIGN KEY (`SUBJECT_ID`) REFERENCES `TBL_AA_SUBJECT` (`SUBJECT_ID`),
  CONSTRAINT `TBL_AA_SUBJECT2RES_IBFK_2` FOREIGN KEY (`RESOURCES_ID`) REFERENCES `TBL_AA_RESOURCES` (`RESOURCES_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;


-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_VIOLATION_LOG`
-- ----------------------------
DROP TABLE IF EXISTS `TBL_AA_VIOLATION_LOG`;
CREATE TABLE `TBL_AA_VIOLATION_LOG` (
  `LOG_ID` VARCHAR(32) NOT NULL,
  `LOGIN_ID` VARCHAR(32) DEFAULT NULL,
  `APP_CODE` VARCHAR(32) NOT NULL,
  `LOGIN_TYPE` VARCHAR(20) DEFAULT NULL,
  `ACCESS_RES_NAME` VARCHAR(100) DEFAULT NULL,
  `ACCESS_RES` VARCHAR(100) DEFAULT NULL,
  `ACCESS_RES_TYPE` VARCHAR(20) DEFAULT NULL,
  `CREATED_DT` DATETIME DEFAULT NULL,
  `LOGIN_IP` VARCHAR(40) DEFAULT NULL,
  PRIMARY KEY (`LOG_ID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- ----------------------------
-- Records of TBL_AA_VIOLATION_LOG
-- ----------------------------

-- ----------------------------
-- TABLE STRUCTURE FOR `TBL_AA_SUBJECT_PWD_HISTORY`
-- ----------------------------
CREATE TABLE TBL_AA_SUBJECT_PWD_HISTORY (
	OLD_PASSWORD_ID  VARCHAR(32) NOT NULL,
	SUBJECT_ID       VARCHAR(32) NOT NULL,
    LOGIN_NAME       VARCHAR(32) NOT NULL,
	OLD_PASSWORD     VARCHAR(2000) NOT NULL,
	CREATED_DT       DATETIME,
	PRIMARY KEY (OLD_PASSWORD_ID)
);

--
-- Table structure for table `t_user_token_info`
--

DROP TABLE IF EXISTS `TBL_AA_USER_TOKEN_INFO`;
CREATE TABLE `TBL_AA_USER_TOKEN_INFO` (
  `ID` varchar(32) NOT NULL,
  `CONTENT` varchar(1000) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `EXPIRY_DATE` datetime NOT NULL,
  `LOGIN_ID` varchar(255) NOT NULL,
  `TOKEN_NAME` varchar(255) DEFAULT NULL,
  `TOKEN_TYPE` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `TBL_AA_USER_TOKEN_INFO_AUD`;
CREATE TABLE TBL_AA_USER_TOKEN_INFO_AUD (
	ID VARCHAR(255) NOT NULL,
	REV INTEGER NOT NULL,
	REVTYPE TINYINT,
	CONTENT VARCHAR(1000),
	CREATED_DATE DATETIME,
	EXPIRY_DATE DATETIME,
	LOGIN_ID VARCHAR(255),
	TOKEN_NAME VARCHAR(255),
	TOKEN_TYPE INTEGER,
	PRIMARY KEY (ID, REV)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS `TBL_AA_SUBJECT_AUD`;
CREATE TABLE TBL_AA_SUBJECT_AUD (
    SUBJECT_ID varchar(255) not null,
	REV integer not null,
	REVTYPE tinyint,
	FIRST_NAME varchar(255),
	LAST_NAME varchar(255),
	EMAIL varchar(255),
	EFFECTIVE_DT datetime,
	EXPIRY_DT datetime,
	LAST_LOGIN_DT datetime,
	LAST_LOGIN_IP varchar(255),
	LOGICAL_DEL integer,
	PHONE_NUM varchar(255),
	STATUS varchar(255),
	CREATED_BY varchar(255),
	CREATED_DT datetime,
	UPDATED_BY varchar(255),
	UPDATED_DT datetime,
	primary key (SUBJECT_ID, REV)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `TBL_AA_SUBJECT_LOGIN_AUD`;
CREATE TABLE TBL_AA_SUBJECT_LOGIN_AUD (
	SUBJECT_ID varchar(255) not null,
	REV integer not null,
	REVTYPE tinyint,
	LOGIN_MECHANISM varchar(255) not null,
	ATTEMPTS_MADE integer,
	CREATED_BY varchar(255),
	CREATED_DT datetime,
	LOGIN_NAME varchar(255),
	PASSWORD_CHANGED_DATE datetime,
	RECALL_ANS varchar(255),
	RECALL_QUESTION varchar(255),
	UPDATED_BY varchar(255),
	UPDATED_DT datetime,
	primary key (LOGIN_MECHANISM, SUBJECT_ID, REV)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;