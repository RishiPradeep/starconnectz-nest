-- AlterTable
ALTER TABLE `order` ADD COLUMN `audio_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `reject_reason` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `video_name` VARCHAR(191) NOT NULL DEFAULT '';
