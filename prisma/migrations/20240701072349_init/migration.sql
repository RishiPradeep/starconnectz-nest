-- AlterTable
ALTER TABLE `order` ADD COLUMN `additional_info` VARCHAR(191) NOT NULL DEFAULT 'additional_info',
    ADD COLUMN `occassion` VARCHAR(191) NOT NULL DEFAULT 'occassion',
    ADD COLUMN `wishes_to` VARCHAR(191) NOT NULL DEFAULT 'wishes_to';
