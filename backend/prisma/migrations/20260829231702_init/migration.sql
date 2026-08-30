/*
  Warnings:

  - You are about to drop the column `profileImage` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "profileImage",
ADD COLUMN     "profileImageUrl" TEXT;
