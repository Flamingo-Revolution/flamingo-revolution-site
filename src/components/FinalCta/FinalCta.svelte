<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description: string;
		prefix?: Snippet;
		children?: Snippet;
		headingId?: string;
		class?: string;
	};

	let {
		title,
		description,
		prefix,
		children,
		headingId = 'final-cta-heading',
		class: className = ''
	}: Props = $props();
</script>

<section class={['final-cta', className]} aria-labelledby={headingId}>
	{@render prefix?.()}

	<div class="final-cta__inner">
		<h2 id={headingId}>{title}</h2>
		<p>{description}</p>
		{#if children}
			<div class="final-cta__actions">
				{@render children()}
			</div>
		{/if}
	</div>
</section>

<style>
	.final-cta {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		padding: clamp(2.6rem, 7vw, 4.8rem) 1.25rem;
		border-top: 4px solid var(--ink);
		background: var(--accent);
		color: var(--ink);
		text-align: center;
	}

	:global(.final-cta__deco) {
		pointer-events: none;
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			-45deg,
			transparent,
			transparent 11px,
			color-mix(in srgb, var(--ink) 10%, transparent) 11px,
			color-mix(in srgb, var(--ink) 10%, transparent) 13px
		);
	}

	:global(.final-cta__rule) {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 0.55rem;
		background: var(--ink);
	}

	:global(.final-cta__stamp) {
		position: absolute;
		top: 1.15rem;
		right: 1.2rem;
		padding: 0.38rem 0.58rem;
		color: var(--paper);
		border: 3px solid var(--paper);
		background: var(--ink);
		box-shadow: 2px 2px 0 color-mix(in srgb, var(--paper), transparent 50%);
		font-family: var(--font-body);
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		line-height: 1;
		text-transform: uppercase;
		transform: rotate(7deg);
	}

	.final-cta__inner {
		position: relative;
		z-index: 1;
		display: grid;
		justify-items: center;
		gap: 0.9rem;
		width: min(100%, 42rem);
		margin-inline: auto;
	}

	h2 {
		margin: 0;
		max-width: 16ch;
		font-family: var(--font-body);
		font-size: clamp(1.9rem, 4.8vw, 3.15rem);
		font-weight: 800;
		line-height: 0.94;
		letter-spacing: -0.045em;
		text-wrap: balance;
	}

	p {
		margin: 0;
		max-width: 36rem;
		font-size: clamp(1rem, 1.7vw, 1.12rem);
		font-weight: 650;
		line-height: 1.5;
		text-wrap: pretty;
	}

	.final-cta__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		margin-top: 0.7rem;
	}

	.final-cta__actions :global(a),
	.final-cta__actions :global(button) {
		min-height: 3.15rem;
		padding-inline: 1.2rem;
	}

	@media (max-width: 640px) {
		.final-cta__stamp {
			top: 0.7rem;
			right: 0.7rem;
			transform: rotate(5deg) scale(0.92);
		}

		.final-cta__actions :global(a),
		.final-cta__actions :global(button) {
			flex: 1 1 12rem;
		}
	}
</style>
