-- CreateTable
CREATE TABLE "Slack_Webhooks" (
    "id" BIGSERIAL NOT NULL,
    "channel" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slack_Webhooks_pkey" PRIMARY KEY ("id")
);
