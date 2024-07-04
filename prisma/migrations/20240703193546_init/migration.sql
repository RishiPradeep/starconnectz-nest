/*
  Warnings:

  - You are about to drop the `meeting` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `call_id` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `celeb_token` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `meeting`;
