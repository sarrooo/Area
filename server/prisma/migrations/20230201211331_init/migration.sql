/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `reactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `triggers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reactions_name_key" ON "reactions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "triggers_name_key" ON "triggers"("name");
