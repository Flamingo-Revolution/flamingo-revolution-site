/** Matches `.statement-section` / `.reasons-section` / etc. `scroll-margin: 6rem`. */
export const SCROLL_MARGIN_PX = 96;
export const SPY_UNLOCK_DELAY_MS = 160;

export type ScrollMetrics = {
	scrollY: number;
	viewportHeight: number;
	scrollHeight: number;
};

/** Resolve section elements from nav link hrefs like `#deklarata`. */
export function resolveSectionElements(hrefs: readonly string[]): HTMLElement[] {
	return hrefs
		.map((href) => document.getElementById(href.startsWith("#") ? href.slice(1) : href))
		.filter((el): el is HTMLElement => el !== null);
}

/**
 * Pick the active section href from current scroll metrics and section geometry.
 * Prefers near-bottom visibility, then fully-visible short sections, then the
 * section crossed by the scroll-margin line.
 */
export function resolveActiveSectionHref(
	sections: readonly HTMLElement[],
	{ scrollY, viewportHeight, scrollHeight }: ScrollMetrics,
	scrollMarginPx = SCROLL_MARGIN_PX
): string | null {
	const nearBottom = scrollY + viewportHeight >= scrollHeight - 8;

	// Bottom of the page: last section often never reaches the scroll-margin line.
	if (nearBottom) {
		for (let i = sections.length - 1; i >= 0; i--) {
			const section = sections[i];
			if (!section) continue;
			const rect = section.getBoundingClientRect();
			if (rect.top < viewportHeight && rect.bottom > scrollMarginPx) {
				return `#${section.id}`;
			}
		}
	}

	let marked: HTMLElement | null = null;
	let fullyVisible: HTMLElement | null = null;

	for (const section of sections) {
		const rect = section.getBoundingClientRect();

		if (rect.top <= scrollMarginPx && rect.bottom > scrollMarginPx) {
			marked = section;
		}

		// Fully on-screen below the scroll-margin line (short end sections like Vepro).
		if (rect.top >= scrollMarginPx && rect.bottom <= viewportHeight) {
			fullyVisible = section;
		}
	}

	const current = fullyVisible ?? marked;
	return current ? `#${current.id}` : null;
}

export function getSignupTarget(): Element | null {
	return document.querySelector(".hero-signup") ?? document.getElementById("njoftime");
}

/** Scroll to the hero signup and focus the email field. */
export function scrollToSignup(reducedMotion: boolean): void {
	const target = getSignupTarget();
	if (target instanceof HTMLElement) {
		target.scrollIntoView({
			behavior: reducedMotion ? "auto" : "smooth",
			block: "center"
		});
	}

	const focusInput = () => {
		document.getElementById("referendum-newsletter-email")?.focus({ preventScroll: true });
	};

	if (reducedMotion) {
		focusInput();
	} else {
		window.setTimeout(focusInput, 350);
	}
}
