import { defineMiddleware, sequence } from "astro:middleware";
import { jsonResponse } from "@lib/functions";
import { TokenBucket } from "@lib/services/rateLimit";

/** Soft per-isolate limit: 100 tokens, 1 token refilled every 3s. */
// const bucket = new TokenBucket<string>(100, 3);
const bucket = new TokenBucket<string>(5, 3); // 5 tokens, refill 1 / 3s


function resolveClientIp(request: Request, clientAddress: () => string): string | null {
	try {
		const address = clientAddress();
		if (address) return address;
	} catch {
		// Adapter may not expose clientAddress (e.g. static / no adapter).
	}

	const cfConnectingIp = request.headers.get("CF-Connecting-IP")?.trim();
	if (cfConnectingIp) return cfConnectingIp;

	const forwardedFor = request.headers.get("X-Forwarded-For");
	
	if (forwardedFor) {
		const first = forwardedFor.split(",")[0]?.trim();
		if (first) return first;
	}

	return null;
}

const rateLimitMiddleware = defineMiddleware(async (context, next) => {
	if (!context.url.pathname.startsWith("/api/")) {
		return next();
	}

	const clientIP = resolveClientIp(context.request, () => context.clientAddress);
	if (clientIP === null) {
		return next();
	}

	const cost = context.request.method === "GET" || context.request.method === "OPTIONS" ? 1 : 3;

	if (!bucket.consume(clientIP, cost)) {
		return jsonResponse({ error: "Too many requests." }, 429);
	}

	return next();
});

export const onRequest = sequence(rateLimitMiddleware);
