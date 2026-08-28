<script lang="ts">
	import type { NewsCard } from './types';

	type Props = {
		articles: NewsCard[];
	};

	let { articles }: Props = $props();

	let activeTag = $state<string | null>(null);

	const allTags = $derived(
		Array.from(new Set(articles.flatMap((article) => article.tags))).sort((a, b) => a.localeCompare(b, 'sq'))
	);

	const visible = $derived(
		activeTag === null ? articles : articles.filter((article) => article.tags.includes(activeTag))
	);

	function toggleTag(tag: string) {
		activeTag = activeTag === tag ? null : tag;
	}
</script>

{#if allTags.length > 0}
	<div class="news-filters" role="group" aria-label="Filtro sipas etiketave">
		<button
			type="button"
			class="news-filters__chip"
			class:is-active={activeTag === null}
			onclick={() => (activeTag = null)}
		>
			Të gjitha
		</button>
		{#each allTags as tag (tag)}
			<button
				type="button"
				class="news-filters__chip"
				class:is-active={activeTag === tag}
				onclick={() => toggleTag(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>
{/if}

<p class="news-count" aria-live="polite">
	{visible.length}
	{visible.length === 1 ? 'artikull' : 'artikuj'}
	{activeTag ? `me etiketën “${activeTag}”` : ''}
</p>

{#if visible.length === 0}
	<p class="news-empty">Nuk ka artikuj për këtë filtër.</p>
{:else}
	<ul class="news-grid">
		{#each visible as article (article.slug)}
			<li class="news-card">
				<a class="news-card__link" href={`/news/${article.slug}/`}>
					{#if article.coverImageUrl}
						<img class="news-card__cover" src={article.coverImageUrl} alt="" loading="lazy" decoding="async" />
					{/if}
					<div class="news-card__body">
						<p class="news-card__meta">
							{#if article.publishedAt}
								<time datetime={article.publishedAt}>{article.publishedLabel}</time>
							{/if}
							{#if article.author}
								<span>· {article.author}</span>
							{/if}
						</p>
						<h2 class="news-card__title">{article.title}</h2>
						{#if article.excerpt}
							<p class="news-card__excerpt">{article.excerpt}</p>
						{/if}
					</div>
				</a>
				{#if article.tags.length > 0}
					<p class="news-card__tags">
						{#each article.tags as tag (tag)}
							<button type="button" class="news-card__tag" onclick={() => toggleTag(tag)}>{tag}</button>
						{/each}
					</p>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	.news-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.2rem;
	}

	.news-filters__chip {
		padding: 0.35rem 0.8rem;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 800;
		text-transform: lowercase;
		color: var(--text);
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 3px 3px 0 var(--ink);
		cursor: pointer;
	}

	.news-filters__chip:hover,
	.news-filters__chip:focus-visible {
		background: var(--accent-soft);
	}

	.news-filters__chip.is-active {
		color: var(--ink-reverse);
		background: var(--ink);
	}

	.news-count {
		margin: 0 0 1.6rem;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--muted);
	}

	.news-empty {
		margin: 2rem 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.2rem;
		color: var(--muted);
	}

	.news-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
		gap: 1.6rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.news-card {
		display: flex;
		flex-direction: column;
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 8px 8px 0 var(--ink);
		transition:
			transform 140ms ease,
			box-shadow 140ms ease;
	}

	.news-card:hover,
	.news-card:focus-within {
		transform: translate(-2px, -2px);
		box-shadow: 10px 10px 0 var(--ink);
	}

	.news-card__link {
		display: flex;
		flex-direction: column;
		gap: 0;
		color: inherit;
		text-decoration: none;
	}

	.news-card__cover {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-bottom: 2px solid var(--ink);
	}

	.news-card__body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.1rem 1.2rem 0.9rem;
	}

	.news-card__meta {
		margin: 0;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent-strong);
	}

	.news-card__title {
		margin: 0;
		font-size: 1.35rem;
		line-height: 1.25;
		font-weight: 800;
	}

	.news-card__link:hover .news-card__title,
	.news-card__link:focus-visible .news-card__title {
		color: var(--accent-strong);
	}

	.news-card__excerpt {
		margin: 0;
		color: var(--muted);
		line-height: 1.5;
	}

	.news-card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0;
		padding: 0 1.2rem 1.1rem;
	}

	.news-card__tag {
		padding: 0.1rem 0.5rem;
		font: inherit;
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: lowercase;
		color: var(--text);
		background: var(--accent-soft);
		border: 2px solid var(--ink);
		cursor: pointer;
	}

	.news-card__tag:hover,
	.news-card__tag:focus-visible {
		background: var(--accent);
	}
</style>
