

/*
  Warnings:

  - You are about to drop the column `thumnail` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "thumnail",
ADD COLUMN     "thumbnail" TEXT;