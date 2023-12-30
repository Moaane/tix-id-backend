/*
  Warnings:

  - You are about to drop the column `date` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Showdate` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Showtime` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showStatus` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Studio" DROP CONSTRAINT "Studio_mallId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "date",
DROP COLUMN "show",
DROP COLUMN "time",
ADD COLUMN     "Showdate" DATE NOT NULL,
ADD COLUMN     "Showtime" TIME NOT NULL,
ADD COLUMN     "showStatus" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Studio";

-- CreateTable
CREATE TABLE "Theatre" (
    "id" SERIAL NOT NULL,
    "mallId" INTEGER,

    CONSTRAINT "Theatre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "row" TEXT NOT NULL,
    "column" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "theatreId" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seat_theatreId_key" ON "Seat"("theatreId");

-- AddForeignKey
ALTER TABLE "Theatre" ADD CONSTRAINT "Theatre_mallId_fkey" FOREIGN KEY ("mallId") REFERENCES "Mall"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "Theatre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
