/*
  Warnings:

  - Added the required column `name` to the `trireas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trireas" ADD COLUMN     "name" TEXT NOT NULL;
