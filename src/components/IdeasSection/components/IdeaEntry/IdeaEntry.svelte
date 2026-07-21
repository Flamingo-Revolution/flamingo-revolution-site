<script lang="ts">
	import {
		formatIdeaIndex,
		manageVote,
		type PublicIdea,
		type VoteValue,
	} from "../../functions";

	type Props = {
		idea: PublicIdea;
		index: number;
		fingerprint: string | null;
		ideaBadge: string;
		anonymousLabel: string;
		expandLabel: string;
		collapseLabel: string;
		upvoteLabel: string;
		downvoteLabel: string;
	};

	let {
		idea,
		index,
		fingerprint,
		ideaBadge,
		anonymousLabel,
		expandLabel,
		collapseLabel,
		upvoteLabel,
		downvoteLabel,
	}: Props = $props();

	let expanded = $state(false);
	let textEl = $state<HTMLParagraphElement | null>(null);
	let needsToggle = $state(false);
	let voting = $state(false);

	const authorLabel = $derived(idea.name.trim() || anonymousLabel);

	function measureOverflow() {
		if (!textEl || expanded) return;
		needsToggle = textEl.scrollHeight > textEl.clientHeight + 1;
	}

	$effect(() => {
		void idea.idea;
		void expanded;
		queueMicrotask(measureOverflow);
	});

	function toggleExpanded() {
		expanded = !expanded;
	}

	async function onVote(value: VoteValue) {
		if (!fingerprint || voting) return;
		voting = true;
		await manageVote({ idea, value, fingerprint });
		voting = false;
	}
</script>

<svelte:window onresize={measureOverflow} />

<article class="published-idea" class:is-expanded={expanded}>
	<span class="published-idea__index">{formatIdeaIndex(index)}</span>

	<div class="published-idea__body">
		<div class="published-idea__meta-row">
			<span class="published-idea__meta">{ideaBadge}</span>
			<span class="published-idea__author">{authorLabel}</span>
		</div>

		<p class="published-idea__text" bind:this={textEl}>{idea.idea}</p>

		{#if needsToggle || expanded}
			<button
				type="button"
				class="published-idea__toggle"
				aria-expanded={expanded}
				onclick={toggleExpanded}
			>
				{expanded ? collapseLabel : expandLabel}
			</button>
		{/if}

		<div class="published-idea__votes">
			<button
				type="button"
				class="published-idea__vote published-idea__vote--up"
				class:is-active={idea.userVote === "UP"}
				aria-label={upvoteLabel}
				aria-pressed={idea.userVote === "UP"}
				disabled={!fingerprint || voting}
				onclick={() => onVote("UP")}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
					<path
						d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66a1.99 1.99 0 0 0-1.39-1.07l-.02-.01c-.34-.07-.69.02-.96.24L7.38 7.73C7.14 7.95 7 8.26 7 8.6v7.8c0 1.1.9 2 2 2h7.73c.73 0 1.38-.41 1.71-1.05l2.39-4.47z"
					/>
				</svg>
			</button>

			<span class="published-idea__score">{idea.score}</span>

			<button
				type="button"
				class="published-idea__vote published-idea__vote--down"
				class:is-active={idea.userVote === "DOWN"}
				aria-label={downvoteLabel}
				aria-pressed={idea.userVote === "DOWN"}
				disabled={!fingerprint || voting}
				onclick={() => onVote("DOWN")}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
					<path
						d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.4.65.67 1.12.67.14 0 .28-.02.42-.07l.02.01c.34.07.69-.02.96-.24l4.59-4.38c.24-.22.38-.53.38-.87V7.6c0-1.1-.9-2-2-2H6.44c-.73 0-1.38.41-1.71 1.05l-2.56 4.47z"
					/>
				</svg>
			</button>
		</div>
	</div>
</article>
