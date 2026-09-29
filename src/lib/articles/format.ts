const MONTHS_SQ = [
	'janar',
	'shkurt',
	'mars',
	'prill',
	'maj',
	'qershor',
	'korrik',
	'gusht',
	'shtator',
	'tetor',
	'nëntor',
	'dhjetor'
];

/** Average adult reading speed, words per minute. */
const WORDS_PER_MINUTE = 200;

/** Whole minutes needed to read `text`, never less than one. */
export function readingMinutes(text: string): number {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	if (words === 0) return 1;

	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Albanian reading-time label, e.g. "4 min lexim". */
export function readingTimeLabel(text: string): string {
	return `${readingMinutes(text)} min lexim`;
}

/** Albanian long date, matching the blog and referendum pages. */
export function formatArticleDate(value: string | Date | null): string {
	if (!value) return '';

	const date = typeof value === 'string' ? new Date(value) : value;
	if (Number.isNaN(date.getTime())) return '';

	return `${date.getUTCDate()} ${MONTHS_SQ[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
