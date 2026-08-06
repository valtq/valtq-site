-- AlterTable
ALTER TABLE "notification_logs" ADD COLUMN "contact_id" TEXT,
ALTER COLUMN "lead_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "contact_inquiries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "preferred_channel" TEXT,
    "service_area" TEXT,
    "product_stage" TEXT,
    "product_url" TEXT,
    "timing" TEXT,
    "budget" TEXT,
    "summary" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_inquiries_email_idx" ON "contact_inquiries"("email");

-- CreateIndex
CREATE INDEX "contact_inquiries_status_idx" ON "contact_inquiries"("status");

-- CreateIndex
CREATE INDEX "notification_logs_contact_id_idx" ON "notification_logs"("contact_id");

-- AddForeignKey
ALTER TABLE "notification_logs" ADD CONSTRAINT "notification_logs_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact_inquiries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
