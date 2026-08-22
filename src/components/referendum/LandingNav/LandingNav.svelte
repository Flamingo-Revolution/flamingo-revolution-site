<script lang="ts">
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { MediaQuery } from "svelte/reactivity";
	import ScrollContainer from "@components/ScrollContainer/ScrollContainer.svelte";
	import { siteCopy } from "../../../data/site";
	import {
		SCROLL_MARGIN_PX,
		SPY_UNLOCK_DELAY_MS,
		getSignupTarget,
		resolveActiveSectionHref,
		resolveSectionElements,
		scrollToSignup as scrollToSignupTarget
	} from "./functions";

	const ENGAGE_HREF = "https://pershqiperine.netlify.app";
	const THEME_KEY = "flamingo-theme";
	const themeLabels = siteCopy.sq.theme;

	const links = [
		{ href: "#deklarata", label: "Deklarata" },
		{ href: "#pse-referendum", label: "Pse" },
		{ href: "#procesi", label: "Procesi" },
		{ href: "#si-nisi", label: "Si nisi" },
		{ href: "#dokumentimi", label: "Dosjet" },
		{ href: "#faq", label: "Pyetje" },
		{ href: "#vepro", label: "Vepro" }
	] as const;

	const prefersReducedMotion = new MediaQuery("(prefers-reduced-motion: reduce)");

	let showSignupCta = $state(false);
	let hideEngageCta = $state(false);
	let themePressed = $state(false);
	let activeHref = $state<string | null>(null);
	let linksEl: HTMLDivElement | undefined = $state();

	const slideDuration = $derived(prefersReducedMotion.current ? 0 : 220);

	let spyLocked = false;
	let unlockTimer: ReturnType<typeof setTimeout> | undefined;
	let scrollRaf = 0;
	let syncActiveFromDom: (() => void) | null = null;

	$effect(() => {
		if (showSignupCta) {
			hideEngageCta = true;
			return;
		}

		const timeout = window.setTimeout(() => {
			hideEngageCta = false;
		}, slideDuration);

		return () => window.clearTimeout(timeout);
	});

	$effect(() => {
		const href = activeHref;
		const container = linksEl;
		if (!href || !container) return;

		const activeLink = container.querySelector<HTMLAnchorElement>(
			`a[href="${CSS.escape(href)}"]`
		);
		activeLink?.scrollIntoView({
			behavior: prefersReducedMotion.current ? "instant" : "smooth",
			inline: "center",
			block: "nearest"
		});
	});

	function scheduleSpyUnlock() {
		window.clearTimeout(unlockTimer);
		const delay = prefersReducedMotion.current ? 50 : SPY_UNLOCK_DELAY_MS;
		unlockTimer = window.setTimeout(() => {
			spyLocked = false;
			syncActiveFromDom?.();
		}, delay);
	}

	function lockSpy(href: string) {
		activeHref = href;
		spyLocked = true;
		scheduleSpyUnlock();
	}

	function onNavClick(href: string) {
		lockSpy(href);
	}

	function onWindowScroll() {
		if (spyLocked) {
			// Keep the clicked section highlighted until scrolling goes quiet.
			scheduleSpyUnlock();
			return;
		}

		if (scrollRaf) return;
		scrollRaf = requestAnimationFrame(() => {
			scrollRaf = 0;
			syncActiveFromDom?.();
		});
	}

	function scrollToSignup() {
		scrollToSignupTarget(prefersReducedMotion.current);
	}

	function applyTheme(theme: "light" | "dark") {
		document.documentElement.dataset.theme = theme;
		document.body?.setAttribute("data-theme", theme);
		const themeMeta = document.querySelector('meta[name="theme-color"]');
		if (themeMeta instanceof HTMLMetaElement) {
			themeMeta.content = theme === "dark" ? "#08131d" : "#edf6ff";
		}
		themePressed = theme === "dark";
	}

	function toggleTheme() {
		const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
		localStorage.setItem(THEME_KEY, nextTheme);
		applyTheme(nextTheme);
	}

	onMount(() => {
		const cleanups: Array<() => void> = [];
		themePressed = document.documentElement.dataset.theme === "dark";

		const signupTarget = getSignupTarget();
		if (signupTarget) {
			const signupObserver = new IntersectionObserver(
				([entry]) => {
					if (!entry) return;
					// Past (above) the viewport — not merely off-screen below.
					showSignupCta = !entry.isIntersecting && entry.boundingClientRect.top < 0;
				},
				{ threshold: 0 }
			);

			signupObserver.observe(signupTarget);
			cleanups.push(() => signupObserver.disconnect());
		}

		const sections = resolveSectionElements(links.map((link) => link.href));

		if (sections.length > 0) {
			const syncActive = () => {
				if (spyLocked) return;

				activeHref = resolveActiveSectionHref(sections, {
					scrollY: window.scrollY,
					viewportHeight: window.innerHeight,
					scrollHeight: document.documentElement.scrollHeight
				});
			};

			syncActiveFromDom = syncActive;

			const sectionObserver = new IntersectionObserver(
				() => {
					if (!spyLocked) syncActive();
				},
				{
					rootMargin: `-${SCROLL_MARGIN_PX}px 0px 0px 0px`,
					threshold: [0, 0.25, 0.5, 0.75, 1]
				}
			);

			for (const section of sections) {
				sectionObserver.observe(section);
			}

			syncActive();

			cleanups.push(() => {
				sectionObserver.disconnect();
				syncActiveFromDom = null;
			});
		}

		return () => {
			window.clearTimeout(unlockTimer);
			if (scrollRaf) cancelAnimationFrame(scrollRaf);
			for (const cleanup of cleanups) cleanup();
		};
	});
</script>

<svelte:window onscroll={onWindowScroll} />

<nav
	class={["landing-nav", hideEngageCta && "landing-nav--signup-cta"]}
	aria-label="Seksionet e faqes"
>
	<div class="shell landing-nav__inner">
		<ScrollContainer
			class="landing-nav__links"
			viewportClass="landing-nav__links-track"
			fadeColor="var(--surface)"
			bind:element={linksEl}
		>
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={activeHref === link.href ? "true" : undefined}
					onclick={() => onNavClick(link.href)}
				>
					{link.label}
				</a>
			{/each}
		</ScrollContainer>

		<div class="landing-nav__ctas">
			<button
				class="theme-toggle"
				type="button"
				aria-label={themeLabels.button}
				title={themeLabels.button}
				aria-pressed={themePressed ? "true" : "false"}
				onclick={toggleTheme}
			>
				<span class="theme-toggle__icon" aria-hidden="true">
					<svg class="theme-toggle__icon-sun" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="4.6" fill="currentColor" />
						<g stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
							<path
								d="M12 2.5v2.6M12 18.9v2.6M4.2 12H1.6M22.4 12h-2.6M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8"
							/>
						</g>
					</svg>
					<svg class="theme-toggle__icon-moon" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M20.6 14.7A8.6 8.6 0 1 1 9.3 3.4a7 7 0 1 0 11.3 11.3Z"
						/>
					</svg>
				</span>
			</button>

			<a
				class="landing-nav__cta landing-nav__cta--engage"
				href={ENGAGE_HREF}
				target="_blank"
				rel="noreferrer"
			>
				Angazhohu
			</a>

			{#if showSignupCta}
				<button
					type="button"
					class="landing-nav__cta landing-nav__cta--signup"
					transition:slide={{ axis: "x", duration: slideDuration }}
					onclick={scrollToSignup}
				>
					Firmos & njoftohu
				</button>
			{/if}
		</div>
	</div>
</nav>
