ALTER TABLE "shops" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "shops" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shops" ADD COLUMN "bank_code" text;--> statement-breakpoint
ALTER TABLE "shops" ADD COLUMN "bank_account" text;--> statement-breakpoint
ALTER TABLE "shops" ADD COLUMN "bank_id" text;--> statement-breakpoint
ALTER TABLE "shops" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "shops" DROP COLUMN "google_maps";--> statement-breakpoint
ALTER TABLE "shops" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "shops" DROP COLUMN "website";