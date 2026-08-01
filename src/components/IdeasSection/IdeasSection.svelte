<script lang="ts">
	import { ideasPageCopy } from "../../data/ideas";
	import type { Locale } from "../../data/site";
	import IdeaEntry from "./components/IdeaEntry/IdeaEntry.svelte";
	import {
		fetchIdeas,
		IdeasSort,
		resolveFingerprint,
		submitIdea,
		updateIdeaName,
		type PublicIdea,
	} from "./functions";

	type IdeasCopy = (typeof ideasPageCopy)[Locale];

	type Props = {
		copy: IdeasCopy;
	};

	let { copy }: Props = $props();

	let fingerprint = $state<string | null>(null);

	let ideas = $state<PublicIdea[]>([]);
	let sort = $state(IdeasSort.Popular);
	let approvedCount = $state(0);
	let draft = $state("");
	let submitting = $state(false);
	let submitError = $state<string | null>(null);
	let dialogEl = $state<HTMLDialogElement | null>(null);
	let pendingIdeaId = $state<string | null>(null);
	let dialogName = $state("");
	let savingName = $state(false);

	let ideasPromise = $state(loadIdeas());

	const sortOptions = $derived([
		{ value: IdeasSort.Popular, label: copy.sortPopular },
		{ value: IdeasSort.Controversial, label: copy.sortControversial },
		{ value: IdeasSort.Newest, label: copy.sortNewest },
		{ value: IdeasSort.Oldest, label: copy.sortOldest },
	]);

	async function loadIdeas() {
		const fp = fingerprint ?? (await resolveFingerprint());
		fingerprint = fp;

		const data = await fetchIdeas(fp, sort);
		ideas = data.ideas;
		approvedCount = data.stats?.approved ?? data.ideas.length;
		return data;
	}

	async function refreshIdeas(nextSort: IdeasSort = sort) {
		try {
			const data = await fetchIdeas(fingerprint, nextSort);
			ideas = data.ideas;
			approvedCount = data.stats?.approved ?? data.ideas.length;
		} catch {
			// Keep the last successful list visible during background refresh failures.
		}
	}

	$effect(() => {
		const interval = window.setInterval(() => {
			void refreshIdeas();
		}, 10_000);

		const onVisibility = () => {
			if (document.visibilityState === "visible") void refreshIdeas();
		};

		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			window.clearInterval(interval);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	});

	async function onSubmit(event: Event) {
		event.preventDefault();
		const content = draft.trim();
		if (!content || submitting) return;

		if (!fingerprint) {
			fingerprint = await resolveFingerprint();
		}

		if (!fingerprint) {
			submitError = copy.submitErrorLabel;
			return;
		}

		submitting = true;
		submitError = null;

		const result = await submitIdea({ content, fingerprint });
		submitting = false;

		if (result.error || !result.idea) {
			submitError = copy.submitErrorLabel;
			return;
		}

		draft = "";
		ideas = [result.idea, ...ideas.filter((item) => item.id !== result.idea!.id)];
		approvedCount += 1;
		pendingIdeaId = result.idea.id;
		dialogName = "";
		dialogEl?.showModal();
	}

	async function saveName() {
		const name = dialogName.trim();
		if (!pendingIdeaId || !fingerprint || !name || savingName) {
			dialogEl?.close();
			return;
		}

		savingName = true;
		const result = await updateIdeaName({
			ideaId: pendingIdeaId,
			fingerprint,
			name,
		});
		savingName = false;

		if (result.idea) {
			ideas = ideas.map((item) => (item.id === result.idea!.id ? result.idea! : item));
		}

		pendingIdeaId = null;
		dialogEl?.close();
	}

	function skipName() {
		pendingIdeaId = null;
		dialogName = "";
		dialogEl?.close();
	}
</script>

<section class="ideas-toolbar" aria-label={copy.countLabel}>
	<div class="ideas-stat">
		<strong>{approvedCount}</strong>
		<span>{copy.countLabel}</span>
	</div>

	<div class="ideas-sort" role="group" aria-label={copy.sortLabel}>
		<span class="ideas-sort__label">{copy.sortLabel}</span>
		<div class="ideas-sort__options">
			{#each sortOptions as option (option.value)}
				<button
					type="button"
					class="ideas-sort__option"
					class:ideas-sort__option--active={sort === option.value}
					aria-pressed={sort === option.value}
					onclick={() => {
						if (sort === option.value) return;
						sort = option.value;
						ideasPromise = loadIdeas();
					}}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>
</section>

<section class="ideas-compose" aria-label={copy.formLabel}>
	<form class="ideas-compose__form" onsubmit={onSubmit}>
		<div class="ideas-compose__field">
			<label class="sr-only" for="ideas-compose-input">{copy.formLabel}</label>
			<textarea
				id="ideas-compose-input"
				name="idea"
				bind:value={draft}
				placeholder={copy.composePlaceholder}
				maxlength={2000}
				required
				disabled={submitting}
			></textarea>
			<button
				type="submit"
				class="ideas-compose__send"
				aria-label={copy.formLabel}
				disabled={submitting || !draft.trim()}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
					<path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
				</svg>
			</button>
		</div>
		<p class="ideas-compose__hint">{copy.composeHint}</p>
		{#if submitError}
			<p class="ideas-compose__status ideas-compose__status--error" role="alert">
				{submitError}
			</p>
		{/if}
	</form>
</section>

<section class="ideas-feed" aria-label={copy.feedTitle}>
	{#await ideasPromise}
		<div class="ideas-loading" role="status" aria-live="polite">
			<span class="ideas-loading__spinner" aria-hidden="true"></span>
			<span class="sr-only">{copy.loadingLabel}</span>
		</div>
	{:then}
		{#if ideas.length === 0}
			<p class="ideas-status" role="status">{copy.emptyLabel}</p>
		{:else}
			<div class="ideas-list">
				{#each ideas as idea, index (idea.id)}
					<IdeaEntry
						{idea}
						{index}
						{fingerprint}
						ideaBadge={copy.ideaBadge}
						anonymousLabel={copy.anonymousLabel}
						expandLabel={copy.expandLabel}
						collapseLabel={copy.collapseLabel}
						upvoteLabel={copy.upvoteLabel}
						downvoteLabel={copy.downvoteLabel}
					/>
				{/each}
			</div>
		{/if}
	{:catch}
		<p class="ideas-status ideas-status--error" role="alert">{copy.errorLabel}</p>
	{/await}
</section>

<dialog class="ideas-dialog" bind:this={dialogEl}>
	<form
		class="ideas-dialog__panel"
		method="dialog"
		onsubmit={(event) => {
			event.preventDefault();
			void saveName();
		}}
	>
		<h2>{copy.dialogTitle}</h2>
		<label class="ideas-dialog__label" for="ideas-dialog-name">{copy.dialogNameLabel}</label>
		<input
			id="ideas-dialog-name"
			class="ideas-dialog__input"
			type="text"
			name="name"
			bind:value={dialogName}
			placeholder={copy.dialogNamePlaceholder}
			maxlength={80}
			autocomplete="nickname"
		/>
		<div class="ideas-dialog__actions">
			<button type="button" class="button button--ghost" onclick={skipName} disabled={savingName}>
				{copy.dialogSkipLabel}
			</button>
			<button type="submit" class="button button--primary" disabled={savingName}>
				{copy.dialogContinueLabel}
			</button>
		</div>
	</form>
</dialog>

<style>
	#ideas-compose-input {
		scroll-margin-top: 20vh;
	}
</style>