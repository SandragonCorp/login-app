ALTER TABLE `loginapp`.`Users` 
CHANGE COLUMN `role` `role` VARCHAR(255) NULL DEFAULT NULL AFTER `enabled`;
