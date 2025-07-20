CREATE TABLE "slip-verify" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slip_code" text NOT NULL,
	"orderId" uuid,
	"ref" text NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"sender_bank" text NOT NULL,
	"sender_name" text NOT NULL,
	"sender_id" text NOT NULL,
	"receiver_bank" text NOT NULL,
	"receiver_name" text NOT NULL,
	"receiver_id" text NOT NULL,
	"amount" numeric NOT NULL
);
--> statement-breakpoint
ALTER TABLE "slip-verify" ADD CONSTRAINT "slip-verify_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;