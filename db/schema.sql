DROP DATABASE IF EXISTS winston_db;
CREATE DATABASE winston_db;
USE winston_db;
CREATE TABLE `department` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);
CREATE TABLE `role` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL UNIQUE,
    `salary` DECIMAL NOT NULL,
    `department_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE CASCADE
);
CREATE TABLE `employee` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INT,
    `manager_id` INT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`manager_id`) REFERENCES employee(`id`) ON DELETE
    set null
);