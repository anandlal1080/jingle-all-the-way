-- create schema and seeds for data to be held in a relational database

DROP DATABASE IF EXISTS `jingle_all_the_way_db`;

CREATE DATABASE `jingle_all_the_way_db`;

USE jingle_all_the_way_db;

CREATE TABLE `list` (
  `id` INT(50) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL REFERENCES user.id,
  PRIMARY KEY (`id`)
);


CREATE TABLE `user` (
  `id` INT(50) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gift_table` (
  `id` INT(50) NOT NULL AUTO_INCREMENT,
  `list_id` INT(50) NOT NULL REFERENCES list.id,
  `gift_name` VARCHAR(50) NOT NULL,
  `gift_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
  
);

