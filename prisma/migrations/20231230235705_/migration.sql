-- AlterTable
ALTER TABLE "TheatreMovie" ADD COLUMN     "mallId" INTEGER;

-- AddForeignKey
ALTER TABLE "TheatreMovie" ADD CONSTRAINT "TheatreMovie_mallId_fkey" FOREIGN KEY ("mallId") REFERENCES "Mall"("id") ON DELETE SET NULL ON UPDATE CASCADE;
