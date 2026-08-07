<script lang="ts">
	import { submitNewsletterSignup } from "./functions";

	type Props = {
		reason?: string;
		headingId?: string;
	};

	let { reason = "referendum", headingId = "njoftime-title" }: Props = $props();

	let email = $state("");
	let submitting = $state(false);
	let error = $state<string | null>(null);
	let success = $state<string | null>(null);

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

		success = result.created
			? "U regjistrua. Do të njoftohesh për hapat e ardhshëm të referendumit."
			: "Ky email është tashmë i regjistruar për këtë nismë.";
		email = "";
	}
</script>

<form class="newsletter-form" onsubmit={onSubmit} aria-labelledby={headingId}>
	<label class="newsletter-label" for="referendum-newsletter-email">Email</label>
	<div class="newsletter-row">
		<input
			id="referendum-newsletter-email"
			name="email"
			type="email"
			autocomplete="email"
			inputmode="email"
			required
			placeholder="emri@shembull.com"
			bind:value={email}
			disabled={submitting}
		/>
		<button type="submit" class="button button-primary" disabled={submitting}>
			{submitting ? "Duke u ruajtur…" : "Njoftomë"}
		</button>
	</div>
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
		gap: 12px;
		max-width: 520px;
	}

	.newsletter-label {
		font: 500 9px/1 var(--mono, monospace);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #c0cbc7;
	}

	.newsletter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.newsletter-row input {
		flex: 1 1 220px;
		min-height: 54px;
		padding: 0 16px;
		border: 1px solid rgba(255, 255, 255, 0.34);
		border-radius: 0;
		background: transparent;
		color: var(--white, #fffdf8);
		outline: none;
	}

	.newsletter-row input::placeholder {
		color: #8a9a94;
	}

	.newsletter-row input:focus {
		box-shadow: 0 0 0 3px rgba(242, 99, 85, 0.35);
		border-color: var(--coral, #f26355);
	}

	.newsletter-row input:disabled,
	.newsletter-row button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.newsletter-row :global(.button) {
		display: inline-flex;
		min-height: 54px;
		align-items: center;
		justify-content: center;
		gap: 22px;
		padding: 0 24px;
		border: 1px solid transparent;
		text-decoration: none;
		font: 500 10px/1 var(--mono, monospace);
		letter-spacing: 0.055em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;
	}

	.newsletter-row :global(.button-primary) {
		background: var(--coral, #f26355);
		color: #111b18;
	}

	.newsletter-row :global(.button-primary:hover:not(:disabled)) {
		background: #ff7869;
		transform: translateY(-2px);
	}

	.newsletter-message {
		margin: 0;
		font-size: 14px;
		line-height: 1.5;
	}

	.newsletter-message--error {
		color: #ffb4ab;
	}

	.newsletter-message--success {
		color: var(--mint, #d9eee8);
	}

	.newsletter-note {
		margin: 0;
		color: #93a49d;
		font-size: 12px;
		line-height: 1.5;
	}

	@media (max-width: 560px) {
		.newsletter-row :global(.button) {
			width: 100%;
		}
	}
</style>
