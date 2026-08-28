<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import TextAlign from '@tiptap/extension-text-align';
	import { Placeholder } from '@tiptap/extensions';
	import LoginForm from './LoginForm.svelte';
	import {
		fetchArticle,
		fetchMe,
		patchArticle,
		uploadImage,
		type PublicArticleWithContent,
		type PublicReporter
	} from './functions';

	type Props = {
		articleId: string;
	};

	let { articleId }: Props = $props();

	let reporter = $state<PublicReporter | null>(null);
	let checked = $state(false);
	let article = $state<PublicArticleWithContent | null>(null);
	let loadError = $state<string | null>(null);

	let title = $state('');
	let excerpt = $state('');
	let coverImageUrl = $state('');
	let tags = $state<string[]>([]);
	let tagDraft = $state('');

	const MAX_TAGS = 8;
	const MAX_TAG_LENGTH = 32;

	let editor = $state<Editor | null>(null);
	let editorElement = $state<HTMLDivElement | null>(null);
	let imageInput = $state<HTMLInputElement | null>(null);
	let coverInput = $state<HTMLInputElement | null>(null);
	/** Bumped on every transaction so toolbar active states stay reactive. */
	let editorTick = $state(0);

	let uploading = $state(0);

	let dirty = $state(false);
	let saving = $state(false);
	let publishing = $state(false);
	let saveError = $state<string | null>(null);
	let lastSavedAt = $state<Date | null>(null);
	let autosaveTimer: ReturnType<typeof setTimeout> | null = null;

	const isPublished = $derived(article?.status === 'PUBLISHED');

	/** Media URLs need a trailing slash to match the router. */
	const coverPreviewUrl = $derived(
		coverImageUrl.trim().startsWith('/media/') && !coverImageUrl.trim().endsWith('/')
			? `${coverImageUrl.trim()}/`
			: coverImageUrl.trim()
	);

	onMount(() => {
		void init();
	});

	onDestroy(() => {
		if (autosaveTimer) clearTimeout(autosaveTimer);
		editor?.destroy();
	});

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
			tags = [...article.tags];
			await tick();
			initEditor();
		} catch (err) {
			loadError = err instanceof Error ? err.message : 'Artikulli nuk u ngarkua.';
		}
	}

	function initEditor() {
		if (!editorElement || !article) return;

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
				})
			],
			content: article.content,
			editorProps: {
				handlePaste: (_view, event) => {
					const files = imageFilesFrom(event.clipboardData?.files);
					if (files.length === 0) return false;

					event.preventDefault();
					void uploadAndInsert(files);
					return true;
				},
				handleDrop: (view, event, _slice, moved) => {
					if (moved) return false;

					const files = imageFilesFrom(event.dataTransfer?.files);
					if (files.length === 0) return false;

					event.preventDefault();
					const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
					void uploadAndInsert(files, pos);
					return true;
				}
			},
			onTransaction: () => {
				editorTick += 1;
			},
			onUpdate: () => {
				markDirty();
			}
		});
	}

	function imageFilesFrom(list: FileList | null | undefined): File[] {
		return Array.from(list ?? []).filter((file) => file.type.startsWith('image/'));
	}

	async function uploadAndInsert(files: File[], pos?: number) {
		if (!editor || !article) return;

		for (const file of files) {
			uploading += 1;

			try {
				const url = await uploadImage(article.id, file);

				if (typeof pos === 'number') {
					editor
						.chain()
						.focus()
						.insertContentAt(pos, { type: 'image', attrs: { src: url } })
						.run();
				} else {
					editor.chain().focus().setImage({ src: url }).run();
				}
			} catch (err) {
				saveError = err instanceof Error ? err.message : 'Imazhi nuk u ngarkua.';
			} finally {
				uploading -= 1;
			}
		}
	}

	function openImagePicker() {
		imageInput?.click();
	}

	function onImageFilesSelected() {
		const files = imageFilesFrom(imageInput?.files);
		if (imageInput) imageInput.value = '';
		if (files.length > 0) void uploadAndInsert(files);
	}

	function onCoverFileSelected() {
		const [file] = imageFilesFrom(coverInput?.files);
		if (coverInput) coverInput.value = '';
		if (!file || !article) return;

		uploading += 1;

		void uploadImage(article.id, file)
			.then((url) => {
				coverImageUrl = url;
				markDirty();
			})
			.catch((err) => {
				saveError = err instanceof Error ? err.message : 'Imazhi nuk u ngarkua.';
			})
			.finally(() => {
				uploading -= 1;
			});
	}

	function addTagsFromDraft() {
		const candidates = tagDraft
			.split(',')
			.map((tag) => tag.trim().toLowerCase().slice(0, MAX_TAG_LENGTH))
			.filter(Boolean);

		let changed = false;

		for (const tag of candidates) {
			if (tags.length >= MAX_TAGS) break;
			if (tags.includes(tag)) continue;
			tags = [...tags, tag];
			changed = true;
		}

		tagDraft = '';
		if (changed) markDirty();
	}

	function removeTag(tag: string) {
		tags = tags.filter((item) => item !== tag);
		markDirty();
	}

	function onTagKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			addTagsFromDraft();
		} else if (event.key === 'Backspace' && !tagDraft && tags.length > 0) {
			removeTag(tags[tags.length - 1]);
		}
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
				tags,
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
				tags,
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

	const toolbarButtons: ToolbarButton[] = [
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
		{ label: '🔗', title: 'Lidhje', action: setLink, active: () => isActive('link') },
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
		},
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
		},
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
		{ label: '🖼', title: 'Ngarko imazh', action: openImagePicker, active: () => false },
		{ label: '🌐', title: 'Imazh nga URL', action: insertImage, active: () => false },
		{ label: '―', title: 'Vijë ndarëse', action: () => chain()?.setHorizontalRule().run(), active: () => false }
	];
