-- CreateEnum
CREATE TYPE "IdeaStatus" AS ENUM ('VISIBLE', 'HIDDEN');

-- CreateEnum
CREATE TYPE "VoteValue" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "ideas" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "status" "IdeaStatus" NOT NULL DEFAULT 'VISIBLE',
    "submitter_hash" TEXT NOT NULL,
    "submitter_name" TEXT,
    "upvote_count" INTEGER NOT NULL DEFAULT 0,
    "downvote_count" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "idea_id" TEXT NOT NULL,
    "voter_hash" TEXT NOT NULL,
    "value" "VoteValue" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ideas_status_score_created_at_idx" ON "ideas"("status", "score" DESC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "votes_voter_hash_idx" ON "votes"("voter_hash");

-- CreateIndex
CREATE UNIQUE INDEX "votes_idea_id_voter_hash_key" ON "votes"("idea_id", "voter_hash");

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
