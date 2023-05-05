-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "expenseSplittingWindowId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPreferencesId" INTEGER;

-- CreateTable
CREATE TABLE "ExpenseSplittingWindow" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Expense Splitting Window',
    "notes" TEXT NOT NULL,
    "inactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExpenseSplittingWindow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultSplitting" TEXT NOT NULL DEFAULT 'equal',
    "defaultCurrency" TEXT NOT NULL DEFAULT 'USD',
    "defaultLanguage" TEXT NOT NULL DEFAULT 'en',
    "defaultTimezone" TEXT NOT NULL DEFAULT 'America/Chicago',
    "defaultDateFormat" TEXT NOT NULL DEFAULT 'MM/dd/yyyy',
    "defaultTimeFormat" TEXT NOT NULL DEFAULT 'hh:mm a',
    "defaultWeekStart" TEXT NOT NULL DEFAULT 'monday',
    "defaultTheme" TEXT NOT NULL DEFAULT 'dark',
    "defaultView" TEXT NOT NULL DEFAULT 'list',
    "defaultSort" TEXT NOT NULL DEFAULT 'date',

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_authorizedUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExpenseSplittingWindowToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_authorizedUsers_AB_unique" ON "_authorizedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_authorizedUsers_B_index" ON "_authorizedUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpenseSplittingWindowToUser_AB_unique" ON "_ExpenseSplittingWindowToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpenseSplittingWindowToUser_B_index" ON "_ExpenseSplittingWindowToUser"("B");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_expenseSplittingWindowId_fkey" FOREIGN KEY ("expenseSplittingWindowId") REFERENCES "ExpenseSplittingWindow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_authorizedUsers" ADD CONSTRAINT "_authorizedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_authorizedUsers" ADD CONSTRAINT "_authorizedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseSplittingWindowToUser" ADD CONSTRAINT "_ExpenseSplittingWindowToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExpenseSplittingWindow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseSplittingWindowToUser" ADD CONSTRAINT "_ExpenseSplittingWindowToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
