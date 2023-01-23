/*
  Warnings:

  - Added the required column `mandatory` to the `trigger_inputs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trigger_inputs" ADD COLUMN     "mandatory" BOOLEAN NOT NULL,
ADD COLUMN     "regex" TEXT;
