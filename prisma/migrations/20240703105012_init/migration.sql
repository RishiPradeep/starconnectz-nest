/*
  Warnings:

  - A unique constraint covering the columns `[call_id]` on the table `meeting` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `meeting` ALTER COLUMN `call_id` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `meeting_call_id_key` ON `meeting`(`call_id`);
