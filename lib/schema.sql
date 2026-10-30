CREATE TABLE `weekly_crawl_schedule` (
	`origin` text PRIMARY KEY NOT NULL,
	`next_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weekly_leases` (
	`key` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`owner` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weekly_state` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updated_at` integer NOT NULL
);
