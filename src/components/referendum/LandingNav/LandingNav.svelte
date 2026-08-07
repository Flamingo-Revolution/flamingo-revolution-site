<script lang="ts">
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { MediaQuery } from "svelte/reactivity";

	const ENGAGE_HREF = "https://pershqiperine.netlify.app";

	const links = [
		{ href: "#deklarata", label: "Deklarata" },
		{ href: "#pse-referendum", label: "Pse" },
		{ href: "#procesi", label: "Procesi" },
		{ href: "#si-nisi", label: "Si nisi" },
		{ href: "#faq", label: "Pyetje" },
		{ href: "#vepro", label: "Vepro" }
	] as const;

	const prefersReducedMotion = new MediaQuery("(prefers-reduced-motion: reduce)");

	let showSignupCta = $state(false);

	const slideDuration = $derived(prefersReducedMotion.current ? 0 : 220);

	function scrollToSignup() {
		const target =
			document.querySelector<HTMLElement>(".hero-signup") ??
			document.getElementById("njoftime");
		target?.scrollIntoView({
			behavior: prefersReducedMotion.current ? "auto" : "smooth",
			block: "center"
		});

		const focusInput = () => {
			document.getElementById("referendum-newsletter-email")?.focus({ preventScroll: true });
		};

		if (prefersReducedMotion.current) {
			focusInput();
		} else {
			window.setTimeout(focusInput, 350);
		}
	}

	onMount(() => {
		const target =
			document.querySelector(".hero-signup") ?? document.getElementById("njoftime");
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry) return;
				// Past (above) the viewport — not merely off-screen below.
				showSignupCta = !entry.isIntersecting && entry.boundingClientRect.top < 0;
			},
			{ threshold: 0 }
		);

		observer.observe(target);
		return () => observer.disconnect();
	});
</script>

<nav class="landing-nav" aria-label="Seksionet e faqes">
	<div class="shell landing-nav__inner">
		<div class="landing-nav__links">
			{#each links as link (link.href)}
				<a href={link.href}>{link.label}</a>
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
