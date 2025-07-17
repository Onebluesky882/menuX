ALTER TABLE "orders" DROP CONSTRAINT "orders_menu_id_menus_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "menu_id";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "price_each";