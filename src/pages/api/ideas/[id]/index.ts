export const prerender = false;

import { createPrisma } from "@lib/db";
import {
  isRecord,
  jsonResponse,
  MAX_NAME_LENGTH,
  parseFingerprint,
  toPublicIdea
} from "@lib/functions";

type IdeaContext = {
  request: Request;
  params: { id?: string };
};

export const PATCH = async (context: IdeaContext) => {
	const databaseUrl = import.meta.env.DATABASE_URL;

	const ideaId = context.params.id?.trim();

  if (!databaseUrl) {
    return jsonResponse({ error: "DATABASE_URL is not configured." }, 500);
  }

  if (!ideaId) {
    return jsonResponse({ error: "Idea id mungon." }, 400);
  }

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  if (!isRecord(body)) {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const fingerprint = parseFingerprint(body.fingerprint);
  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME_LENGTH) : "";

  if (!fingerprint) {
    return jsonResponse({ error: "Identifikuesi i pajisjes mungon." }, 400);
  }

  if (!name) {
    return jsonResponse({ error: "Emri eshte i detyrueshem per kete veprim." }, 400);
  }

  const prisma = createPrisma(databaseUrl);

  try {
    const existing = await prisma.idea.findUnique({ where: { id: ideaId } });

    if (!existing || existing.status !== "VISIBLE") {
      return jsonResponse({ error: "Ideja nuk u gjet." }, 404);
    }

    if (existing.submitterHash !== fingerprint) {
      return jsonResponse({ error: "Nuk ke te drejte te perditesosh kete ide." }, 403);
    }

    const idea = await prisma.idea.update({
      where: { id: ideaId },
      data: { submitterName: name }
    });

    return jsonResponse({ idea: toPublicIdea(idea) });
  } catch (error) {
    console.error("Idea PATCH error:", error);
    return jsonResponse({ error: "Ideja nuk u perditesua." }, 500);
  } finally {
    await prisma.$disconnect();
  }
};
