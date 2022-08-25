/*
  Warnings:

  - You are about to drop the `Slack_Webhooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Slack_Webhooks";

-- CreateTable
CREATE TABLE "SlackWebhooks" (
    "id" BIGSERIAL NOT NULL,
    "channel" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SlackWebhooks_pkey" PRIMARY KEY ("id")
);
