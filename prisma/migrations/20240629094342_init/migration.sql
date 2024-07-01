-- AlterTable
ALTER TABLE `video` ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT 'Video Description';

-- CreateTable
CREATE TABLE `audio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `celebid` INTEGER NOT NULL,
    `celeb_username` VARCHAR(191) NOT NULL,
    `fanid` INTEGER NOT NULL,
    `fan_username` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT 'Video Description',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
