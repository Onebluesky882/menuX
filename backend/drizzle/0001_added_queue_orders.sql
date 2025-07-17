ALTER TABLE "orders" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "queue_number" text;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "order_type";