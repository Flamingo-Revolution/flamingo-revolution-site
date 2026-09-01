export const prerender = false;

import type { APIContext } from 'astro';
import { createPrisma } from '@lib/db';
import { getDatabaseUrl } from '@lib/env/server';
import { jsonResponse } from '@lib/functions';
import { destroySession } from '@lib/auth';

export const POST = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		await destroySession(prisma, context.cookies);
		return jsonResponse({ ok: true }, 200);
	} catch (error) {
		console.error('Reporter logout error:', error);
		return jsonResponse({ error: 'Dalja dështoi.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
