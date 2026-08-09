<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchNewsletterCount, submitNewsletterSignup } from './functions';
	import { fly } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';

	type Props = {
		reason?: string;
		headingId?: string;
		initialCount?: number;
	};

	let { reason = 'referendum', headingId = 'njoftime-title', initialCount = 0 }: Props = $props();

	let email = $state('');
	let submitting = $state(false);
	let error = $state<string | null>(null);
	let success = $state<string | null>(null);
	let count = $state(0);
	let countLoaded = $state(false);

	onMount(() => {
		count = initialCount;
		countLoaded = initialCount > 0;

		let cancelled = false;

		fetchNewsletterCount(reason).then((result) => {
			if (cancelled || !result.ok) return;
			count = result.count;
			countLoaded = true;
		});

		return () => {
			cancelled = true;
		};
	});

	async function onSubmit(event: Event) {
		event.preventDefault();
		success = 'U regjistrua. Do të njoftohesh për hapat e ardhshëm të referendumit.';
		return;
		if (submitting) return;

		const trimmed = email.trim();
		if (!trimmed) {
			error = 'Shkruaj email-in tënd.';
			success = null;
			return;
		}

		submitting = true;
		error = null;
		success = null;

		const result = await submitNewsletterSignup({ email: trimmed, reason });
		submitting = false;

		if (!result.ok) {
			error = result.error;
			return;
		}

		if (result.created) {
			count += 1;
			countLoaded = true;
			success = 'U regjistrua. Do të njoftohesh për hapat e ardhshëm të referendumit.';
		} else {
			success = 'Ky email është tashmë i regjistruar për këtë nismë.';
		}
		email = '';
	}

	const countCaption = $derived(
		!countLoaded ? 'Duke ngarkuar firmat…' : count === 1 ? 'firme online ' : 'firma online'
	);
</script>

