ALTER TABLE "invoice" ALTER COLUMN "currency" SET DEFAULT 'EUR';--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "free_images_remaining" integer DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "free_images_used" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
-- Set existing workspaces to 0 free images (only new signups get trial)
UPDATE "workspace" SET "free_images_remaining" = 0;