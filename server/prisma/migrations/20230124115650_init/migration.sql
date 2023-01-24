/*
  Warnings:

  - You are about to drop the column `triggerOutputTypeId` on the `trirea_reaction_inputs` table. All the data in the column will be lost.
  - Added the required column `reactionInputTypeId` to the `trirea_reaction_inputs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trirea_reaction_inputs" DROP CONSTRAINT "trirea_reaction_inputs_triggerOutputTypeId_fkey";

-- AlterTable
ALTER TABLE "trirea_reaction_inputs" DROP COLUMN "triggerOutputTypeId",
ADD COLUMN     "reactionInputTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_reactionInputTypeId_fkey" FOREIGN KEY ("reactionInputTypeId") REFERENCES "reaction_inputs_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
