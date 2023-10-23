-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NULL,
    `password` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `firstname` VARCHAR(45) NULL,
    `lastname` VARCHAR(45) NULL,
    `enabled` TINYINT NULL,
    `roles` VARCHAR(255) NULL,
    `createddatetime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `lastloggedindatetime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username_UNIQUE`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
