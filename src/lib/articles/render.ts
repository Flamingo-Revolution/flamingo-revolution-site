/**
 * Render Tiptap JSON to HTML.
 *
 * Deliberately hand-written instead of using a Tiptap HTML helper: this runs
 * inside the Cloudflare Worker (no DOM), adds no dependency, and — most
 * importantly — only emits an allowlisted set of nodes, marks and attributes.
 * Anything unknown in the stored document is skipped rather than passed
 * through, so stored content can never inject markup or scripts.
 */

type JsonNode = {
	type?: string;
	text?: string;
	attrs?: Record<string, unknown>;
	marks?: { type?: string; attrs?: Record<string, unknown> }[];
	content?: JsonNode[];
};

const ALIGNMENTS = new Set(['left', 'center', 'right', 'justify']);

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/** Allow only site-relative, http(s) and mailto URLs. */
function safeUrl(value: unknown): string | null {
	if (typeof value !== 'string') return null;

	const url = value.trim();
	if (!url) return null;

	if (url.startsWith('/') && !url.startsWith('//')) return url;

	if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url;

	return null;
}

function alignAttribute(attrs: Record<string, unknown> | undefined): string {
	const align = attrs?.textAlign;

	if (typeof align === 'string' && ALIGNMENTS.has(align) && align !== 'left') {
		return ` style="text-align:${align}"`;
	}

	return '';
}

function renderText(node: JsonNode): string {
	let html = escapeHtml(node.text ?? '');

	for (const mark of node.marks ?? []) {
		switch (mark.type) {
			case 'bold':
				html = `<strong>${html}</strong>`;
				break;
			case 'italic':
				html = `<em>${html}</em>`;
				break;
			case 'underline':
				html = `<u>${html}</u>`;
				break;
			case 'strike':
				html = `<s>${html}</s>`;
				break;
			case 'code':
				html = `<code>${html}</code>`;
				break;
			case 'link': {
				const href = safeUrl(mark.attrs?.href);
				html = href
					? `<a href="${escapeHtml(href)}" rel="noopener noreferrer nofollow" target="_blank">${html}</a>`
					: html;
				break;
			}
			default:
				// Unknown mark: keep the text, drop the formatting.
				break;
		}
	}

	return html;
}

function renderNodes(nodes: JsonNode[] | undefined): string {
	return (nodes ?? []).map(renderNode).join('');
}

function renderNode(node: JsonNode): string {
	switch (node.type) {
		case 'text':
			return renderText(node);

		case 'paragraph':
			return `<p${alignAttribute(node.attrs)}>${renderNodes(node.content)}</p>`;

		case 'heading': {
			const level = node.attrs?.level === 3 ? 3 : 2;
			return `<h${level}${alignAttribute(node.attrs)}>${renderNodes(node.content)}</h${level}>`;
		}

		case 'bulletList':
			return `<ul>${renderNodes(node.content)}</ul>`;

		case 'orderedList': {
			const start = typeof node.attrs?.start === 'number' && node.attrs.start > 1 ? ` start="${node.attrs.start}"` : '';
			return `<ol${start}>${renderNodes(node.content)}</ol>`;
		}

		case 'listItem':
			return `<li>${renderNodes(node.content)}</li>`;

		case 'blockquote':
			return `<blockquote>${renderNodes(node.content)}</blockquote>`;

		case 'codeBlock':
			return `<pre><code>${escapeHtml(plainText(node))}</code></pre>`;

		case 'horizontalRule':
			return '<hr />';

		case 'hardBreak':
			return '<br />';

		case 'image': {
			const src = safeUrl(node.attrs?.src);
			if (!src) return '';

			const alt = typeof node.attrs?.alt === 'string' ? node.attrs.alt : '';
			const title = typeof node.attrs?.title === 'string' ? ` title="${escapeHtml(node.attrs.title)}"` : '';

			return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${title} loading="lazy" decoding="async" />`;
		}

		case 'doc':
			return renderNodes(node.content);

		default:
			// Unknown node: render any children we do understand.
			return renderNodes(node.content);
	}
}

/** Plain-text extraction, used for code blocks and excerpt fallbacks. */
export function plainText(node: unknown): string {
	if (typeof node !== 'object' || node === null) return '';

	const current = node as JsonNode;

	if (current.type === 'text') return current.text ?? '';

	const children = (current.content ?? []).map(plainText).join(current.type === 'doc' ? ' ' : '');

	return children;
}

export function renderArticleHtml(content: unknown): string {
	if (typeof content !== 'object' || content === null || Array.isArray(content)) return '';

	return renderNode(content as JsonNode);
}

/** First meaningful sentence(s) of a document, for meta descriptions. */
export function summarize(content: unknown, maxLength = 160): string {
	const text = plainText(content).replace(/\s+/g, ' ').trim();

	if (text.length <= maxLength) return text;

	return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}
