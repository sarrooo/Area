/*
  Warnings:

  - You are about to drop the column `logo` on the `services` table. All the data in the column will be lost.
  - You are about to drop the `reaction_inputs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trigger_inputs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trigger_outputs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredSubscription` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedToId` to the `trirea_reaction_inputs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enabled` to the `trireas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reaction_inputs" DROP CONSTRAINT "reaction_inputs_reactionId_fkey";

-- DropForeignKey
ALTER TABLE "trigger_inputs" DROP CONSTRAINT "trigger_inputs_triggerId_fkey";

-- DropForeignKey
ALTER TABLE "trigger_outputs" DROP CONSTRAINT "trigger_outputs_triggerId_fkey";

-- DropForeignKey
ALTER TABLE "trirea_reaction_inputs" DROP CONSTRAINT "trirea_reaction_inputs_triggerOutputId_fkey";

-- DropForeignKey
ALTER TABLE "trirea_trigger_inputs" DROP CONSTRAINT "trirea_trigger_inputs_triggerInputId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "logo",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "requiredSubscription" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "trirea_reaction_inputs" ADD COLUMN     "linkedToId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trireas" ADD COLUMN     "enabled" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "reaction_inputs";

-- DropTable
DROP TABLE "trigger_inputs";

-- DropTable
DROP TABLE "trigger_outputs";

-- CreateTable
CREATE TABLE "trigger_inputs_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "regex" TEXT,
    "mandatory" BOOLEAN NOT NULL,
    "triggerId" INTEGER NOT NULL,

    CONSTRAINT "trigger_inputs_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trigger_outputs_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "triggerId" INTEGER NOT NULL,

    CONSTRAINT "trigger_outputs_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction_inputs_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "regex" TEXT,
    "mandatory" BOOLEAN NOT NULL,
    "reactionId" INTEGER NOT NULL,

    CONSTRAINT "reaction_inputs_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trigger_inputs_types" ADD CONSTRAINT "trigger_inputs_types_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger_outputs_types" ADD CONSTRAINT "trigger_outputs_types_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction_inputs_types" ADD CONSTRAINT "reaction_inputs_types_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_trigger_inputs" ADD CONSTRAINT "trirea_trigger_inputs_triggerInputId_fkey" FOREIGN KEY ("triggerInputId") REFERENCES "trigger_inputs_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_triggerOutputId_fkey" FOREIGN KEY ("triggerOutputId") REFERENCES "trigger_outputs_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
