ALTER TABLE "order_items" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "status" text DEFAULT 'pending';