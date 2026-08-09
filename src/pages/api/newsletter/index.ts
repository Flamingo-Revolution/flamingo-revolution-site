export const prerender = false;

import { createPrisma } from "@lib/db";
import { getDatabaseUrl } from "@lib/env/server";
import { isRecord, jsonResponse } from "@lib/functions";

const ALLOWED_REASONS = new Set(["referendum"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterContext = {
	request: Request;
};

function parseEmail(value: unknown): string | null {
	if (typeof value !== "string") return null;
	const email = value.trim().toLowerCase();
	if (email.length < 5 || email.length > 254 || !EMAIL_RE.test(email)) return null;
	return email;
}

function parseReason(value: unknown): string | null {
	if (typeof value !== "string") return null;
	const reason = value.trim().toLowerCase();
	if (!ALLOWED_REASONS.has(reason)) return null;
	return reason;
}

export const GET = async (context: NewsletterContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: "DATABASE_URL is not configured." }, 500);
	}

	const reason = parseReason(new URL(context.request.url).searchParams.get("reason"));

	if (!reason) {
		return jsonResponse({ error: "Arsyeja e regjistrimit nuk është e vlefshme." }, 400);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const count = await prisma.newsletterSignup.count({ where: { reason } });
		return jsonResponse({ count, reason });
	} catch (error) {
		console.error("Newsletter GET error:", error);
		return jsonResponse({ error: "Numri i regjistrimeve nuk u lexua." }, 500);
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (context: NewsletterContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: "DATABASE_URL is not configured." }, 500);
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

	const email = parseEmail(body.email);
	const reason = parseReason(body.reason);

	if (!email) {
		return jsonResponse({ error: "Email-i nuk është i vlefshëm." }, 400);
	}

	if (!reason) {
		return jsonResponse({ error: "Arsyeja e regjistrimit nuk është e vlefshme." }, 400);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const existing = await prisma.newsletterSignup.findUnique({
			where: { email_reason: { email, reason } }
		});

		if (existing) {
			return jsonResponse(
				{
					signup: {
						id: existing.id,
						email: existing.email,
						reason: existing.reason,
						createdAt: existing.createdAt.toISOString()
					},
					created: false
				},
				200
			);
		}

		const signup = await prisma.newsletterSignup.create({
			data: { email, reason }
		});

		return jsonResponse(
			{
				signup: {
					id: signup.id,
					email: signup.email,
					reason: signup.reason,
					createdAt: signup.createdAt.toISOString()
				},
				created: true
			},
			201
		);
	} catch (error) {
		console.error("Newsletter POST error:", error);
		return jsonResponse({ error: "Regjistrimi nuk u ruajt." }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
