/** Build share links from the configured public URL, never the preview origin. */
export function gameShareLinks(url: string, title: string) {
	const text = `Luaj ${title} — Këndi i Lojërave`;
	return {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
		whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
		x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
	};
}

export function sharePanelLayout(top: number, bottom: number, viewportHeight: number) {
	const above = Math.max(0, top - 24);
	const below = Math.max(0, viewportHeight - bottom - 24);
	return { side: below > above ? 'below' : 'above', space: Math.max(above, below) };
}

type SharePlatform = {
	clipboard?: { writeText(text: string): Promise<void> };
};

export async function copyGameLink(url: string, platform: SharePlatform): Promise<boolean> {
	try {
		if (!platform.clipboard) return false;
		await platform.clipboard.writeText(url);
		return true;
	} catch {
		return false;
	}
}

type DiscordWindow = {
	opener: unknown;
	closed: boolean;
	location: { replace(url: string): void };
	close(): void;
};

export async function shareGameToDiscord(
	url: string,
	platform: SharePlatform,
	openWindow: () => DiscordWindow | null
): Promise<{ copied: boolean; opened: boolean }> {
	// Start copying while this page has focus, and reserve a tab during the click.
	// Waiting for the clipboard before window.open can trigger popup blocking.
	const copying = copyGameLink(url, platform);
	let popup: DiscordWindow | null = null;
	try {
		popup = openWindow();
		if (popup) popup.opener = null;
	} catch {
		popup?.close();
		popup = null;
	}
	const copied = await copying;
	if (!copied) {
		popup?.close();
		return { copied: false, opened: false };
	}
	if (!popup || popup.closed) return { copied: true, opened: false };
	try {
		popup.location.replace('https://discord.com/channels/@me');
		return { copied: true, opened: true };
	} catch {
		popup.close();
		return { copied: true, opened: false };
	}
}
