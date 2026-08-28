export const prerender = false;

import { createPrisma } from '@lib/db';
import { getDatabaseUrl, getDiscordWebhookUrl } from '@lib/env/server';
import {
	IDEA_SORT_ORDER_BY,
	isRecord,
	jsonResponse,
	MAX_IDEA_LENGTH,
	MAX_NAME_LENGTH,
	parseFingerprint,
	parseIdeasSort,
	toPublicIdea
} from '@lib/functions';

type IdeasContext = {
	request: Request;
	locals: App.Locals;
};

async function notifyDiscord(content: string, name: string | null) {
	const webhookUrl = getDiscordWebhookUrl();
	if (!webhookUrl) return;

	const author = name?.trim() || 'Anonymous';
	let url: URL;

	try {
		url = new URL(webhookUrl);
	} catch {
		console.error('Discord webhook configuration error: invalid URL.');
		return;
	}

	const isDiscordHost = url.hostname === 'discord.com' || url.hostname === 'discordapp.com';
	const isWebhookPath = /^\/api(?:\/v\d+)?\/webhooks\/\d+\/[^/]+\/?$/.test(url.pathname);

	if (webhookUrl.includes('\\') || url.protocol !== 'https:' || !isDiscordHost || !isWebhookPath) {
		console.error('Discord webhook configuration error: expected a standard Discord incoming webhook URL.');
		return;
	}

	try {
		url.searchParams.set('wait', 'true');

		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				embeds: [
					{
						title: 'New idea submitted',
						url: 'https://flamingorevolution.eu/idete-tuaja',
						description: content.slice(0, 4096),
						color: 0x5865f2,
						fields: [{ name: 'Author', value: author, inline: true }],
						timestamp: new Date().toISOString()
					}
				],
				allowed_mentions: { parse: [] }
			})
		});

		if (!response.ok) {
			console.error('Discord webhook error:', {
				status: response.status,
				statusText: response.statusText
			});
		}
	} catch (error) {
		// A Discord failure must never break an idea submission.
		console.error('Discord webhook request failed:', {
			errorName: error instanceof Error ? error.name : 'UnknownError'
		});
	}
}

function resolveFingerprint(request: Request) {
	const url = new URL(request.url);
	return (
		parseFingerprint(url.searchParams.get('fingerprint')) ||
		parseFingerprint(request.headers.get('X-Device-Fingerprint'))
	);
}

export const GET = async (context: IdeasContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ ideas: [], stats: { approved: 0 }, error: 'DATABASE_URL is not configured.' }, 500);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const url = new URL(context.request.url);
		const fingerprint = resolveFingerprint(context.request);
		const sort = parseIdeasSort(url.searchParams.get('sort'));

		const ideas = await prisma.idea.findMany({
			where: { status: 'VISIBLE' },
			orderBy: IDEA_SORT_ORDER_BY[sort]
		});

		const voteByIdeaId = new Map<string, 'UP' | 'DOWN'>();

		if (fingerprint && ideas.length > 0) {
			const votes = await prisma.vote.findMany({
				where: {
					voterHash: fingerprint,
					ideaId: { in: ideas.map((idea) => idea.id) }
				},
				select: { ideaId: true, value: true }
			});

			for (const vote of votes) {
				voteByIdeaId.set(vote.ideaId, vote.value);
			}
		}

		const payload = ideas.map((idea) => toPublicIdea(idea, voteByIdeaId.get(idea.id) ?? null));

		return jsonResponse(
			{
				ideas: payload,
				stats: { approved: payload.length }
			},
			200,
			'private, no-store'
		);
	} catch (error) {
		console.error('Ideas GET error:', error);

		return jsonResponse(
			{
				ideas: [],
				stats: { approved: 0 },
				error: 'Burimi i të dhënave nuk është i disponueshëm.'
			},
			502
		);
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (context: IdeasContext) => {
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

	const content =
		typeof body.content === 'string' ? body.content.trim() : typeof body.idea === 'string' ? body.idea.trim() : '';

	const fingerprint = parseFingerprint(body.fingerprint);

	const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME_LENGTH) : '';

	if (!content) {
		return jsonResponse({ error: 'Ideja është e detyrueshme.' }, 400);
	}

	if (content.length > MAX_IDEA_LENGTH) {
		return jsonResponse({ error: `Ideja nuk mund të jetë më e gjatë se ${MAX_IDEA_LENGTH} karaktere.` }, 400);
	}

	if (!fingerprint) {
		return jsonResponse({ error: 'Identifikuesi i pajisjes mungon.' }, 400);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const idea = await prisma.idea.create({
			data: {
				content,
				submitterHash: fingerprint,
				submitterName: name || null
			}
		});

		context.locals.cfContext.waitUntil(notifyDiscord(idea.content, idea.submitterName));

		return jsonResponse({ idea: toPublicIdea(idea) }, 201);
	} catch (error) {
		console.error('Ideas POST error:', error);
		return jsonResponse({ error: 'Ideja nuk u ruajt.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
