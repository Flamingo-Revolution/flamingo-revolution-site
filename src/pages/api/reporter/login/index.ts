export const prerender = false;

import type { APIContext } from 'astro';
import { createPrisma } from '@lib/db';
import { getDatabaseUrl } from '@lib/env/server';
import { isRecord, jsonResponse } from '@lib/functions';
import { createSession, parseAccessKey, sha256Hex, toPublicReporter } from '@lib/auth';

export const POST = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	let body: unknown;

	try {
		body = await context.request.json();
	} catch {
		return jsonResponse({ error: 'Invalid JSON body.' }, 400);
	}

	if (!isRecord(body)) {
		return jsonResponse({ error: 'Invalid request body.' }, 400);
	}

	const accessKey = parseAccessKey(body.accessKey);

	if (!accessKey) {
		return jsonResponse({ error: 'Çelësi i aksesit është i pavlefshëm.' }, 400);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const keyHash = await sha256Hex(accessKey);
		const reporter = await prisma.reporter.findUnique({ where: { keyHash } });

		if (!reporter || reporter.status !== 'ACTIVE') {
			return jsonResponse({ error: 'Çelësi i aksesit nuk njihet.' }, 401);
		}

		// Opportunistically clear this reporter's expired sessions.
		await prisma.reporterSession.deleteMany({
			where: { reporterId: reporter.id, expiresAt: { lte: new Date() } }
		});

		await createSession(prisma, reporter.id, context.cookies);

		return jsonResponse({ reporter: toPublicReporter(reporter) }, 200);
	} catch (error) {
		console.error('Reporter login error:', error);
		return jsonResponse({ error: 'Hyrja dështoi. Provoni përsëri.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
