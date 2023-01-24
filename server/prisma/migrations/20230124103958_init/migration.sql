/*
  Warnings:

  - You are about to drop the column `triggerOutputId` on the `trirea_reaction_inputs` table. All the data in the column will be lost.
  - Added the required column `triggerOutputTypeId` to the `trirea_reaction_inputs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trirea_reaction_inputs" DROP CONSTRAINT "trirea_reaction_inputs_triggerOutputId_fkey";

-- AlterTable
ALTER TABLE "trirea_reaction_inputs" DROP COLUMN "triggerOutputId",
ADD COLUMN     "triggerOutputTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_triggerOutputTypeId_fkey" FOREIGN KEY ("triggerOutputTypeId") REFERENCES "trigger_outputs_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
