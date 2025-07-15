ALTER TABLE "menus" ALTER COLUMN "price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_options" ADD COLUMN "label" text NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_options" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "menu_options" DROP COLUMN "quantity";