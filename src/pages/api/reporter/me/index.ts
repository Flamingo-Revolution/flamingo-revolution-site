export const prerender = false;

import type { APIContext } from 'astro';
import { createPrisma } from '@lib/db';
import { getDatabaseUrl } from '@lib/env/server';
import { jsonResponse } from '@lib/functions';
import { getSessionReporter, toPublicReporter } from '@lib/auth';

export const GET = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const reporter = await getSessionReporter(prisma, context.cookies);

		if (!reporter) {
			return jsonResponse({ reporter: null }, 401);
		}

		return jsonResponse({ reporter: toPublicReporter(reporter) }, 200);
	} catch (error) {
		console.error('Reporter me error:', error);
		return jsonResponse({ error: 'Sesioni nuk u verifikua.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
