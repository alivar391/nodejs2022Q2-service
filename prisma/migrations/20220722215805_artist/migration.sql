-- DropIndex
DROP INDEX "Artist_name_key";

-- DropIndex
DROP INDEX "User_login_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "version" SET DEFAULT 1;
