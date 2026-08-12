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

	type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

	let { reason = 'referendum', headingId = 'njoftime-title', initialCount = 0 }: Props = $props();

	let email = $state('');
	let submissionState = $state<SubmissionState>('idle');
	let feedbackMessage = $state<string | null>(null);
	let count = $state(0);
	let countLoaded = $state(false);
	let confettiComponent = $state<Promise<typeof import('./components/SuccessConfetti/SuccessConfetti.svelte')> | null>(
		null
	);

	let errorResetTimer: ReturnType<typeof setTimeout> | null = null;
	let resumeIdleCta = $state(false);
	const isSubmitting = $derived(submissionState === 'submitting');
	const isSuccess = $derived(submissionState === 'success');
	const buttonFace = $derived(
		isSubmitting ? 'submitting' : resumeIdleCta ? 'idle' : submissionState
	);

	function clearErrorResetTimer() {
		if (errorResetTimer !== null) {
			clearTimeout(errorResetTimer);
			errorResetTimer = null;
		}
	}

	function setError(message: string) {
		clearErrorResetTimer();
		resumeIdleCta = false;
		submissionState = 'error';
		feedbackMessage = message;
		errorResetTimer = setTimeout(() => {
			if (submissionState === 'error') {
				submissionState = 'idle';
				feedbackMessage = null;
			}
			errorResetTimer = null;
		}, 3000);
	}

	function triggerConfetti() {
		confettiComponent ??= import('./components/SuccessConfetti/SuccessConfetti.svelte');
	}

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
			clearErrorResetTimer();
		};
	});

	function onEmailInput() {
		if (submissionState === 'success' || submissionState === 'error') {
			resumeIdleCta = true;
		}
	}

	async function onSubmit(event: Event) {
		event.preventDefault();
		if (isSubmitting) return;

		const trimmed = email.trim();

		if (!trimmed) {
			setError('Shkruaj email-in tënd.');
			return;
		}

		clearErrorResetTimer();
		resumeIdleCta = false;
		submissionState = 'submitting';
		feedbackMessage = null;
		confettiComponent = null;

		const result = await submitNewsletterSignup({ email: trimmed, reason });

		if (!result.ok) {
			setError(result.error);
			return;
		}

		if (!result.created) {
			setError('Ky email është tashmë i regjistruar për këtë nismë.');
			email = '';
			return;
		}

		count += 1;
		countLoaded = true;
		submissionState = 'success';
		feedbackMessage = 'Do të njoftohesh për hapat e ardhshëm të referendumit.';
		email = '';
		triggerConfetti();
	}

	const countCaption = $derived(
		!countLoaded ? 'Duke ngarkuar firmat…' : count === 1 ? 'firme online ' : 'firma online'
	);
</script>

