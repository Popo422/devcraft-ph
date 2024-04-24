CREATE TABLE IF NOT EXISTS "dc-admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dc-auditHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"itemId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dc-employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"managerId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dc-item" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(10) NOT NULL,
	"name" varchar(256) NOT NULL,
	"quantity" integer NOT NULL,
	"date" date,
	"description" varchar(256),
	"imagePath" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dc-manager" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dc-user" (
	"id" serial PRIMARY KEY NOT NULL,
	"employeeId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(256) NOT NULL,
	"lastName" varchar(256),
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL
);
--> statement-breakpoint
DROP TABLE "admin";--> statement-breakpoint
DROP TABLE "auditHistory";--> statement-breakpoint
DROP TABLE "employee";--> statement-breakpoint
DROP TABLE "item";--> statement-breakpoint
DROP TABLE "manager";--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dc-admin" ADD CONSTRAINT "dc-admin_userId_dc-user_id_fk" FOREIGN KEY ("userId") REFERENCES "dc-user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dc-employee" ADD CONSTRAINT "dc-employee_userId_dc-user_id_fk" FOREIGN KEY ("userId") REFERENCES "dc-user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dc-employee" ADD CONSTRAINT "dc-employee_managerId_dc-manager_id_fk" FOREIGN KEY ("managerId") REFERENCES "dc-manager"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dc-manager" ADD CONSTRAINT "dc-manager_userId_dc-manager_id_fk" FOREIGN KEY ("userId") REFERENCES "dc-manager"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
