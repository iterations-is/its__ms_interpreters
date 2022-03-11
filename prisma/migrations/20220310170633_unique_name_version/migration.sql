/*
  Warnings:

  - A unique constraint covering the columns `[name,version]` on the table `Interpret` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interpret_name_version_key" ON "Interpret"("name", "version");
