import { createPrisma } from "../../lib/prisma";

export async function onRequestGet(context: {
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}) {
  const databaseUrl = context.env.DATABASE_URL;

  if (!databaseUrl) {
    return Response.json(
      { ok: false, error: "DATABASE_URL is not configured." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const prisma = createPrisma(databaseUrl);

  try {
    const ideaCount = await prisma.idea.count();

    return Response.json(
      { ok: true, ideaCount },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("DB health check failed:", error);

    return Response.json(
      { ok: false, error: "Database query failed." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  } finally {
    context.waitUntil(prisma.$disconnect());
  }
}
