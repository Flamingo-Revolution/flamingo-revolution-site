<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { scale, type TransitionConfig } from 'svelte/transition';
	import { backOut, elasticOut } from 'svelte/easing';

	const prefersReducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');

	const checkIn = $derived(
		prefersReducedMotion.current
			? { duration: 0, start: 1 }
			: { duration: 380, start: 0.55, easing: backOut }
	);

	function springExpand(_node: Element, params: { delay?: number; duration?: number } = {}): TransitionConfig {
		if (prefersReducedMotion.current) {
			return { duration: 0, css: () => '' };
		}

		const delay = params.delay ?? 160;
		const duration = params.duration ?? 780;

		return {
			delay,
			duration,
			easing: elasticOut,
			css: (t) => `transform: scale(${0.62 + t * 0.38})`
		};
	}
</script>

<div class="success-check" transition:scale={checkIn} aria-hidden="true">
	<div class="success-check__spring" in:springExpand></div>
	<svg class="success-check__mark" viewBox="0 0 24 24">
		<path
			d="M4.8 12.4 9.7 17.2 19.2 6.6"
			fill="none"
			stroke="currentColor"
			stroke-width="3.4"
			stroke-linecap="square"
			stroke-linejoin="miter"
		/>
	</svg>
</div>

<style>
	.success-check {
		position: relative;
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: 1.85rem;
		height: 1.85rem;
		overflow: hidden;
		border: 0;
		background: color-mix(in srgb, var(--accent) 5%, transparent);
		color: var(--accent-strong);
		pointer-events: none;
	}

	.success-check__spring {
		position: absolute;
		inset: 0;
		background: color-mix(in srgb, var(--accent) 28%, transparent);
		transform-origin: center center;
	}

	.success-check__mark {
		position: relative;
		z-index: 1;
		width: 1.05rem;
		height: 1.05rem;
	}
</style>
