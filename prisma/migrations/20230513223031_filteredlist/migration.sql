-- AlterTable
ALTER TABLE "UserPreferences" ADD COLUMN     "filterOutList" TEXT[] DEFAULT ARRAY[]::TEXT[];