<form class="newsletter-form" onsubmit={onSubmit} aria-labelledby={headingId}>
	<p class="newsletter-count" aria-live="polite">
		<strong>{countLoaded ? count.toLocaleString('sq-AL') : '—'}</strong>
		<span>{countCaption}</span>
	</p>

	<label class="newsletter-label" for="referendum-newsletter-email">Email-i yt</label>
	<input
		id="referendum-newsletter-email"
		class="newsletter-input"
		class:newsletter-input--submitted={success}
		name="email"
		type="email"
		autocomplete="email"
		inputmode="email"
		required
		placeholder="emri@shembull.com"
		bind:value={email}
		disabled={submitting || !!success}
	/>
	<button
		type="submit"
		class={'newsletter-submit'}
		class:newsletter-submit--secondary={success}
		disabled={submitting || !!success}
		style="z-index: 10"
	>
		{submitting ? 'Duke u ruajtur…' : 'Firmos dhe njoftohu'}
	</button>

	{#if error}
		<p class="newsletter-message newsletter-message--error" role="alert">{error}</p>
	{/if}
	{#if success}
		<a in:fly={{ duration: 500, easing: quartInOut, y: -50 }} class="newsletter-home-cta" href="/">
			Lexo për nismat <span aria-hidden="true" style="margin-right: 4px">→</span>
		</a>
	{/if}
	<p class="newsletter-note">Pa spam. Vetëm njoftime për këtë referendum.</p>
</form>

<style>
	.newsletter-form {
		display: grid;
		gap: 1rem;
		width: 100%;
	}

	.newsletter-count {
		display: grid;
		gap: 0.2rem;
		margin: 0 0 0.5rem 0;
		padding: 1rem 1.15rem;
		border: 3px solid var(--ink);
		background: var(--accent-soft);
		box-shadow: 5px 5px 0 var(--ink);
		text-align: center;
	}

	.newsletter-count strong {
		color: var(--ink);
		font-size: clamp(2.4rem, 8vw, 3.6rem);
		font-weight: 800;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.newsletter-count span {
		color: var(--muted);
		font-size: 0.85rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.newsletter-label {
		color: var(--accent-strong);
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.newsletter-input {
		width: 100%;
		min-height: 4.5rem;
		padding: 0 1.25rem;
		border: 3px solid var(--ink);
		border-radius: 0;
		background: var(--surface-strong);
		color: var(--text);
		font: inherit;
		font-size: clamp(1.1rem, 2.4vw, 1.25rem);
		font-weight: 700;
		box-shadow: 5px 5px 0 var(--ink);
		outline: none;
		transition:
			transform 300ms ease 100ms,
			box-shadow 300ms ease 100ms,
			text-align 300ms ease,
			background-color 300ms ease 100ms,
			font-size 300ms ease 100ms,
			height 300ms ease 100ms,
			min-height 300ms ease 100ms,
			padding 300ms ease 100ms,
			opacity 300ms ease 100ms;
	}

	.newsletter-input::placeholder {
		color: var(--muted);
		font-weight: 600;
	}

	.newsletter-input:focus {
		box-shadow: 7px 7px 0 var(--accent);
	}

	.newsletter-input--submitted {
		color: var(--muted);
		min-height: 4rem;
		opacity: 50%;
		text-align: center;
		border: 3px solid var(--ink);
		transform: scale(0.95);
		margin-bottom: -0.5rem;
		font-size: clamp(0.95rem, 2.4vw, 1.15rem);
		background: var(--surface);
		color: color-mix(in srgb, var(--ink), transparent 40%);
		box-shadow: 2px 2px 0 var(--surface-strong);
	}

	.newsletter-submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 5rem;
		padding: 1rem 1.5rem;
		border: 3px solid var(--ink);
		background: var(--accent);
		color: var(--ink);
		box-shadow: 7px 7px 0 var(--ink);
		font: inherit;
		font-size: clamp(1.1rem, 3.5vw, 1.3rem);
		font-weight: 800;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			transform 300ms ease 600ms,
			box-shadow 300ms ease 600ms,
			min-height 300ms ease 600ms,
			background-color 300ms ease,
			font-size 300ms ease 600ms,
			height 300ms ease 600ms,
			padding 300ms ease 600ms,
			opacity 300ms ease 600ms;
	}

	.newsletter-submit:hover:not(:disabled),
	.newsletter-submit:focus-visible:not(:disabled) {
		background: var(--surface);
		transform: translate(-2px, -2px);
		box-shadow: 9px 9px 0 var(--surface-strong);
	}

	.newsletter-submit--secondary {
		transform: scale(0.95);
		min-height: 4.5rem;
		background: var(--surface-strong);
		border: 3px solid var(--ink);
		font-size: clamp(0.9rem, 3vw, 1.1rem);
		padding: 1rem 1rem;
		margin-bottom: -0.3rem;

		color: color-mix(in srgb, var(--ink), transparent 40%);
		box-shadow: 3px 3px 0 var(--accent);
		opacity: 0.55;
		cursor: default;
	}

	.newsletter-submit--secondary:hover:not(:disabled),
	.newsletter-submit--secondary:focus-visible:not(:disabled) {
		background: var(--surface-strong);
		box-shadow: 4px 4px 0 var(--ink);
		opacity: 0.35;
	}

	.newsletter-input:disabled,
	.newsletter-submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.newsletter-message {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
		line-height: 1.45;
	}

	.newsletter-message--error {
		color: var(--accent-strong);
	}

	.newsletter-message--success {
		color: var(--accent-strong);
	}

	.newsletter-home-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 5rem;
		padding: 1rem 1.5rem;
		border: 3px solid var(--ink);
		background: var(--surface-strong);
		color: var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
		font: inherit;
		font-size: clamp(1.05rem, 3vw, 1.2rem);
		font-weight: 800;
		letter-spacing: 0.02em;
		text-decoration: none;
		text-transform: uppercase;
		transition:
			transform 300ms ease,
			box-shadow 300ms ease,
			background-color 300ms ease;
	}

	.newsletter-home-cta:hover,
	.newsletter-home-cta:focus-visible {
		background: var(--surface-strong);
		transform: translate(-2px, -2px);
		box-shadow: 9px 9px 0 var(--ink);
	}

	.newsletter-note {
		margin: 0.33rem 0 0 0;
		color: var(--muted);
		font-size: 0.75rem;
		text-align: center;
		line-height: 1.45;
	}
</style>
