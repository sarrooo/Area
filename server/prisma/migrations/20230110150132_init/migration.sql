/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "triggers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "triggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trigger_inputs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "triggerId" INTEGER NOT NULL,

    CONSTRAINT "trigger_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trigger_outputs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "triggerId" INTEGER NOT NULL,

    CONSTRAINT "trigger_outputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction_inputs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "reactionId" INTEGER NOT NULL,

    CONSTRAINT "reaction_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trireas" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prevTriggerData" TEXT,
    "userId" INTEGER NOT NULL,
    "triggerId" INTEGER NOT NULL,
    "reactionId" INTEGER NOT NULL,

    CONSTRAINT "trireas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trirea_trigger_inputs" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "trireaId" INTEGER NOT NULL,
    "triggerInputId" INTEGER NOT NULL,

    CONSTRAINT "trirea_trigger_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trirea_reaction_inputs" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "trireaId" INTEGER NOT NULL,
    "triggerOutputId" INTEGER NOT NULL,

    CONSTRAINT "trirea_reaction_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_services" (
    "userId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "user_services_pkey" PRIMARY KEY ("userId","serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "triggers" ADD CONSTRAINT "triggers_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger_inputs" ADD CONSTRAINT "trigger_inputs_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger_outputs" ADD CONSTRAINT "trigger_outputs_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction_inputs" ADD CONSTRAINT "reaction_inputs_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trireas" ADD CONSTRAINT "trireas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trireas" ADD CONSTRAINT "trireas_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trireas" ADD CONSTRAINT "trireas_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_trigger_inputs" ADD CONSTRAINT "trirea_trigger_inputs_trireaId_fkey" FOREIGN KEY ("trireaId") REFERENCES "trireas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_trigger_inputs" ADD CONSTRAINT "trirea_trigger_inputs_triggerInputId_fkey" FOREIGN KEY ("triggerInputId") REFERENCES "trigger_inputs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_trireaId_fkey" FOREIGN KEY ("trireaId") REFERENCES "trireas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_triggerOutputId_fkey" FOREIGN KEY ("triggerOutputId") REFERENCES "trigger_outputs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_services" ADD CONSTRAINT "user_services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_services" ADD CONSTRAINT "user_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
