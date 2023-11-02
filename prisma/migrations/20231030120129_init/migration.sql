-- CreateTable
CREATE TABLE "Coffee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flavor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coffeeId" INTEGER,

    CONSTRAINT "Flavor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flavor" ADD CONSTRAINT "Flavor_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
