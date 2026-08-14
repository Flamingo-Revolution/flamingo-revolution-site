/**
 * Create (or re-key) a whitelisted Flamingo Times reporter.
 *
 * Usage:
 *   node scripts/create-reporter.mjs --name "Emri Mbiemri" [--slug emri-mbiemri]
 *
 * Prints the generated access key ONCE — share it with the reporter over a
 * secure channel. Only its SHA-256 hash is stored in the database.
 * Requires DIRECT_URL in .env (same as Prisma CLI commands).
 */
import 'dotenv/config';
import { webcrypto } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DIRECT_URL;
if (!connectionString) {
	throw new Error('DIRECT_URL is required to create a reporter');
}

function readArg(flag) {
	const index = process.argv.indexOf(flag);
	return index !== -1 ? process.argv[index + 1]?.trim() : undefined;
}

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/ë/g, 'e')
		.replace(/ç/g, 'c')
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

async function sha256Hex(input) {
	const digest = await webcrypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
	return Array.from(new Uint8Array(digest))
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
}

const name = readArg('--name');
if (!name) {
	console.error('Usage: node scripts/create-reporter.mjs --name "Emri Mbiemri" [--slug emri-mbiemri]');
	process.exit(1);
}

const slug = readArg('--slug') || slugify(name);
if (!slug) {
	console.error('Could not derive a slug from the name; pass --slug explicitly.');
	process.exit(1);
}

const accessKey = `ft_${Buffer.from(webcrypto.getRandomValues(new Uint8Array(24))).toString('hex')}`;
const keyHash = await sha256Hex(accessKey);

const prisma = new PrismaClient({
	adapter: new PrismaNeon({ connectionString })
});

try {
	const reporter = await prisma.reporter.upsert({
		where: { slug },
		update: { name, keyHash, status: 'ACTIVE' },
		create: { name, slug, keyHash }
	});

	console.log(`Reporter:   ${reporter.name} (${reporter.slug})`);
	console.log(`Access key: ${accessKey}`);
	console.log('Store this key now — it cannot be recovered later.');
} finally {
	await prisma.$disconnect();
}
