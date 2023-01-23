/*
  Warnings:

  - You are about to drop the column `provider_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[google_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitter_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_provider_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "provider_id",
ADD COLUMN     "github_id" TEXT,
ADD COLUMN     "google_id" TEXT,
ADD COLUMN     "twitter_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_twitter_id_key" ON "users"("twitter_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_github_id_key" ON "users"("github_id");
