<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchNewsletterCount, submitNewsletterSignup } from './functions';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import SuccessCheck from './components/SuccessCheck/SuccessCheck.svelte';

	type Props = {
		reason?: string;
		headingId?: string;
		initialCount?: number;
	};

	type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';
	type SuccessReveal = 'hidden' | 'cta';

	let { reason = 'referendum', headingId = 'njoftime-title', initialCount = 0 }: Props = $props();

	let email = $state('');
	let submissionState = $state<SubmissionState>('idle');
	let successReveal = $state<SuccessReveal>('hidden');
	let feedbackMessage = $state<string | null>(null);
	let count = $state(0);
	let countLoaded = $state(false);
	let confettiComponent = $state<Promise<typeof import('./components/SuccessConfetti/SuccessConfetti.svelte')> | null>(
		null
	);

	let errorResetTimer: ReturnType<typeof setTimeout> | null = null;
	let successRevealTimer: ReturnType<typeof setTimeout> | null = null;
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

	function clearSuccessRevealTimer() {
		if (successRevealTimer !== null) {
			clearTimeout(successRevealTimer);
			successRevealTimer = null;
		}
	}

	function revealSuccessFeedback() {
		if (submissionState !== 'success' || successReveal !== 'hidden') return;
		clearSuccessRevealTimer();
		successReveal = 'cta';
	}

	function startSuccessRevealFallback() {
		clearSuccessRevealTimer();
		successRevealTimer = setTimeout(() => {
			successRevealTimer = null;
			revealSuccessFeedback();
		}, 720);
	}

	function onSubmitButtonTransitionEnd(event: TransitionEvent) {
		if (event.propertyName !== 'width') return;
		revealSuccessFeedback();
	}

	function setError(message: string) {
		clearErrorResetTimer();
		clearSuccessRevealTimer();
		resumeIdleCta = false;
		submissionState = 'error';
		successReveal = 'hidden';
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
			clearSuccessRevealTimer();
		};
	});

	function onEmailInput() {
		if (submissionState === 'success' || submissionState === 'error') {
			resumeIdleCta = true;
		}
	}

	async function onSubmit(event: Event) {
		event.preventDefault();
		if (isSubmitting || isSuccess) return;

		const trimmed = email.trim();

		if (!trimmed) {
			setError('Shkruaj email-in tënd.');
			return;
		}

		clearErrorResetTimer();
		clearSuccessRevealTimer();
		resumeIdleCta = false;
		submissionState = 'submitting';
		successReveal = 'hidden';
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
		triggerConfetti();
		startSuccessRevealFallback();
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
	<div class={['newsletter-field', isSuccess && 'newsletter-field--success']}>
		<div class={['newsletter-input-shell', isSuccess && 'newsletter-input-shell--success']}>
			{#if isSuccess}
				<SuccessCheck />
			{/if}
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
				disabled={isSubmitting || isSuccess}
			/>
		</div>
		<button
			type="submit"
			class={{
				'newsletter-submit': true,
				'newsletter-submit--success': buttonFace === 'success',
				'newsletter-submit--error': buttonFace === 'error'
			}}
			disabled={isSubmitting || isSuccess}
			ontransitionend={onSubmitButtonTransitionEnd}
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
	</div>

	{#if submissionState === 'error' && feedbackMessage}
		<div
			class="newsletter-feedback newsletter-feedback--error"
			role="alert"
			in:fly={{ duration: 180, easing: cubicOut, y: 6 }}
		>
			<span class="newsletter-feedback__icon" aria-hidden="true">!</span>
			<p>{feedbackMessage}</p>
		</div>
	{:else if isSuccess && feedbackMessage && successReveal !== 'hidden'}
		<div
			class="newsletter-feedback newsletter-feedback--success"
			role="status"
			in:fly={{ duration: 180, easing: cubicOut, y: 8 }}
		>
			<span class="newsletter-feedback__icon newsletter-feedback__icon--calendar" aria-hidden="true">
				<svg viewBox="0 0 24 24">
					<rect
						x="3.5"
						y="5.5"
						width="17"
						height="15.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
					/>
					<path d="M3.5 10.5h17" fill="none" stroke="currentColor" stroke-width="2.2" />
					<path
						d="M8 3.5v4M16 3.5v4"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="square"
					/>
					<rect x="14" y="13.5" width="3.5" height="3.5" fill="currentColor" />
				</svg>
			</span>
			<p>{feedbackMessage}</p>
		</div>
		<a in:fly={{ duration: 200, easing: cubicOut, y: 8, delay: 40 }} class="newsletter-home-cta" href="/">
			Lexo për nismat <span aria-hidden="true" style="margin-right: 4px">→</span>
		</a>
	{/if}
	<p class="newsletter-note">Pa spam. Vetëm njoftime për këtë referendum.</p>
</form>

<style>

	:root {
		/*// declare destructive color*/
		--destructive: #ef5353;
	}

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

	.newsletter-field {
		position: relative;
		display: grid;
		gap: 1rem;
	}

	.newsletter-field--success {
		z-index: 2;
		margin-bottom: -1rem;
		transition: margin-bottom 180ms ease;
	}

	.newsletter-input-shell {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		width: 100%;
		min-height: 4.5rem;
		padding: 0 1.25rem 0 0.85rem;
		border: 3px solid var(--ink);
		border-radius: 0;
		background: var(--surface-strong);
		box-shadow: 5px 5px 0 var(--ink);
		transition:
			box-shadow 300ms ease 100ms,
			background-color 300ms ease 100ms;
	}

	.newsletter-input-shell:focus-within {
		box-shadow: 7px 7px 0 var(--accent);
	}

	.newsletter-input-shell--success {
		background: color-mix(in srgb, var(--surface-strong) 88%, var(--accent-soft));
	}

	.newsletter-input {
		flex: 1;
		min-width: 0;
		min-height: 4.5rem;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: clamp(1.1rem, 2.4vw, 1.25rem);
		font-weight: 700;
		box-shadow: none;
		outline: none;
	}

	.newsletter-input::placeholder {
		color: var(--muted);
		font-weight: 600;
	}

	.newsletter-submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		justify-self: end;
		interpolate-size: allow-keywords;
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
			font-size 280ms ease,
			padding 180ms ease,
			opacity 180ms ease,
			width 280ms ease,
			right 280ms ease,
			bottom 280ms ease,
			margin 280ms ease;
		transition-delay: 0ms;
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
		position: relative;
		z-index: 3;
		width: max-content;
		min-height: 0;
		padding: 0.34rem 0.8rem;
		margin: -1rem 1rem 0 0;
		background: var(--accent);
		border: 3px solid var(--ink);
		font-size: clamp(0.82rem, 3.5vw, 0.82rem);
		letter-spacing: 0.05em;
		line-height: 1.1;
		white-space: nowrap;
		color: var(--ink);
		box-shadow: 3px 3px 0 var(--ink);
		transform: translateY(-50%) rotate(-3.5deg);
		transition-delay: 380ms;
		cursor: default;
		pointer-events: none;
	}

	.newsletter-submit--error {
		background: color-mix(in srgb, var(--accent-strong) 28%, var(--surface-strong));
		border-color: var(--ink);
		box-shadow: 5px 5px 0 color-mix(in srgb, var(--ink), transparent 80%);
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

	.newsletter-field--success .newsletter-input:disabled {
		opacity: 1;
	}

	.newsletter-submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.newsletter-submit--success:disabled {
		opacity: 1;
		cursor: default;
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

	.newsletter-feedback__icon--calendar {
		width: auto;
		height: auto;
		padding: 0;
		border: 0;
		border-radius: 0;
		color: var(--accent-strong);
	}

	.newsletter-feedback__icon svg {
		display: block;
		width: 1.35rem;
		height: 1.35rem;
	}

	.newsletter-feedback--success {
		position: relative;
		z-index: 1;
		align-items: start;
		gap: 1.2rem;
		background: var(--accent-soft);
		color: var(--ink);
		border: 0;
		box-shadow: none;
	}

	.newsletter-feedback--error {
		background: color-mix(in srgb, var(--destructive) 16%, var(--surface-strong));
		color: var(--destructive);
		box-shadow: 4px 4px 0 color-mix(in srgb, var(--destructive) 65%, var(--ink));
		border: 3px solid var(--destructive);
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
