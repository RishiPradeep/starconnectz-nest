-- CreateTable
CREATE TABLE `meeting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `celeb_username` VARCHAR(191) NOT NULL,
    `celebid` INTEGER NOT NULL,
    `celeb_token` VARCHAR(191) NOT NULL DEFAULT '',
    `call_id` VARCHAR(191) NOT NULL DEFAULT '',
    `fan_username` VARCHAR(191) NOT NULL,
    `fanid` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
