export const prerender = false;

import type { VoteValue } from "@prisma/client";
import { parseVoteValue } from "./functions";
import { createPrisma } from "@lib/db";
import {
  isRecord,
  jsonResponse,
  parseFingerprint,
  toPublicIdea,
  voteDeltas
} from "@lib/functions";

type VoteContext = {
  request: Request;
  params: { id?: string };
};

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}

function resolveFingerprint(request: Request, body: Record<string, unknown> | null) {
  return (
    parseFingerprint(body?.fingerprint) ||
    parseFingerprint(request.headers.get("X-Device-Fingerprint"))
  );
}

export const POST = async (context: VoteContext) => {
	const databaseUrl = import.meta.env.DATABASE_URL;

  const ideaId = context.params.id?.trim();

  if (!databaseUrl) {
    return jsonResponse({ error: "DATABASE_URL is not configured." }, 500);
  }

  if (!ideaId) {
    return jsonResponse({ error: "Idea id mungon." }, 400);
  }

  const body = await readBody(context.request);
  if (!body) {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const fingerprint = resolveFingerprint(context.request, body);
  const rating =
    parseVoteValue(body.value) ||
    parseVoteValue(body.rating) ||
    parseVoteValue(body.vote);

  if (!fingerprint) {
    return jsonResponse({ error: "Identifikuesi i pajisjes mungon." }, 400);
  }

  if (!rating) {
    return jsonResponse({ error: "Vleresimi duhet te jete UP ose DOWN." }, 400);
  }

  const prisma = createPrisma(databaseUrl);

  try {
    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });

    if (!idea || idea.status !== "VISIBLE") {
      return jsonResponse({ error: "Ideja nuk u gjet." }, 404);
    }

    const existing = await prisma.vote.findUnique({
      where: {
        ideaId_voterHash: {
          ideaId,
          voterHash: fingerprint
        }
      }
    });

    // Posting the same value again removes the vote (DELETE is also available).
    const nextValue: VoteValue | null = existing?.value === rating ? null : rating;
    const { upvoteDelta, downvoteDelta } = voteDeltas(existing?.value ?? null, nextValue);

    const updated = await prisma.$transaction(async (tx) => {
      if (!existing && nextValue) {
        await tx.vote.create({
          data: {
            ideaId,
            voterHash: fingerprint,
            value: nextValue
          }
        });
      } else if (existing && nextValue) {
        await tx.vote.update({
          where: { id: existing.id },
          data: { value: nextValue }
        });
      } else if (existing && !nextValue) {
        await tx.vote.delete({ where: { id: existing.id } });
      }

      const upvoteCount = idea.upvoteCount + upvoteDelta;
      const downvoteCount = idea.downvoteCount + downvoteDelta;

      return tx.idea.update({
        where: { id: ideaId },
        data: {
          upvoteCount,
          downvoteCount,
          score: upvoteCount - downvoteCount
        }
      });
    });

    return jsonResponse({ idea: toPublicIdea(updated, nextValue) });
  } catch (error) {
    console.error("Vote POST error:", error);
    return jsonResponse({ error: "Vota nuk u ruajt." }, 500);
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (context: VoteContext) => {
	const databaseUrl = import.meta.env.DATABASE_URL;

	const ideaId = context.params.id?.trim();

  if (!databaseUrl) {
    return jsonResponse({ error: "DATABASE_URL is not configured." }, 500);
  }

  if (!ideaId) {
    return jsonResponse({ error: "Idea id mungon." }, 400);
  }

  const body = await readBody(context.request);
  const fingerprint = resolveFingerprint(context.request, body);

  if (!fingerprint) {
    return jsonResponse({ error: "Identifikuesi i pajisjes mungon." }, 400);
  }

  const prisma = createPrisma(databaseUrl);

  try {
    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });

    if (!idea || idea.status !== "VISIBLE") {
      return jsonResponse({ error: "Ideja nuk u gjet." }, 404);
    }

    const existing = await prisma.vote.findUnique({
      where: {
        ideaId_voterHash: {
          ideaId,
          voterHash: fingerprint
        }
      }
    });

    if (!existing) {
      return jsonResponse({ idea: toPublicIdea(idea, null) });
    }

    const { upvoteDelta, downvoteDelta } = voteDeltas(existing.value, null);

    const updated = await prisma.$transaction(async (tx) => {
      await tx.vote.delete({ where: { id: existing.id } });

      const upvoteCount = idea.upvoteCount + upvoteDelta;
      const downvoteCount = idea.downvoteCount + downvoteDelta;

      return tx.idea.update({
        where: { id: ideaId },
        data: {
          upvoteCount,
          downvoteCount,
          score: upvoteCount - downvoteCount
        }
      });
    });

    return jsonResponse({ idea: toPublicIdea(updated, null) });
  } catch (error) {
    console.error("Vote DELETE error:", error);
    return jsonResponse({ error: "Vota nuk u fshi." }, 500);
  } finally {
    await prisma.$disconnect();
  }
};
