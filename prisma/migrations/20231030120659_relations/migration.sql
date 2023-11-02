/*
  Warnings:

  - You are about to drop the column `coffeeId` on the `Flavor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flavor" DROP CONSTRAINT "Flavor_coffeeId_fkey";

-- AlterTable
ALTER TABLE "Flavor" DROP COLUMN "coffeeId";

-- CreateTable
CREATE TABLE "_CoffeeToFlavor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeToFlavor_AB_unique" ON "_CoffeeToFlavor"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeToFlavor_B_index" ON "_CoffeeToFlavor"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_A_fkey" FOREIGN KEY ("A") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_B_fkey" FOREIGN KEY ("B") REFERENCES "Flavor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
