<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import TextAlign from '@tiptap/extension-text-align';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import { FloatingMenu } from '@tiptap/extension-floating-menu';
	import { Placeholder } from '@tiptap/extensions';
	import LoginForm from './LoginForm.svelte';
	import { fetchArticle, fetchMe, patchArticle, type PublicArticleWithContent, type PublicReporter } from './functions';

	type Props = {
		articleId: string;
	};

	type EditorMode = 'simple' | 'notion';

	const MODE_STORAGE_KEY = 'redaksia-editor-mode';

	let { articleId }: Props = $props();

	let reporter = $state<PublicReporter | null>(null);
	let checked = $state(false);
	let article = $state<PublicArticleWithContent | null>(null);
	let loadError = $state<string | null>(null);

	let title = $state('');
	let excerpt = $state('');
	let coverImageUrl = $state('');

	let mode = $state<EditorMode>('simple');

	let editor = $state<Editor | null>(null);
	let editorElement = $state<HTMLDivElement | null>(null);
	let bubbleMenuElement = $state<HTMLDivElement | null>(null);
	let floatingMenuElement = $state<HTMLDivElement | null>(null);
	/** Bumped on every transaction so toolbar active states stay reactive. */
	let editorTick = $state(0);

	let dirty = $state(false);
	let saving = $state(false);
	let publishing = $state(false);
	let saveError = $state<string | null>(null);
	let lastSavedAt = $state<Date | null>(null);
	let autosaveTimer: ReturnType<typeof setTimeout> | null = null;

	const isPublished = $derived(article?.status === 'PUBLISHED');

	onMount(() => {
		try {
			const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
			if (stored === 'notion' || stored === 'simple') mode = stored;
		} catch {
			// localStorage unavailable; keep default.
		}

		void init();
	});

	onDestroy(() => {
		if (autosaveTimer) clearTimeout(autosaveTimer);
		editor?.destroy();
	});

	function toggleMode() {
		mode = mode === 'simple' ? 'notion' : 'simple';

		try {
			window.localStorage.setItem(MODE_STORAGE_KEY, mode);
		} catch {
			// Ignore storage failures.
		}
	}

	async function init() {
		reporter = await fetchMe();
		checked = true;
		if (reporter) await loadArticle();
	}

	async function loadArticle() {
		try {
			article = await fetchArticle(articleId);
			title = article.title;
			excerpt = article.excerpt;
			coverImageUrl = article.coverImageUrl ?? '';
			await tick();
			initEditor();
		} catch (err) {
			loadError = err instanceof Error ? err.message : 'Artikulli nuk u ngarkua.';
		}
	}

	function initEditor() {
		if (!editorElement || !bubbleMenuElement || !floatingMenuElement || !article) return;

		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit.configure({
					heading: { levels: [2, 3] },
					link: { openOnClick: false }
				}),
				Image,
				TextAlign.configure({
					types: ['heading', 'paragraph'],
					alignments: ['left', 'center', 'right', 'justify']
				}),
				Placeholder.configure({
					placeholder: 'Shkruani artikullin këtu… Zgjidhni tekst për ta formatuar.'
				}),
				BubbleMenu.configure({
					element: bubbleMenuElement,
					pluginKey: 'redaksiaBubbleMenu',
					shouldShow: ({ editor: current, state }) =>
						mode === 'notion' && current.isEditable && !state.selection.empty && !current.isActive('image')
				}),
				FloatingMenu.configure({
					element: floatingMenuElement,
					pluginKey: 'redaksiaFloatingMenu',
					shouldShow: ({ editor: current, state }) => {
						if (mode !== 'notion' || !current.isEditable || !state.selection.empty) return false;

						const anchor = state.selection.$anchor;
						return anchor.parent.type.name === 'paragraph' && anchor.parent.content.size === 0;
					}
				})
			],
			content: article.content,
			onTransaction: () => {
				editorTick += 1;
			},
			onUpdate: () => {
				markDirty();
			}
		});
	}

	function markDirty() {
		dirty = true;
		saveError = null;
		if (autosaveTimer) clearTimeout(autosaveTimer);
		autosaveTimer = setTimeout(() => void save(), 2500);
	}

	async function save(): Promise<boolean> {
		if (!editor || !article || saving) return false;

		saving = true;
		saveError = null;

		try {
			const updated = await patchArticle(article.id, {
				title: title.trim(),
				excerpt: excerpt.trim(),
				coverImageUrl: coverImageUrl.trim() || null,
				content: editor.getJSON()
			});
			article = { ...updated, content: article.content };
			dirty = false;
			lastSavedAt = new Date();
			return true;
		} catch (err) {
			saveError = err instanceof Error ? err.message : 'Artikulli nuk u ruajt.';
			return false;
		} finally {
			saving = false;
		}
	}

	async function togglePublish() {
		if (!editor || !article || publishing) return;

		publishing = true;
		saveError = null;

		try {
			const updated = await patchArticle(article.id, {
				title: title.trim(),
				excerpt: excerpt.trim(),
				coverImageUrl: coverImageUrl.trim() || null,
				content: editor.getJSON(),
				action: isPublished ? 'unpublish' : 'publish'
			});
			article = { ...updated, content: article.content };
			dirty = false;
			lastSavedAt = new Date();
		} catch (err) {
			saveError = err instanceof Error ? err.message : 'Veprimi dështoi.';
		} finally {
			publishing = false;
		}
	}

	function chain() {
		return editor?.chain().focus();
	}

	function isActive(name: string, attrs?: Record<string, unknown>): boolean {
		void editorTick;
		return editor?.isActive(name, attrs) ?? false;
	}

	function isAlignActive(alignment: string): boolean {
		void editorTick;
		return editor?.isActive({ textAlign: alignment }) ?? false;
	}

	function setLink() {
		if (!editor) return;

		const previous = editor.getAttributes('link').href as string | undefined;
		const url = window.prompt('Adresa e lidhjes (URL):', previous ?? 'https://');
		if (url === null) return;

		if (!url.trim()) {
			chain()?.unsetLink().run();
			return;
		}

		chain()?.extendMarkRange('link').setLink({ href: url.trim() }).run();
	}

	function insertImage() {
		if (!editor) return;

		const url = window.prompt('Adresa e imazhit (URL):', 'https://');
		if (!url?.trim()) return;

		chain()?.setImage({ src: url.trim() }).run();
	}

	type ToolbarButton = {
		label: string;
		title: string;
		action: () => void;
		active: () => boolean;
		labelClass?: string;
	};

	const markButtons: ToolbarButton[] = [
		{ label: 'B', title: 'Tekst i trashë', action: () => chain()?.toggleBold().run(), active: () => isActive('bold') },
		{
			label: 'I',
			title: 'Tekst i pjerrët',
			action: () => chain()?.toggleItalic().run(),
			active: () => isActive('italic')
		},
		{
			label: 'U',
			title: 'Tekst i nënvizuar',
			action: () => chain()?.toggleUnderline().run(),
			active: () => isActive('underline'),
			labelClass: 'is-underline'
		},
		{
			label: 'S',
			title: 'Tekst i vijëzuar',
			action: () => chain()?.toggleStrike().run(),
			active: () => isActive('strike'),
			labelClass: 'is-strike'
		},
		{ label: '🔗', title: 'Lidhje', action: setLink, active: () => isActive('link') }
	];

	const headingButtons: ToolbarButton[] = [
		{
			label: 'H2',
			title: 'Titull seksioni',
			action: () => chain()?.toggleHeading({ level: 2 }).run(),
			active: () => isActive('heading', { level: 2 })
		},
		{
			label: 'H3',
			title: 'Nëntitull',
			action: () => chain()?.toggleHeading({ level: 3 }).run(),
			active: () => isActive('heading', { level: 3 })
		}
	];

	const alignButtons: ToolbarButton[] = [
		{
			label: 'L',
			title: 'Rreshtim majtas',
			action: () => chain()?.setTextAlign('left').run(),
			active: () => isAlignActive('left')
		},
		{
			label: 'C',
			title: 'Rreshtim në qendër',
			action: () => chain()?.setTextAlign('center').run(),
			active: () => isAlignActive('center')
		},
		{
			label: 'R',
			title: 'Rreshtim djathtas',
			action: () => chain()?.setTextAlign('right').run(),
			active: () => isAlignActive('right')
		},
		{
			label: 'J',
			title: 'Rreshtim i plotë',
			action: () => chain()?.setTextAlign('justify').run(),
			active: () => isAlignActive('justify')
		}
	];

	const blockButtons: ToolbarButton[] = [
		{
			label: '•',
			title: 'Listë me pika',
			action: () => chain()?.toggleBulletList().run(),
			active: () => isActive('bulletList')
		},
		{
			label: '1.',
			title: 'Listë e numëruar',
			action: () => chain()?.toggleOrderedList().run(),
			active: () => isActive('orderedList')
		},
		{
			label: '❝',
			title: 'Citim',
			action: () => chain()?.toggleBlockquote().run(),
			active: () => isActive('blockquote')
		},
		{ label: '🖼', title: 'Imazh nga URL', action: insertImage, active: () => false },
		{ label: '―', title: 'Vijë ndarëse', action: () => chain()?.setHorizontalRule().run(), active: () => false }
	];

	const toolbarButtons: ToolbarButton[] = [...markButtons, ...headingButtons, ...alignButtons, ...blockButtons];
	const bubbleButtons: ToolbarButton[] = [...markButtons, ...headingButtons, ...alignButtons];
	const floatingButtons: ToolbarButton[] = [...headingButtons, ...blockButtons];
