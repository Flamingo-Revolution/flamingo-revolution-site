import { defineMiddleware, sequence } from 'astro:middleware';
import { jsonResponse } from '@lib/functions';
import { TokenBucket } from '@lib/services/rateLimit';

/** Soft per-isolate limit: 100 tokens, 1 token refilled every 3s. */
const bucket = new TokenBucket<string>(100, 3);
const defaultBotOrigin = 'https://flamingo-bot-949711463853.europe-west3.run.app';
const productionSiteOrigin = 'https://www.flamingorevolution.eu';

function isAllowedBotProxyPath(path: string): boolean {
	return path === 'v1/chat' || path === 'widget/flamingo-chat.js' || path.startsWith('widget/media/');
}

const flamingoBotDevelopmentProxy = defineMiddleware(async (context, next) => {
	const proxyPrefix = '/api/flamingo-bot/';
	if (!import.meta.env.DEV || !context.url.pathname.startsWith(proxyPrefix)) {
		return next();
	}

	const path = context.url.pathname.slice(proxyPrefix.length).replace(/\/$/, '');
	if (!isAllowedBotProxyPath(path)) {
		return new Response(null, { status: 404 });
	}

	const configuredUrl = import.meta.env.PUBLIC_FLAMINGO_BOT_URL?.trim() || defaultBotOrigin;
	const headers = new Headers(context.request.headers);
	headers.delete('cookie');
	headers.delete('host');
	headers.delete('x-forwarded-for');
	headers.set('origin', productionSiteOrigin);

	const hasBody = context.request.method !== 'GET' && context.request.method !== 'HEAD';
	const response = await fetch(new URL(`/${path}`, new URL(configuredUrl).origin), {
		method: context.request.method,
		headers,
		body: hasBody ? await context.request.arrayBuffer() : undefined,
		redirect: 'manual'
	});

	const responseHeaders = new Headers(response.headers);
	responseHeaders.delete('access-control-allow-origin');
	responseHeaders.delete('access-control-expose-headers');
	responseHeaders.delete('vary');
	responseHeaders.set('X-Robots-Tag', 'noindex, nofollow');

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders
	});
});

function resolveClientIp(request: Request, clientAddress: () => string): string | null {
	try {
		const address = clientAddress();
		if (address) return address;
	} catch {
		// Adapter may not expose clientAddress (e.g. static / no adapter).
	}

	const cfConnectingIp = request.headers.get('CF-Connecting-IP')?.trim();
	if (cfConnectingIp) return cfConnectingIp;

	const forwardedFor = request.headers.get('X-Forwarded-For');

	if (forwardedFor) {
		const first = forwardedFor.split(',')[0]?.trim();
		if (first) return first;
	}

	return null;
}

const rateLimitMiddleware = defineMiddleware(async (context, next) => {
	if (!context.url.pathname.startsWith('/api/')) {
		return next();
	}

	const clientIP = resolveClientIp(context.request, () => context.clientAddress);
	if (clientIP === null) {
		return next();
	}

	const cost = context.request.method === 'GET' || context.request.method === 'OPTIONS' ? 1 : 3;

	if (!bucket.consume(clientIP, cost)) {
		return jsonResponse({ error: 'Too many requests.' }, 429);
	}

	return next();
});

const searchIndexMiddleware = defineMiddleware(async (context, next) => {
	const response = await next();

	if (context.url.pathname.startsWith('/api/')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}

	return response;
});

export const onRequest = sequence(
	flamingoBotDevelopmentProxy,
	rateLimitMiddleware,
	searchIndexMiddleware
);
