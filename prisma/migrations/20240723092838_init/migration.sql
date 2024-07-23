/*
  Warnings:

  - Added the required column `country` to the `fan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fan` ADD COLUMN `country` VARCHAR(191) NOT NULL;
