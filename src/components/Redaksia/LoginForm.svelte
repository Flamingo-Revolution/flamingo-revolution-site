<script lang="ts">
	import { login, type PublicReporter } from './functions';

	type Props = {
		onLogin: (reporter: PublicReporter) => void;
	};

	let { onLogin }: Props = $props();

	let accessKey = $state('');
	let submitting = $state(false);
	let error = $state<string | null>(null);

	async function onSubmit(event: Event) {
		event.preventDefault();
		const key = accessKey.trim();
		if (!key || submitting) return;

		submitting = true;
		error = null;

		try {
			const reporter = await login(key);
			accessKey = '';
			onLogin(reporter);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Hyrja dështoi.';
		} finally {
			submitting = false;
		}
	}
</script>

<form class="login" onsubmit={onSubmit}>
	<p class="login__eyebrow">Vetëm për reporterët</p>
	<h2>Hyni në redaksi</h2>
	<p class="login__lead">
		Shkrimi i artikujve është i hapur vetëm për reporterët e miratuar. Vendosni çelësin tuaj të aksesit për të vazhduar.
	</p>

	<label class="login__label" for="reporter-access-key">Çelësi i aksesit</label>
	<input
		id="reporter-access-key"
		type="password"
		autocomplete="current-password"
		placeholder="ft_…"
		bind:value={accessKey}
		disabled={submitting}
	/>

	{#if error}
		<p class="login__error" role="alert">{error}</p>
	{/if}

	<button class="button button--primary" type="submit" disabled={submitting || !accessKey.trim()}>
		{submitting ? 'Duke hyrë…' : 'Hyr'}
	</button>
</form>

<style>
	.login {
		max-width: 30rem;
		margin: 3rem auto;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 8px 8px 0 var(--ink);
	}

	.login__eyebrow {
		margin: 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.05rem;
		color: var(--accent-strong);
	}

	h2 {
		margin: 0;
		font-size: 1.7rem;
	}

	.login__lead {
		margin: 0;
		color: var(--muted);
		line-height: 1.5;
	}

	.login__label {
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent-strong);
	}

	input {
		height: 3.15rem;
		padding: 0 0.9rem;
		font: inherit;
		color: var(--text);
		background: var(--surface-strong);
		border: 2px solid var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
	}

	input::placeholder {
		color: var(--muted);
	}

	input:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: 2px;
	}

	.login__error {
		margin: 0;
		font-weight: 700;
		color: var(--accent-strong);
	}
</style>
