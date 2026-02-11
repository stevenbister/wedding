CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`page` text,
	`user_agent` text,
	`referrer` text,
	`meta` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `guests` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`phone_number` text NOT NULL,
	`rsvp` integer,
	`message` text,
	`partner_id` text,
	`dietary_requirements` text,
	FOREIGN KEY (`partner_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action
);
