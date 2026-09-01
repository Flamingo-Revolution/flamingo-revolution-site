import type { PrismaClient, Reporter } from '@prisma/client';
import type { AstroCookies } from 'astro';

export const SESSION_COOKIE_NAME = 'flamingo_reporter_session';
export const SESSION_TTL_DAYS = 30;
export const MIN_ACCESS_KEY_LENGTH = 16;
export const MAX_ACCESS_KEY_LENGTH = 256;

const SESSION_TTL_MS = SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;

/** Hash a secret with SHA-256 (Web Crypto, available in Workers and Node 22). */
export async function sha256Hex(input: string): Promise<string> {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
	return Array.from(new Uint8Array(digest))
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
}

/** Generate a cryptographically random hex token. */
export function generateToken(bytes = 32): string {
	const buffer = crypto.getRandomValues(new Uint8Array(bytes));
	return Array.from(buffer)
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
}

export function parseAccessKey(value: unknown): string | null {
	if (typeof value !== 'string') return null;
	const key = value.trim();

	if (key.length < MIN_ACCESS_KEY_LENGTH || key.length > MAX_ACCESS_KEY_LENGTH) return null;

	return key;
}

export type PublicReporter = {
	id: string;
	name: string;
	slug: string;
};

export function toPublicReporter(reporter: Reporter): PublicReporter {
	return { id: reporter.id, name: reporter.name, slug: reporter.slug };
}

export async function createSession(prisma: PrismaClient, reporterId: string, cookies: AstroCookies): Promise<void> {
	const token = generateToken();
	const tokenHash = await sha256Hex(token);
	const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

	await prisma.reporterSession.create({
		data: { tokenHash, reporterId, expiresAt }
	});

	cookies.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		maxAge: Math.floor(SESSION_TTL_MS / 1000)
	});
}

export async function destroySession(prisma: PrismaClient, cookies: AstroCookies): Promise<void> {
	const token = cookies.get(SESSION_COOKIE_NAME)?.value;

	if (token) {
		const tokenHash = await sha256Hex(token);
		await prisma.reporterSession.deleteMany({ where: { tokenHash } });
	}

	cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}

/** Resolve the active reporter for the current session cookie, or null. */
export async function getSessionReporter(prisma: PrismaClient, cookies: AstroCookies): Promise<Reporter | null> {
	const token = cookies.get(SESSION_COOKIE_NAME)?.value;
	if (!token) return null;

	const tokenHash = await sha256Hex(token);

	const session = await prisma.reporterSession.findUnique({
		where: { tokenHash },
		include: { reporter: true }
	});

	if (!session) return null;

	if (session.expiresAt.getTime() <= Date.now()) {
		await prisma.reporterSession.delete({ where: { id: session.id } }).catch(() => {});
		return null;
	}

	if (session.reporter.status !== 'ACTIVE') return null;

	return session.reporter;
}
