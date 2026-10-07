CREATE TABLE `song_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`song` text NOT NULL,
	`requested_by` text NOT NULL,
	FOREIGN KEY (`requested_by`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `song_requests_requested_by_unique` ON `song_requests` (`requested_by`);