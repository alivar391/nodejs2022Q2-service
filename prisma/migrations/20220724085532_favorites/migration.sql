/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Album` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoritesId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoritesId",
ADD COLUMN     "favoriteId" TEXT;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
