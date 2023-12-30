/*
  Warnings:

  - You are about to drop the column `latitude` on the `Mall` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Mall` table. All the data in the column will be lost.
  - You are about to drop the column `Showdate` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `Showtime` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `mallId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `showStatus` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `studioId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `ticket` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `address` to the `Mall` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theatreMovieId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_mallId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_theatreId_fkey";

-- AlterTable
ALTER TABLE "Mall" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "location" TEXT[];

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "Showdate",
DROP COLUMN "Showtime",
DROP COLUMN "mallId",
DROP COLUMN "showStatus",
DROP COLUMN "studioId",
DROP COLUMN "ticket",
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "movieId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "seatId" INTEGER NOT NULL,
ADD COLUMN     "theatreMovieId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "theatreMovieId" INTEGER,
ALTER COLUMN "theatreId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "TheatreMovie" (
    "id" SERIAL NOT NULL,
    "theatreId" INTEGER,
    "movieId" INTEGER,
    "showDate" DATE NOT NULL,
    "showTime" TIME NOT NULL,

    CONSTRAINT "TheatreMovie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_theatreMovieId_fkey" FOREIGN KEY ("theatreMovieId") REFERENCES "TheatreMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "Theatre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheatreMovie" ADD CONSTRAINT "TheatreMovie_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "Theatre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheatreMovie" ADD CONSTRAINT "TheatreMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_theatreMovieId_fkey" FOREIGN KEY ("theatreMovieId") REFERENCES "TheatreMovie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
