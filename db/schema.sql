DROP DATABASE IF EXISTS `jingle_all_the_way_db`;
CREATE DATABASE `jingle_all_the_way_db`;

USE jingle_all_the_way_db;

CREATE TABLE `list` (
  `listid` INT(50) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`listid`)
);

INSERT INTO `list` (`listid`, `name`)
VALUES (1, 'test');


CREATE TABLE `user` (
  `id` INT(50) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `user` (`id`, `username`, `password`, `email`)
VALUES (1, 'test', 'test', 'test@test.com');




CREATE TABLE `gift_table` (
  `listid` INT(50) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `gift` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`listid`)
);

INSERT INTO `gift_table` (`listid`, `name`, `gift`)
VALUES (1, 'test', 'test');
