/*
  Warnings:

  - You are about to drop the column `defaultSplitting` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultView` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultWeekStart` on the `UserPreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "defaultSplitting",
DROP COLUMN "defaultView",
DROP COLUMN "defaultWeekStart",
ADD COLUMN     "defaultSplittingUserId" TEXT;
