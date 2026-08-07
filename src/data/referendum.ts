import { getCollection, type CollectionEntry } from "astro:content";

export type ReferendumPage = CollectionEntry<"referendum">;

export type ReferendumSection = {
	id: string;
	title: string;
	children: ReferendumPage[];
};

function titleFromSegment(segment: string) {
	return segment
		.split("-")
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function sortPages(pages: ReferendumPage[]) {
	return [...pages].sort(
		(a, b) => (a.data.order ?? 99) - (b.data.order ?? 99) || a.id.localeCompare(b.id)
	);
}

export async function getReferendumPages() {
	return getCollection("referendum", ({ data }) => !data.draft);
}

/**
 * Folders with no index.md of their own, but with nested index.md pages
 * under them (e.g. fakte/ containing fakte/01-…/index.md).
 */
export async function getReferendumSections(): Promise<ReferendumSection[]> {
	const pages = await getReferendumPages();
	const ids = new Set(pages.map((page) => page.id));
	const sectionIds = new Set<string>();

	for (const page of pages) {
		const segments = page.id.split("/");
		for (let i = 1; i < segments.length; i++) {
			const ancestorId = segments.slice(0, i).join("/");
			if (!ids.has(ancestorId)) sectionIds.add(ancestorId);
		}
	}

	return [...sectionIds]
		.sort((a, b) => a.localeCompare(b))
		.map((id) => {
			const prefix = `${id}/`;
			const children = sortPages(
				pages.filter(
					(page) =>
						page.id.startsWith(prefix) &&
						page.id.slice(prefix.length).split("/").length === 1
				)
			);
			const segment = id.split("/").at(-1) ?? id;
			return {
				id,
				title: titleFromSegment(segment),
				children
			};
		})
		.filter((section) => section.children.length > 0);
}

/** Top-level collection pages + folder sections that only exist via nested MD. */
export async function getReferendumIndexItems() {
	const pages = await getReferendumPages();
	const sections = await getReferendumSections();

	const topLevel = sortPages(pages.filter((page) => !page.id.includes("/")));
	const rootSections = sections.filter((section) => !section.id.includes("/"));

	return [
		...topLevel.map((page) => ({ kind: "page" as const, page })),
		...rootSections.map((section) => ({ kind: "section" as const, section }))
	];
}
