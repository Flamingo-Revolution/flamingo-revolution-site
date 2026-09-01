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

/** Albanian long date, matching the blog and referendum pages. */
export function formatArticleDate(value: string | Date | null): string {
	if (!value) return '';

	const date = typeof value === 'string' ? new Date(value) : value;
	if (Number.isNaN(date.getTime())) return '';

	return `${date.getUTCDate()} ${MONTHS_SQ[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
