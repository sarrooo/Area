/*
  Warnings:

  - You are about to drop the column `linkedToId` on the `trirea_reaction_inputs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trirea_reaction_inputs" DROP COLUMN "linkedToId",
ADD COLUMN     "triggerOutputTypeId" INTEGER;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_triggerOutputTypeId_fkey" FOREIGN KEY ("triggerOutputTypeId") REFERENCES "trigger_outputs_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
