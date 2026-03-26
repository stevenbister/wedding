PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_guests` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`phone_number` text,
	`rsvp` integer,
	`message` text,
	`partner_id` text,
	`dietary_requirements` text,
	`can_add_plus_one` integer DEFAULT false NOT NULL,
	`plus_one_of` text,
	FOREIGN KEY (`partner_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`plus_one_of`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_guests`("id", "first_name", "last_name", "phone_number", "rsvp", "message", "partner_id", "dietary_requirements", "can_add_plus_one", "plus_one_of") SELECT "id", "first_name", "last_name", "phone_number", "rsvp", "message", "partner_id", "dietary_requirements", "can_add_plus_one", "plus_one_of" FROM `guests`;--> statement-breakpoint
DROP TABLE `guests`;--> statement-breakpoint
ALTER TABLE `__new_guests` RENAME TO `guests`;--> statement-breakpoint
PRAGMA foreign_keys=ON;