CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`type` varchar(100) NOT NULL,
	`accredited` varchar(50) NOT NULL,
	`message` text NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Role` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `Role_id` PRIMARY KEY(`id`),
	CONSTRAINT `Role_name_key` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`email` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`roleId` int NOT NULL,
	`accreditationStatus` varchar(191) NOT NULL DEFAULT 'individual',
	`twoFactorEnabled` tinyint NOT NULL DEFAULT 1,
	`otpCode` varchar(191),
	`otpExpiry` datetime(3),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_Role_id_fk` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `User_roleId_fkey` ON `User` (`roleId`);