CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `Account_provider_providerAccountId_key` UNIQUE(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `passwordResetToken` (
	`id` varchar(255) NOT NULL,
	`email` varchar(455) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `passwordResetToken_id` PRIMARY KEY(`id`),
	CONSTRAINT `passwordResetToken_token_unique` UNIQUE(`token`),
	CONSTRAINT `PasswordResetToken_token_key` UNIQUE(`token`),
	CONSTRAINT `PasswordResetToken_email_token_key` UNIQUE(`email`,`token`)
);
--> statement-breakpoint
CREATE TABLE `twoFactorConfirmation` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255),
	CONSTRAINT `twoFactorConfirmation_id` PRIMARY KEY(`id`),
	CONSTRAINT `TwoFactorConfirmation_userId_key` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `twoFactorToken` (
	`id` varchar(255) NOT NULL,
	`email` varchar(455) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `twoFactorToken_id` PRIMARY KEY(`id`),
	CONSTRAINT `twoFactorToken_token_unique` UNIQUE(`token`),
	CONSTRAINT `TwoFactorToken_token_key` UNIQUE(`token`),
	CONSTRAINT `TwoFactorToken_email_token_key` UNIQUE(`email`,`token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` text,
	`email` varchar(455),
	`emailVerified` timestamp,
	`image` text,
	`password` text,
	`role` varchar(10) NOT NULL DEFAULT 'USER',
	`isTwoFactorEnabled` boolean NOT NULL DEFAULT false,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `User_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`id` varchar(255) NOT NULL,
	`email` varchar(455) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_id` PRIMARY KEY(`id`),
	CONSTRAINT `verificationToken_token_unique` UNIQUE(`token`),
	CONSTRAINT `VerificationToken_token_key` UNIQUE(`token`),
	CONSTRAINT `VerificationToken_email_token_key` UNIQUE(`email`,`token`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `twoFactorConfirmation` ADD CONSTRAINT `twoFactorConfirmation_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;