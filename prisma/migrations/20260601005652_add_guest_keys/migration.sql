-- CreateTable
CREATE TABLE "guest_keys" (
    "day" DATE NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guest_keys_pkey" PRIMARY KEY ("day")
);
