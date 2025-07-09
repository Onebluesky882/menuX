CREATE TABLE "menu_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"menu_id" uuid,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menus" DROP CONSTRAINT "menus_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "menus" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "menu_id" uuid;--> statement-breakpoint
ALTER TABLE "menu_options" ADD CONSTRAINT "menu_options_menu_id_menus_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_menu_id_menus_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "image_name";--> statement-breakpoint
ALTER TABLE "menus" DROP COLUMN "image_id";--> statement-breakpoint
ALTER TABLE "menus" ADD CONSTRAINT "menus_id_unique" UNIQUE("id");