{#if confettiComponent}
	{#await confettiComponent then { default: SuccessConfetti }}
		<SuccessConfetti />
	{/await}
{/if}

<form class="newsletter-form" onsubmit={onSubmit} aria-labelledby={headingId}>
	<p class="newsletter-count" aria-live="polite">
		<strong>{countLoaded ? count.toLocaleString('sq-AL') : '—'}</strong>
		<span>{countCaption}</span>
	</p>

	<label class="newsletter-label" for="referendum-newsletter-email">Email-i yt</label>
	<input
		id="referendum-newsletter-email"
		class="newsletter-input"
		name="email"
		type="email"
		autocomplete="email"
		inputmode="email"
		required
		placeholder="emri@shembull.com"
		bind:value={email}
		oninput={onEmailInput}
		disabled={isSubmitting}
	/>
	<button
		type="submit"
		class={{
			'newsletter-submit': true,
			'newsletter-submit--success': buttonFace === 'success',
			'newsletter-submit--error': buttonFace === 'error'
		}}
		disabled={isSubmitting}
	>
		{#if buttonFace === 'submitting'}
			Duke u ruajtur…
		{:else if buttonFace === 'success'}
			U regjistrua!
		{:else if buttonFace === 'error'}
			Provo përsëri
		{:else}
			Firmos dhe njoftohu
		{/if}
	</button>

	{#if submissionState === 'error' && feedbackMessage}
		<div
			class="newsletter-feedback newsletter-feedback--error"
			role="alert"
			in:fly={{ duration: 280, easing: quartInOut, y: 12 }}
		>
			<span class="newsletter-feedback__icon" aria-hidden="true">!</span>
			<p>{feedbackMessage}</p>
		</div>
	{:else if isSuccess && feedbackMessage}
		<div
			class="newsletter-feedback newsletter-feedback--success"
			role="status"
			in:fly={{ duration: 340, easing: quartInOut, y: 14 }}
		>
			<span class="newsletter-feedback__icon" aria-hidden="true">✓</span>
			<p>{feedbackMessage}</p>
		</div>
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
			transform 120ms ease,
			box-shadow 120ms ease,
			background-color 120ms ease,
			border-color 120ms ease,
			color 120ms ease,
			min-height 180ms ease,
			font-size 180ms ease,
			padding 180ms ease,
			opacity 180ms ease;
	}

	.newsletter-submit:hover:not(:disabled),
	.newsletter-submit:focus-visible:not(:disabled) {
		background: color-mix(in srgb, var(--accent) 55%, var(--accent-strong));
		transform: translate(-4px, -4px);
		box-shadow: 12px 12px 0 var(--ink);
	}

	.newsletter-submit:active:not(:disabled) {
		transform: translate(-1px, -1px);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.newsletter-submit--success {
		transform: scale(0.95);
		min-height: 4.5rem;
		background: var(--accent);
		border: 3px solid var(--ink);
		font-size: clamp(0.9rem, 3vw, 1.1rem);
		padding: 1rem 1rem;
		margin-bottom: -0.3rem;
		color: var(--ink);
		box-shadow: 5px 5px 0 var(--ink);
		cursor: pointer;
	}

	.newsletter-submit--success:hover:not(:disabled),
	.newsletter-submit--success:focus-visible:not(:disabled) {
		background: color-mix(in srgb, var(--accent) 45%, var(--accent-strong));
		transform: translate(-4px, -4px);
		box-shadow: 12px 12px 0 var(--ink);
	}

	.newsletter-submit--success:active:not(:disabled) {
		transform: translate(-1px, -1px);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.newsletter-submit--error {
		background: color-mix(in srgb, var(--accent-strong) 28%, var(--surface-strong));
		border-color: var(--accent-strong);
		box-shadow: 7px 7px 0 color-mix(in srgb, var(--accent-strong) 65%, var(--ink));
	}

	.newsletter-submit--error:hover:not(:disabled),
	.newsletter-submit--error:focus-visible:not(:disabled) {
		background: color-mix(in srgb, var(--accent-strong) 18%, var(--surface));
		box-shadow: 9px 9px 0 color-mix(in srgb, var(--accent-strong) 55%, var(--ink));
	}

	.newsletter-input:disabled {
		opacity: 0.72;
		cursor: default;
	}

	.newsletter-submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.newsletter-feedback {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0.85rem;
		margin: 0;
		padding: 0.9rem 1rem;
		border: 3px solid var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.newsletter-feedback p {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.35;
	}

	.newsletter-feedback__icon {
		display: inline-grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: 2px solid currentColor;
		border-radius: 50%;
		font-size: 1rem;
		font-weight: 900;
		line-height: 1;
	}

	.newsletter-feedback--success {
		background: var(--accent-soft);
		color: var(--ink);
	}

	.newsletter-feedback--error {
		background: color-mix(in srgb, var(--accent-strong) 16%, var(--surface-strong));
		color: var(--accent-strong);
		box-shadow: 4px 4px 0 color-mix(in srgb, var(--accent-strong) 65%, var(--ink));
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
