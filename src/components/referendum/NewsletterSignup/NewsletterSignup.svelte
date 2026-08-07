<script lang="ts">
	import { onMount } from "svelte";
	import { fetchNewsletterCount, submitNewsletterSignup } from "./functions";

	type Props = {
		reason?: string;
		headingId?: string;
		initialCount?: number;
	};

	let {
		reason = "referendum",
		headingId = "njoftime-title",
		initialCount = 0
	}: Props = $props();

	let email = $state("");
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
		if (submitting) return;

		const trimmed = email.trim();
		if (!trimmed) {
			error = "Shkruaj email-in tënd.";
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
			success = "U regjistrua. Do të njoftohesh për hapat e ardhshëm të referendumit.";
		} else {
			success = "Ky email është tashmë i regjistruar për këtë nismë.";
		}
		email = "";
	}

	const countCaption = $derived(
		!countLoaded ? "Duke ngarkuar…" : count === 1 ? "person i regjistruar" : "persona të regjistruar"
	);
</script>

<form class="newsletter-form" onsubmit={onSubmit} aria-labelledby={headingId}>
	<p class="newsletter-count" aria-live="polite">
		<strong>{countLoaded ? count.toLocaleString("sq-AL") : "—"}</strong>
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
		disabled={submitting}
	/>
	<button type="submit" class="newsletter-submit" disabled={submitting}>
		{submitting ? "Duke u ruajtur…" : "Njoftomë"}
	</button>

	{#if error}
		<p class="newsletter-message newsletter-message--error" role="alert">{error}</p>
	{/if}
	{#if success}
		<p class="newsletter-message newsletter-message--success" role="status">{success}</p>
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
		margin: 0;
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
		font-size: 0.9rem;
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
		font-size: clamp(1.15rem, 2.4vw, 1.45rem);
		font-weight: 700;
		box-shadow: 5px 5px 0 var(--ink);
		outline: none;
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
		font-size: clamp(1.35rem, 3.5vw, 2rem);
		font-weight: 800;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			background-color 160ms ease;
	}

	.newsletter-submit:hover:not(:disabled),
	.newsletter-submit:focus-visible:not(:disabled) {
		background: var(--surface-strong);
		transform: translate(-2px, -2px);
		box-shadow: 9px 9px 0 var(--ink);
	}

	.newsletter-input:disabled,
	.newsletter-submit:disabled {
		opacity: 0.7;
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

	.newsletter-note {
		margin: 0;
		color: var(--muted);
		font-size: 0.95rem;
		line-height: 1.45;
	}
</style>
