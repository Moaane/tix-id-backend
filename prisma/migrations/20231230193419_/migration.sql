/*
  Warnings:

  - You are about to drop the column `langitude` on the `Mall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mall" DROP COLUMN "langitude",
ADD COLUMN     "latitude" TEXT;
