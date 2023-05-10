/*
  Warnings:

  - You are about to drop the column `defaultCurrency` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultDateFormat` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultLanguage` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultSort` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultSplittingUserId` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTheme` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTimeFormat` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTimezone` on the `UserPreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "defaultCurrency",
DROP COLUMN "defaultDateFormat",
DROP COLUMN "defaultLanguage",
DROP COLUMN "defaultSort",
DROP COLUMN "defaultSplittingUserId",
DROP COLUMN "defaultTheme",
DROP COLUMN "defaultTimeFormat",
DROP COLUMN "defaultTimezone",
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "dateFormat" TEXT NOT NULL DEFAULT 'MM/dd/yyyy',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "preferredSort" TEXT NOT NULL DEFAULT 'date',
ADD COLUMN     "splittingUserId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'dark',
ADD COLUMN     "timeFormat" TEXT NOT NULL DEFAULT 'hh:mm a',
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'America/Chicago';
