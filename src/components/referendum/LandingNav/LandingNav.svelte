<script lang="ts">
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { MediaQuery } from "svelte/reactivity";
	import {
		SCROLL_MARGIN_PX,
		SPY_UNLOCK_DELAY_MS,
		getSignupTarget,
		resolveActiveSectionHref,
		resolveSectionElements,
		scrollToSignup as scrollToSignupTarget
	} from "./functions";

	const ENGAGE_HREF = "https://pershqiperine.netlify.app";

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
	let activeHref = $state<string | null>(null);

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

	onMount(() => {
		const cleanups: Array<() => void> = [];

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
		<div class="landing-nav__links">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={activeHref === link.href ? "true" : undefined}
					onclick={() => onNavClick(link.href)}
				>
					{link.label}
				</a>
			{/each}
		</div>

		<div class="landing-nav__ctas">
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
