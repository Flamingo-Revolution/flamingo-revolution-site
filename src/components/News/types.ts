export type NewsCard = {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	coverImageUrl: string | null;
	publishedAt: string | null;
	publishedLabel: string;
	author: string;
};
