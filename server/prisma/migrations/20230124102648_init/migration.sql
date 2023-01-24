/*
  Warnings:

  - You are about to drop the column `triggerInputId` on the `trirea_trigger_inputs` table. All the data in the column will be lost.
  - Added the required column `triggerInputTypeId` to the `trirea_trigger_inputs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trirea_trigger_inputs" DROP CONSTRAINT "trirea_trigger_inputs_triggerInputId_fkey";

-- AlterTable
ALTER TABLE "trirea_trigger_inputs" DROP COLUMN "triggerInputId",
ADD COLUMN     "triggerInputTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "trirea_trigger_inputs" ADD CONSTRAINT "trirea_trigger_inputs_triggerInputTypeId_fkey" FOREIGN KEY ("triggerInputTypeId") REFERENCES "trigger_inputs_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
