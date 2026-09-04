import assert from 'node:assert/strict';
import test from 'node:test';
import { copyGameLink, gameShareLinks, shareGameToDiscord, sharePanelLayout } from '../src/lib/gameShare.ts';

const title = 'Rama apo Berisha?';
const url = 'https://www.flamingorevolution.eu/lojerat/rama-apo-berisha/';

test('share panel uses the available space above or below the button', () => {
	assert.deepEqual(sharePanelLayout(80, 130, 640), { side: 'below', space: 486 });
	assert.deepEqual(sharePanelLayout(520, 570, 640), { side: 'above', space: 496 });
	assert.deepEqual(sharePanelLayout(0, 50, 50), { side: 'above', space: 0 });
});

test('each game shares its own public URL', () => {
	for (const path of ['rama-apo-berisha', 'kuizi-qytetar', 'fjalekryqet']) {
		const publicUrl = `https://www.flamingorevolution.eu/lojerat/${path}/`;
		const links = gameShareLinks(publicUrl, title);
		assert.equal(new URL(links.facebook).searchParams.get('u'), publicUrl);
		assert.equal(new URL(links.x).searchParams.get('url'), publicUrl);
		assert.equal(new URL(links.whatsapp).searchParams.get('text'), `Luaj ${title} — Këndi i Lojërave\n${publicUrl}`);
		assert.ok(Object.values(links).every((link) => !link.includes('127.0.0.1')));
	}
});

test('share URLs safely encode accents, punctuation and query parameters', () => {
	const specialTitle = 'Këndi & lojërat #1?';
	const specialUrl = `${url}?a=1&b=dy#rezultati`;
	const links = gameShareLinks(specialUrl, specialTitle);
	assert.equal(new URL(links.x).searchParams.get('text'), `Luaj ${specialTitle} — Këndi i Lojërave`);
	assert.equal(new URL(links.x).searchParams.get('url'), specialUrl);
	assert.equal(new URL(links.facebook).searchParams.get('u'), specialUrl);
});

test('copy confirmation only follows a successful clipboard write', async () => {
	let copied = '';
	assert.equal(await copyGameLink(url, { clipboard: { async writeText(text) { copied = text; } } }), true);
	assert.equal(copied, url);
});

test('missing or denied clipboard requests manual copying', async () => {
	assert.equal(await copyGameLink(url, {}), false);
	assert.equal(await copyGameLink(url, { clipboard: { async writeText() { throw new Error('Denied'); } } }), false);
});

test('crossword share links and Discord copying preserve the individual puzzle anchor', async () => {
	for (const anchor of ['botimi-vi', 'botimi-v']) {
		const puzzleUrl = `https://www.flamingorevolution.eu/lojerat/fjalekryqet/#${anchor}`;
		const links = gameShareLinks(puzzleUrl, 'Fjalëkryqi');
		assert.equal(new URL(links.facebook).searchParams.get('u'), puzzleUrl);
		assert.equal(new URL(links.x).searchParams.get('url'), puzzleUrl);
		assert.ok(new URL(links.whatsapp).searchParams.get('text')?.endsWith(puzzleUrl));
		let copied = '';
		assert.equal(await copyGameLink(puzzleUrl, { clipboard: { async writeText(text) { copied = text; } } }), true);
		assert.equal(copied, puzzleUrl);
	}
});

function discordWindow() {
	return {
		opener: {} as unknown,
		closed: false,
		destination: '',
		get location() { return { replace: (url: string) => { this.destination = url; } }; },
		close() { this.closed = true; }
	};
}

test('Discord copies and reserves a safe tab within the click, then opens automatically', async () => {
	const events: string[] = [];
	const popup = discordWindow();
	let finishCopy!: () => void;
	const puzzleUrl = 'https://www.flamingorevolution.eu/lojerat/fjalekryqet/#botimi-vi';
	const result = shareGameToDiscord(puzzleUrl, {
		clipboard: { writeText(text) {
			assert.equal(text, puzzleUrl);
			events.push('copy');
			return new Promise<void>((resolve) => { finishCopy = resolve; });
		} }
	}, () => { events.push('open'); return popup; });
	assert.deepEqual(events, ['copy', 'open']);
	assert.equal(popup.opener, null);
	assert.equal(popup.destination, '');
	finishCopy();
	assert.deepEqual(await result, { copied: true, opened: true });
	assert.equal(popup.destination, 'https://discord.com/channels/@me');
	assert.equal(popup.closed, false);
});

test('Discord keeps a manual opening fallback when popups are blocked', async () => {
	for (const openWindow of [() => null, () => { throw new Error('Blocked'); }]) {
		const result = await shareGameToDiscord(url, { clipboard: { async writeText() {} } }, openWindow);
		assert.deepEqual(result, { copied: true, opened: false });
	}
});

test('Discord closes the reserved tab and requests manual copying if copying fails', async () => {
	for (const platform of [{}, { clipboard: { async writeText() { throw new Error('Denied'); } } }]) {
		const popup = discordWindow();
		assert.deepEqual(await shareGameToDiscord(url, platform, () => popup), { copied: false, opened: false });
		assert.equal(popup.closed, true);
		assert.equal(popup.destination, '');
	}
});

test('Discord does not reopen a tab the user closed while copying', async () => {
	const popup = discordWindow();
	popup.closed = true;
	assert.deepEqual(await shareGameToDiscord(url, { clipboard: { async writeText() {} } }, () => popup), { copied: true, opened: false });
	assert.equal(popup.destination, '');
});

test('Discord falls back and closes the blank tab if navigation fails', async () => {
	let closed = false;
	const popup = {
		opener: null,
		closed: false,
		location: { replace() { throw new Error('Navigation blocked'); } },
		close() { closed = true; }
	};
	assert.deepEqual(await shareGameToDiscord(url, { clipboard: { async writeText() {} } }, () => popup), { copied: true, opened: false });
	assert.equal(closed, true);
});
