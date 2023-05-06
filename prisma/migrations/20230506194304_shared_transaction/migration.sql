/*
  Warnings:

  - You are about to drop the column `shared` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sharedPercentage` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "shared",
DROP COLUMN "sharedPercentage",
ADD COLUMN     "sharedId" INTEGER;

-- CreateTable
CREATE TABLE "SharedTransaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" INTEGER NOT NULL,
    "sharedPercentage" INTEGER NOT NULL,

    CONSTRAINT "SharedTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedPercentage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sharedPercentage" INTEGER NOT NULL,
    "sharedTransactionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SharedPercentage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedTransaction_transactionId_key" ON "SharedTransaction"("transactionId");

-- AddForeignKey
ALTER TABLE "SharedTransaction" ADD CONSTRAINT "SharedTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedPercentage" ADD CONSTRAINT "SharedPercentage_sharedTransactionId_fkey" FOREIGN KEY ("sharedTransactionId") REFERENCES "SharedTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedPercentage" ADD CONSTRAINT "SharedPercentage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
