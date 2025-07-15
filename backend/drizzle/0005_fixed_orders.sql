ALTER TABLE "images" DROP CONSTRAINT "images_menu_id_menus_id_fk";
--> statement-breakpoint
ALTER TABLE "menus" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "create_by_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_menu_id_menus_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE no action ON UPDATE no action;