-- CreateEnum
CREATE TYPE "ReporterStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "reporters" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "key_hash" TEXT NOT NULL,
    "status" "ReporterStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "reporters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reporter_sessions" (
    "id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "reporter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reporter_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "cover_image_url" TEXT,
    "content" JSONB NOT NULL DEFAULT '{}',
    "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
    "reporter_id" TEXT NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reporters_slug_key" ON "reporters"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "reporters_key_hash_key" ON "reporters"("key_hash");

-- CreateIndex
CREATE UNIQUE INDEX "reporter_sessions_token_hash_key" ON "reporter_sessions"("token_hash");

-- CreateIndex
CREATE INDEX "reporter_sessions_reporter_id_idx" ON "reporter_sessions"("reporter_id");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_status_published_at_idx" ON "articles"("status", "published_at" DESC);

-- CreateIndex
CREATE INDEX "articles_reporter_id_updated_at_idx" ON "articles"("reporter_id", "updated_at" DESC);

-- AddForeignKey
ALTER TABLE "reporter_sessions" ADD CONSTRAINT "reporter_sessions_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "reporters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "reporters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
