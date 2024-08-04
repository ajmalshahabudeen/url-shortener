-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY DEFAULT 0 NOT NULL,
	"user_name" varchar(40),
	"user_email" varchar(100),
	"user_phone" varchar(20),
	"user_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "url" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"url_key" varchar(10) NOT NULL,
	"url_value" varchar(255) NOT NULL,
	"date" varchar(30)
);

*/