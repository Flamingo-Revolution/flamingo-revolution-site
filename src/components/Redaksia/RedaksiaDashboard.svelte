<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import {
		createArticle,
		deleteArticle,
		fetchArticles,
		fetchMe,
		formatDate,
		logout,
		type PublicArticle,
		type PublicReporter
	} from './functions';

	let reporter = $state<PublicReporter | null>(null);
	let checked = $state(false);
	let articles = $state<PublicArticle[]>([]);
	let loading = $state(false);
	let creating = $state(false);
	let error = $state<string | null>(null);

	$effect(() => {
		void init();
	});

	async function init() {
		reporter = await fetchMe();
		checked = true;
		if (reporter) await loadArticles();
	}

	async function loadArticles() {
		loading = true;
		error = null;

		try {
			articles = await fetchArticles();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Artikujt nuk u ngarkuan.';
		} finally {
			loading = false;
		}
	}

	async function onLogin(nextReporter: PublicReporter) {
		reporter = nextReporter;
		await loadArticles();
	}

	async function onNewArticle() {
		if (creating) return;
		creating = true;
		error = null;

		try {
			const article = await createArticle();
			window.location.href = `/redaksia/artikull/${article.id}/`;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Artikulli nuk u krijua.';
			creating = false;
		}
	}

	async function onDelete(article: PublicArticle) {
		const confirmed = window.confirm(`Të fshihet artikulli "${article.title || 'Pa titull'}"? Ky veprim nuk kthehet.`);
		if (!confirmed) return;

		try {
			await deleteArticle(article.id);
			articles = articles.filter((item) => item.id !== article.id);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Artikulli nuk u fshi.';
		}
	}

	async function onLogout() {
		await logout();
		reporter = null;
		articles = [];
	}
</script>

{#if !checked}
	<p class="status">Duke verifikuar sesionin…</p>
{:else if !reporter}
	<LoginForm {onLogin} />
{:else}
	<section class="dashboard">
		<header class="dashboard__header">
			<div>
				<p class="dashboard__eyebrow">Redaksia e Flamingo Times</p>
				<h2>Mirë se erdhe, {reporter.name}</h2>
			</div>
			<div class="dashboard__actions">
				<button class="button button--primary" onclick={onNewArticle} disabled={creating}>
					{creating ? 'Duke krijuar…' : '+ Artikull i ri'}
				</button>
				<button class="button button--ghost" onclick={onLogout}>Dil</button>
			</div>
		</header>

		{#if error}
			<p class="dashboard__error" role="alert">{error}</p>
		{/if}

		{#if loading}
			<p class="status">Duke ngarkuar artikujt…</p>
		{:else if articles.length === 0}
			<p class="status">Ende nuk keni artikuj. Krijoni të parin!</p>
		{:else}
			<ul class="articles">
				{#each articles as article (article.id)}
					<li class="article-card">
						<div class="article-card__body">
							<span class="article-card__status" data-status={article.status}>
								{article.status === 'PUBLISHED' ? 'I publikuar' : 'Draft'}
							</span>
							<a class="article-card__title" href={`/redaksia/artikull/${article.id}/`}>
								{article.title || 'Pa titull'}
							</a>
							{#if article.excerpt}
								<p class="article-card__excerpt">{article.excerpt}</p>
							{/if}
							{#if article.tags.length > 0}
								<p class="article-card__tags">
									{#each article.tags as tag (tag)}
										<span class="article-card__tag">{tag}</span>
									{/each}
								</p>
							{/if}
							<p class="article-card__meta">Përditësuar: {formatDate(article.updatedAt)}</p>
						</div>
						<div class="article-card__actions">
							{#if article.status === 'PUBLISHED' && article.slug}
								<a class="button button--ghost" href={`/news/${article.slug}/`} target="_blank" rel="noopener">
									Shiko
								</a>
							{/if}
							<a class="button" href={`/redaksia/artikull/${article.id}/`}>Redakto</a>
							<button class="button button--ghost" onclick={() => onDelete(article)}>Fshi</button>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
{/if}

<style>
	.status {
		margin: 3rem auto;
		text-align: center;
		font-weight: 700;
		color: var(--muted);
	}

	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.dashboard__header {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
	}

	.dashboard__eyebrow {
		margin: 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.05rem;
		color: var(--accent-strong);
	}

	h2 {
		margin: 0.2rem 0 0;
		font-size: 1.9rem;
	}

	.dashboard__actions {
		display: flex;
		gap: 0.8rem;
	}

	.dashboard__error {
		margin: 0;
		font-weight: 700;
		color: var(--accent-strong);
	}

	.articles {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.article-card {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 1.2rem 1.4rem;
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.article-card__body {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
	}

	.article-card__status {
		align-self: flex-start;
		padding: 0.15rem 0.55rem;
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		border: 2px solid var(--ink);
		background: var(--paper-cool);
	}

	.article-card__status[data-status='PUBLISHED'] {
		background: var(--accent-soft);
	}

	.article-card__title {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--text);
		text-decoration: none;
	}

	.article-card__title:hover,
	.article-card__title:focus-visible {
		color: var(--accent-strong);
	}

	.article-card__excerpt {
		margin: 0;
		color: var(--muted);
	}

	.article-card__meta {
		margin: 0;
		font-size: 0.85rem;
		color: var(--muted);
	}

	.article-card__tags {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.article-card__tag {
		padding: 0.1rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: lowercase;
		background: var(--accent-soft);
		border: 2px solid var(--ink);
	}

	.article-card__actions {
		display: flex;
		gap: 0.7rem;
	}

	@media (max-width: 640px) {
		.article-card {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
