/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Gallery` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Gallery_isPublished_displayOrder_idx";

-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "isPublished";

-- CreateIndex
CREATE INDEX "Gallery_displayOrder_idx" ON "Gallery"("displayOrder");
