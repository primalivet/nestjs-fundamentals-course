/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Flavor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Flavor_name_key" ON "Flavor"("name");
