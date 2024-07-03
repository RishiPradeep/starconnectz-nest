-- CreateTable
CREATE TABLE `celeb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `socials` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `bio` VARCHAR(191) NOT NULL DEFAULT 'Hey there! Im using Starconnectz',
    `profile_pic` VARCHAR(191) NOT NULL DEFAULT 'https://gravatar.com/avatar/HASH',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `celeb_username_key`(`username`),
    UNIQUE INDEX `celeb_email_key`(`email`),
    UNIQUE INDEX `celeb_id_username_key`(`id`, `username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `fan_username_key`(`username`),
    UNIQUE INDEX `fan_email_key`(`email`),
    UNIQUE INDEX `fan_id_username_key`(`id`, `username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `celebid` INTEGER NOT NULL,
    `celeb_username` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imagename` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fanid` INTEGER NOT NULL,
    `celebid` INTEGER NOT NULL,
    `serviceid` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `fan_username` VARCHAR(191) NOT NULL,
    `celeb_username` VARCHAR(191) NOT NULL,
    `service_details` VARCHAR(191) NOT NULL,
    `audio_name` VARCHAR(191) NOT NULL DEFAULT '',
    `video_name` VARCHAR(191) NOT NULL DEFAULT '',
    `reject_reason` VARCHAR(191) NOT NULL DEFAULT '',
    `occassion` VARCHAR(191) NOT NULL DEFAULT 'occassion',
    `wishes_to` VARCHAR(191) NOT NULL DEFAULT 'wishes_to',
    `additional_info` VARCHAR(191) NOT NULL DEFAULT 'additional_info',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `celebid` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `time_needed` INTEGER NOT NULL,
    `celeb_username` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `service_id_description_key`(`id`, `description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video` (
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

-- CreateTable
CREATE TABLE `_User_follows` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_User_follows_AB_unique`(`A`, `B`),
    INDEX `_User_follows_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_celebid_celeb_username_fkey` FOREIGN KEY (`celebid`, `celeb_username`) REFERENCES `celeb`(`id`, `username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_celebid_celeb_username_fkey` FOREIGN KEY (`celebid`, `celeb_username`) REFERENCES `celeb`(`id`, `username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_fanid_fan_username_fkey` FOREIGN KEY (`fanid`, `fan_username`) REFERENCES `fan`(`id`, `username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_serviceid_service_details_fkey` FOREIGN KEY (`serviceid`, `service_details`) REFERENCES `service`(`id`, `description`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_celebid_celeb_username_fkey` FOREIGN KEY (`celebid`, `celeb_username`) REFERENCES `celeb`(`id`, `username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_User_follows` ADD CONSTRAINT `_User_follows_A_fkey` FOREIGN KEY (`A`) REFERENCES `celeb`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_User_follows` ADD CONSTRAINT `_User_follows_B_fkey` FOREIGN KEY (`B`) REFERENCES `fan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
