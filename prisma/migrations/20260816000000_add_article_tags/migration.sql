-- AlterTable
ALTER TABLE "articles" ADD COLUMN "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
