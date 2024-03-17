/*
  Warnings:

  - You are about to drop the column `price` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ammount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantName` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pending` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "price",
DROP COLUMN "title",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "accountOwner" TEXT,
ADD COLUMN     "ammount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "authorizedDate" TEXT,
ADD COLUMN     "authorizedDateTime" TEXT,
ADD COLUMN     "category" TEXT[],
ADD COLUMN     "category_id" TEXT,
ADD COLUMN     "checkNumber" TEXT,
ADD COLUMN     "dateTime" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isoCurrencyCode" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "merchantName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentChannel" TEXT,
ADD COLUMN     "pending" BOOLEAN NOT NULL,
ADD COLUMN     "pendingTransactionId" TEXT,
ADD COLUMN     "transactionId" TEXT NOT NULL,
ADD COLUMN     "transactionType" TEXT,
ADD COLUMN     "unofficialCurrencyCode" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "Transaction"("transactionId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
