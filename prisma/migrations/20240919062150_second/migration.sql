/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `articles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `articles` ALTER COLUMN `slug` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `articles_title_key` ON `articles`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `articles_slug_key` ON `articles`(`slug`);