</script>

{#if !checked}
	<p class="status">Duke verifikuar sesionin…</p>
{:else if !reporter}
	<LoginForm onLogin={(next) => ((reporter = next), void loadArticle())} />
{:else if loadError}
	<p class="status status--error" role="alert">{loadError}</p>
{:else}
	<section class="editor-shell">
		<header class="editor-topbar">
			<a class="button button--ghost" href="/redaksia/panel/">← Redaksia</a>

			<div class="editor-topbar__state">
				{#if uploading > 0}
					<span>Duke ngarkuar imazhin…</span>
				{:else if saving}
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
				{#if isPublished && article?.slug}
					<a class="button button--ghost" href={`/news/${article.slug}/`} target="_blank" rel="noopener">Shiko</a>
				{/if}
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
			<div class="editor-tags">
				<label class="editor-tags__label" for="editor-tag-input">Etiketat (deri në {MAX_TAGS})</label>
				<div class="editor-tags__box">
					{#each tags as tag (tag)}
						<span class="editor-tags__chip">
							{tag}
							<button
								type="button"
								class="editor-tags__remove"
								onclick={() => removeTag(tag)}
								aria-label={`Hiq etiketën ${tag}`}
							>
								×
							</button>
						</span>
					{/each}
					<input
						id="editor-tag-input"
						type="text"
						placeholder={tags.length >= MAX_TAGS ? 'Kufiri u arrit' : 'p.sh. protesta, diaspora…'}
						bind:value={tagDraft}
						onkeydown={onTagKeydown}
						onblur={addTagsFromDraft}
						maxlength={MAX_TAG_LENGTH}
						disabled={tags.length >= MAX_TAGS}
					/>
				</div>
			</div>

			<label class="editor-cover">
				<span>Imazhi kryesor (URL ose ngarkim)</span>
				<div class="editor-cover__row">
					<input type="url" placeholder="https://…" bind:value={coverImageUrl} oninput={markDirty} maxlength="2048" />
					<button type="button" class="button" onclick={() => coverInput?.click()} disabled={!article}> Ngarko </button>
				</div>
			</label>
			{#if coverPreviewUrl}
				<img class="editor-cover__preview" src={coverPreviewUrl} alt="Imazhi kryesor i artikullit" />
			{/if}
		</div>

		<div class="editor-toolbar" role="toolbar" aria-label="Formatimi i tekstit">
			{#each toolbarButtons as tool (tool.title)}
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
			{/each}
		</div>

		<div class="editor-canvas" bind:this={editorElement}></div>

		<input type="file" accept="image/*" multiple hidden bind:this={imageInput} onchange={onImageFilesSelected} />
		<input type="file" accept="image/*" hidden bind:this={coverInput} onchange={onCoverFileSelected} />
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

	.editor-tags {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.editor-tags__label {
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent-strong);
	}

	.editor-tags__box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		min-height: 2.8rem;
		padding: 0.35rem 0.6rem;
		background: var(--surface);
		border: 2px solid var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.editor-tags__chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.15rem 0.3rem 0.15rem 0.55rem;
		font-size: 0.82rem;
		font-weight: 800;
		text-transform: lowercase;
		background: var(--accent-soft);
		border: 2px solid var(--ink);
	}

	.editor-tags__remove {
		padding: 0 0.25rem;
		font: inherit;
		font-weight: 800;
		color: var(--text);
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.editor-tags__remove:hover,
	.editor-tags__remove:focus-visible {
		color: var(--accent-strong);
	}

	.editor-tags__box input {
		flex: 1;
		min-width: 10rem;
		border: none;
		background: transparent;
		font: inherit;
		color: var(--text);
		outline: none;
	}

	.editor-tags__box input::placeholder {
		color: var(--muted);
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

	.editor-cover__row {
		display: flex;
		gap: 0.7rem;
		align-items: stretch;
	}

	.editor-cover input {
		flex: 1;
		min-width: 0;
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

	.editor-canvas {
		min-height: 28rem;
		padding: 1.4rem 1.6rem;
		background: var(--surface-strong);
		border: 2px solid var(--ink);
		box-shadow: 8px 8px 0 var(--ink);
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
