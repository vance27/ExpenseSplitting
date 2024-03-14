/*
  Warnings:

  - A unique constraint covering the columns `[institutionId]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `institutionId` to the `Bank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bank" ADD COLUMN     "institutionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bank_institutionId_key" ON "Bank"("institutionId");
