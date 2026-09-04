import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { gameSocialImage } from '../src/data/games.ts';

const origin = 'https://www.flamingorevolution.eu';
const routes = [
	['lojerat', 'Këndi i Lojërave | Revolucioni Flamingo'],
	['lojerat/rama-apo-berisha', 'Rama apo Berisha? | Lojërat'],
	['lojerat/kuizi-qytetar', 'Kuizi Qytetar | Këndi i Lojërave'],
	['lojerat/fjalekryqet', 'Fjalëkryqet e Flamingo Times | Lojërat']
];

function readPage(route: string) {
	return readFileSync(new URL(`../dist/client/${route}/index.html`, import.meta.url), 'utf8');
}

function metadata(html: string) {
	return new Map(Array.from(html.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"/g), (match) => [match[1], match[2]]));
}

for (const [route, title] of routes) {
	test(`${route} uses games artwork with its own title and description`, () => {
		const meta = metadata(readPage(route));
		const image = `${origin}${gameSocialImage.socialImagePath}`;
		assert.equal(meta.get('og:image'), image);
		assert.equal(meta.get('og:image:secure_url'), image);
		assert.equal(meta.get('twitter:image'), image);
		assert.equal(meta.get('og:image:type'), 'image/png');
		assert.equal(meta.get('og:image:width'), '1001');
		assert.equal(meta.get('og:image:height'), '592');
		assert.equal(meta.get('og:image:alt'), gameSocialImage.socialImageAlt);
		assert.equal(meta.get('twitter:image:alt'), gameSocialImage.socialImageAlt);
		assert.equal(meta.get('og:title'), title);
		assert.equal(meta.get('twitter:title'), title);
		assert.equal(meta.get('og:url'), `${origin}/${route}/`);
		assert.ok(meta.get('description'));
		assert.equal(meta.get('og:description'), meta.get('description'));
		assert.equal(meta.get('twitter:description'), meta.get('description'));
	});
}

test('every game menu has SVG icons and Discord instead of Instagram', () => {
	for (const [route] of routes) {
		const menus = [...readPage(route).matchAll(/<game-share\b[\s\S]*?<\/game-share>/g)];
		assert.equal(menus.length, route === 'lojerat' ? 3 : route.endsWith('fjalekryqet') ? 2 : 1);
		for (const [menu] of menus) {
			const options = [...menu.matchAll(/<li\b[\s\S]*?<\/li>/g)];
			assert.equal(options.length, 5);
			for (const [option] of options) assert.match(option, /<svg\b/);
			for (const label of ['Kopjo linkun', 'Facebook', 'Discord', 'WhatsApp', 'X']) {
				assert.ok(options.some(([option]) => new RegExp(`<span\\b[^>]*>${label}</span>`).test(option)), `${route}: missing ${label}`);
			}
			assert.match(menu, /data-discord/);
			assert.match(menu, /href="https:\/\/discord.com\/channels\/@me"[^>]*hidden/);
			assert.doesNotMatch(menu, /instagram|Instagram|Zgjidhe në pajisje|<small\b/);
		}
	}
});

test('unrelated pages retain the default social image and dimensions', () => {
	const html = readFileSync(new URL('../dist/client/index.html', import.meta.url), 'utf8');
	const meta = metadata(html);
	assert.equal(meta.get('og:image'), `${origin}/social-card.jpg?v=20260705`);
	assert.equal(meta.get('og:image:width'), '1200');
	assert.equal(meta.get('og:image:height'), '630');
});

for (const [route] of routes.slice(1, 3)) {
	test(`${route} has a share menu in its heading for the game link only`, () => {
		const html = readPage(route);
		const heading = [...html.matchAll(/<header\b[^>]*>[\s\S]*?<\/header>/g)]
			.find(([header]) => header.includes('<h1'))?.[0];
		assert.ok(heading, 'A visible game heading should be present');
		const menus = [...heading.matchAll(/<game-share\b[\s\S]*?<\/game-share>/g)];
		assert.equal(menus.length, 1);
		assert.ok(menus[0][0].includes(`data-url="${origin}/${route}/"`));
		assert.match(menus[0][0], /game-share--compact/);
		assert.doesNotMatch(menus[0][0], /share-chevron/);
		assert.doesNotMatch(menus[0][0], /score=|rezultat=/);
		assert.equal([...menus[0][0].matchAll(/<li\b/g)].length, 5);
	});
}

test('crossword sharing sits beside each puzzle title, never in the collection hero', () => {
	const html = readPage('lojerat/fjalekryqet');
	const headers = [...html.matchAll(/<header\b[^>]*>[\s\S]*?<\/header>/g)].map(([header]) => header);
	const hero = headers.find((header) => header.includes('<h1'));
	assert.ok(hero);
	assert.doesNotMatch(hero, /<game-share\b|heading-tools/);
	const menuIds = new Set<string>();
	for (const [titleId, title, anchor] of [
		['puzzle-six-title', 'Kush është kush?', 'botimi-vi'],
		['puzzle-five-title', 'Fjala e fshehur', 'botimi-v']
	]) {
		const header = headers.find((header) => header.includes(`id="${titleId}"`));
		assert.ok(header);
		assert.match(header, /puzzle__title-row[^>]*>\s*<h2[^>]*>[\s\S]*?<\/h2>\s*<game-share\b/);
		const menus = [...header.matchAll(/<game-share\b[\s\S]*?<\/game-share>/g)];
		assert.equal(menus.length, 1);
		const menu = menus[0][0];
		assert.ok(menu.includes(`data-url="${origin}/lojerat/fjalekryqet/#${anchor}"`));
		assert.ok(menu.includes(`data-title="${title} — Flamingo Times, Botimi`));
		assert.match(menu, /game-share--compact/);
		assert.doesNotMatch(menu, /share-chevron|score=|rezultat=/);
		const id = menu.match(/aria-controls="([^"]+)"/)?.[1];
		assert.ok(id);
		assert.match(id, /^[a-z0-9-]+$/);
		assert.ok(!menuIds.has(id));
		menuIds.add(id);
		assert.ok(menu.includes(`id="${id}"`));
	}
});
