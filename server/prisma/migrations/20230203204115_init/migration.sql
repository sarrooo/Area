-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "requiredSubscription" BOOLEAN NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "google_id" TEXT,
    "twitter_id" TEXT,
    "github_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "trireas" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prevTriggerData" TEXT,
    "enabled" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
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
    "triggerInputTypeId" INTEGER NOT NULL,

    CONSTRAINT "trirea_trigger_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trirea_reaction_inputs" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "linkedToId" INTEGER,
    "trireaId" INTEGER NOT NULL,
    "reactionInputTypeId" INTEGER NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_twitter_id_key" ON "users"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_github_id_key" ON "users"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triggers" ADD CONSTRAINT "triggers_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger_inputs_types" ADD CONSTRAINT "trigger_inputs_types_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger_outputs_types" ADD CONSTRAINT "trigger_outputs_types_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction_inputs_types" ADD CONSTRAINT "reaction_inputs_types_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trireas" ADD CONSTRAINT "trireas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trireas" ADD CONSTRAINT "trireas_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trireas" ADD CONSTRAINT "trireas_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_trigger_inputs" ADD CONSTRAINT "trirea_trigger_inputs_trireaId_fkey" FOREIGN KEY ("trireaId") REFERENCES "trireas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_trigger_inputs" ADD CONSTRAINT "trirea_trigger_inputs_triggerInputTypeId_fkey" FOREIGN KEY ("triggerInputTypeId") REFERENCES "trigger_inputs_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_trireaId_fkey" FOREIGN KEY ("trireaId") REFERENCES "trireas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trirea_reaction_inputs" ADD CONSTRAINT "trirea_reaction_inputs_reactionInputTypeId_fkey" FOREIGN KEY ("reactionInputTypeId") REFERENCES "reaction_inputs_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_services" ADD CONSTRAINT "user_services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_services" ADD CONSTRAINT "user_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