</script>

{#snippet menuButton(tool: ToolbarButton)}
	<button
		type="button"
		class="editor-toolbar__button"
		class:is-active={tool.active()}
		title={tool.title}
		aria-label={tool.title}
		onclick={tool.action}
		disabled={!editor}
	>
		<span class={tool.labelClass}>{tool.label}</span>
	</button>
{/snippet}

{#if !checked}
	<p class="status">Duke verifikuar sesionin…</p>
{:else if !reporter}
	<LoginForm onLogin={(next) => ((reporter = next), void loadArticle())} />
{:else if loadError}
	<p class="status status--error" role="alert">{loadError}</p>
{:else}
	<section class="editor-shell">
		<header class="editor-topbar">
			<a class="button button--ghost" href="/redaksia/">← Redaksia</a>

			<div class="editor-topbar__state">
				{#if saving}
					<span>Duke ruajtur…</span>
				{:else if saveError}
					<span class="editor-topbar__error" role="alert">{saveError}</span>
				{:else if dirty}
					<span>Ndryshime të paruajtura</span>
				{:else if lastSavedAt}
					<span>U ruajt · {lastSavedAt.toLocaleTimeString('sq-AL')}</span>
				{:else if article}
					<span data-status={article.status}>{isPublished ? 'I publikuar' : 'Draft'}</span>
				{/if}
			</div>

			<div class="editor-topbar__actions">
				<button
					class="button button--ghost"
					onclick={toggleMode}
					title="Ndërro mënyrën e redaktimit"
					aria-pressed={mode === 'notion'}
				>
					{mode === 'notion' ? '✍ Notion' : '☰ I thjeshtë'}
				</button>
				<button class="button" onclick={() => void save()} disabled={saving || !article}>Ruaj</button>
				<button class="button button--primary" onclick={togglePublish} disabled={publishing || !article}>
					{publishing ? 'Duke punuar…' : isPublished ? 'Hiq nga publikimi' : 'Publiko'}
				</button>
			</div>
		</header>

		<div class="editor-meta">
			<input
				class="editor-title"
				type="text"
				placeholder="Titulli i artikullit"
				bind:value={title}
				oninput={markDirty}
				maxlength="200"
			/>
			<textarea
				class="editor-excerpt"
				placeholder="Përmbledhje e shkurtër (shfaqet në listën e artikujve)"
				bind:value={excerpt}
				oninput={markDirty}
				maxlength="500"
				rows="2"></textarea>
			<label class="editor-cover">
				<span>Imazhi kryesor (URL)</span>
				<input type="url" placeholder="https://…" bind:value={coverImageUrl} oninput={markDirty} maxlength="2048" />
			</label>
			{#if coverImageUrl.trim()}
				<img class="editor-cover__preview" src={coverImageUrl.trim()} alt="Imazhi kryesor i artikullit" />
			{/if}
		</div>

		{#if mode === 'simple'}
			<div class="editor-toolbar" role="toolbar" aria-label="Formatimi i tekstit">
				{#each toolbarButtons as tool (tool.title)}
					{@render menuButton(tool)}
				{/each}
			</div>
		{:else}
			<p class="editor-hint">
				Mënyra Notion: zgjidhni tekst për ta formatuar, ose qëndroni në një rresht bosh për të shtuar blloqe.
			</p>
		{/if}

		<div class="editor-canvas" class:editor-canvas--notion={mode === 'notion'} bind:this={editorElement}></div>

		<div class="editor-bubble-menu" bind:this={bubbleMenuElement} role="toolbar" aria-label="Formatimi i përzgjedhjes">
			{#each bubbleButtons as tool (tool.title)}
				{@render menuButton(tool)}
			{/each}
		</div>

		<div class="editor-floating-menu" bind:this={floatingMenuElement} role="toolbar" aria-label="Shto bllok">
			<span class="editor-floating-menu__plus">+</span>
			{#each floatingButtons as tool (tool.title)}
				{@render menuButton(tool)}
			{/each}
		</div>
	</section>
{/if}

<style>
	.status {
		margin: 3rem auto;
		text-align: center;
		font-weight: 700;
		color: var(--muted);
	}

	.status--error {
		color: var(--accent-strong);
	}

	.editor-shell {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.editor-topbar {
		position: sticky;
		top: 0.5rem;
		z-index: 20;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		padding: 0.7rem 0.9rem;
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.editor-topbar__state {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--muted);
	}

	.editor-topbar__error {
		color: var(--accent-strong);
	}

	.editor-topbar__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}

	.editor-meta {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.editor-title {
		font-family: inherit;
		font-size: clamp(1.6rem, 4vw, 2.4rem);
		font-weight: 800;
		padding: 0.6rem 0.9rem;
		color: var(--text);
		background: var(--surface-strong);
		border: 2px solid var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.editor-excerpt {
		font: inherit;
		padding: 0.6rem 0.9rem;
		color: var(--text);
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
		resize: vertical;
	}

	.editor-title::placeholder,
	.editor-excerpt::placeholder {
		color: var(--muted);
	}

	.editor-title:focus-visible,
	.editor-excerpt:focus-visible,
	.editor-cover input:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: 2px;
	}

	.editor-cover {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.editor-cover span {
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent-strong);
	}

	.editor-cover input {
		height: 2.8rem;
		padding: 0 0.9rem;
		font: inherit;
		color: var(--text);
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.editor-cover__preview {
		max-height: 16rem;
		width: 100%;
		object-fit: cover;
		border: 2px solid var(--ink);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.editor-hint {
		margin: 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.02rem;
		color: var(--muted);
	}

	.editor-toolbar {
		position: sticky;
		top: 4.6rem;
		z-index: 19;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		padding: 0.5rem;
		background: var(--paper-cool);
		border: 2px solid var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.editor-toolbar__button {
		min-width: 2.4rem;
		height: 2.4rem;
		padding: 0 0.5rem;
		font: inherit;
		font-weight: 800;
		color: var(--text);
		background: var(--surface);
		border: 2px solid var(--ink);
		cursor: pointer;
	}

	.editor-toolbar__button :global(.is-underline) {
		text-decoration: underline;
	}

	.editor-toolbar__button :global(.is-strike) {
		text-decoration: line-through;
	}

	.editor-toolbar__button:hover,
	.editor-toolbar__button:focus-visible {
		background: var(--accent-soft);
	}

	.editor-toolbar__button.is-active {
		color: var(--ink-reverse);
		background: var(--ink);
	}

	.editor-toolbar__button.is-active :global(span) {
		color: var(--ink-reverse);
	}

	.editor-toolbar__button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.editor-bubble-menu,
	.editor-floating-menu {
		/* Hidden and unpositioned by default; the Tiptap plugins toggle
		   visibility and set top/left inline when the menu should appear. */
		visibility: hidden;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 40;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.3rem;
		max-width: 32rem;
		padding: 0.4rem;
		background: var(--surface-strong);
		border: 2px solid var(--ink);
		box-shadow: 5px 5px 0 var(--ink);
	}

	.editor-floating-menu__plus {
		padding: 0 0.3rem;
		font-weight: 800;
		color: var(--accent-strong);
	}

	.editor-canvas {
		min-height: 28rem;
		padding: 1.4rem 1.6rem;
		background: var(--surface-strong);
		border: 2px solid var(--ink);
		box-shadow: 8px 8px 0 var(--ink);
	}

	.editor-canvas--notion {
		padding: 1.6rem clamp(1.6rem, 6vw, 4rem);
	}

	.editor-canvas :global(.tiptap) {
		min-height: 26rem;
		outline: none;
		line-height: 1.65;
	}

	.editor-canvas :global(.tiptap p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		height: 0;
		color: var(--muted);
		pointer-events: none;
	}

	.editor-canvas :global(.tiptap h2),
	.editor-canvas :global(.tiptap h3) {
		font-weight: 800;
		line-height: 1.2;
	}

	.editor-canvas :global(.tiptap blockquote) {
		margin: 1rem 0;
		padding: 0.4rem 1rem;
		border-left: 4px solid var(--accent);
		background: var(--paper);
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.15em;
	}

	.editor-canvas :global(.tiptap img) {
		max-width: 100%;
		height: auto;
		border: 2px solid var(--ink);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.editor-canvas :global(.tiptap img.ProseMirror-selectednode) {
		outline: 3px solid var(--accent);
	}

	.editor-canvas :global(.tiptap a) {
		color: var(--accent-strong);
		text-decoration: underline;
	}

	.editor-canvas :global(.tiptap hr) {
		border: none;
		border-top: 3px solid var(--ink);
		margin: 1.5rem 0;
	}

	@media (max-width: 640px) {
		.editor-topbar {
			position: static;
		}

		.editor-toolbar {
			top: 0.5rem;
		}
	}
</style>
