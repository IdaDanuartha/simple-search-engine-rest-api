-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL DEFAULT '',
    `short_description` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `thumbnail_img` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
