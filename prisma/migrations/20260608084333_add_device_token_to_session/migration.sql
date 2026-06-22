/*
  Warnings:

  - A unique constraint covering the columns `[deviceToken]` on the table `session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "deviceToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "session_deviceToken_key" ON "session"("deviceToken");
