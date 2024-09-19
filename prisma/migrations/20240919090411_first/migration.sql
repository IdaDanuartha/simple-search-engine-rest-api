-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `short_description` TEXT NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `thumbnail_img` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `published_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `articles_title_key`(`title`),
    UNIQUE INDEX `articles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
