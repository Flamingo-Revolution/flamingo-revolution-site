export const DEFAULT_SITE_ORIGIN = "https://www.flamingorevolution.eu";
export const SITE_EMAIL = "info@flamingorevolution.eu";

export type SeoLocale = "sq" | "en";

export type BreadcrumbItem = {
	name: string;
	path: string;
};

export type FaqJsonLdItem = {
	title: string;
	content: string;
};

export function getSiteOrigin(site?: URL | string): string {
	const fromSite = typeof site === "string" ? site : site?.toString();
	return (fromSite || DEFAULT_SITE_ORIGIN).replace(/\/$/, "");
}

export function toAbsoluteUrl(pathOrUrl: string, origin: string = DEFAULT_SITE_ORIGIN): string {
	const trimmed = pathOrUrl.trim();
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
	const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
	return `${origin.replace(/\/$/, "")}${path}`;
}

export function serializeJsonLd(data: object): string {
	return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function plainTextFromHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function siteNameFor(locale: SeoLocale): string {
	return locale === "sq" ? "Revolucioni Flamingo" : "Flamingo Revolution";
}

function alternateNameFor(locale: SeoLocale): string {
	return locale === "sq" ? "Flamingo Revolution" : "Revolucioni Flamingo";
}

export function organizationId(origin: string): string {
	return `${origin}/#organization`;
}

export function websiteId(origin: string): string {
	return `${origin}/#website`;
}

export function buildOrganizationStructuredData(input: { origin: string; locale: SeoLocale }): object {
	const { origin, locale } = input;
	const name = siteNameFor(locale);

	return {
		"@type": "Organization",
		"@id": organizationId(origin),
		name,
		alternateName: alternateNameFor(locale),
		url: `${origin}/`,
		email: SITE_EMAIL,
		logo: toAbsoluteUrl("/icon-192.png", origin),
		contactPoint: {
			"@type": "ContactPoint",
			email: SITE_EMAIL,
			contactType: "public"
		},
		sameAs: [
			"https://www.youtube.com/@flamingotelevision",
			"https://www.instagram.com/flamingotelevision",
			"https://x.com/Flamingo_TV"
		]
	};
}

export function buildWebSiteStructuredData(input: {
	origin: string;
	locale: SeoLocale;
	description: string;
}): object {
	const { origin, locale, description } = input;
	const name = siteNameFor(locale);

	return {
		"@type": "WebSite",
		"@id": websiteId(origin),
		url: `${origin}/`,
		name,
		alternateName: alternateNameFor(locale),
		description,
		inLanguage: locale === "sq" ? "sq-AL" : "en",
		publisher: { "@id": organizationId(origin) }
	};
}

export function buildWebPageStructuredData(input: {
	type?: "WebPage" | "AboutPage" | "CollectionPage" | "Article" | "BlogPosting" | "NewsArticle";
	origin: string;
	url: string;
	name: string;
	description: string;
	locale: SeoLocale;
	image?: string;
	publishedTime?: Date;
	modifiedTime?: Date;
	authorName?: string;
}): object {
	const {
		type = "WebPage",
		origin,
		url,
		name,
		description,
		locale,
		image,
		publishedTime,
		modifiedTime,
		authorName
	} = input;
	const isArticle = type === "Article" || type === "BlogPosting" || type === "NewsArticle";
	const orgId = organizationId(origin);

	return {
		"@type": type,
		"@id": `${url}#webpage`,
		url,
		name,
		description,
		inLanguage: locale === "sq" ? "sq-AL" : "en",
		isPartOf: { "@id": websiteId(origin) },
		about: { "@id": orgId },
		...(isArticle
			? {
					headline: name,
					image,
					datePublished: publishedTime?.toISOString(),
					dateModified: (modifiedTime ?? publishedTime)?.toISOString(),
					author: authorName ? { "@type": "Person", name: authorName } : { "@id": orgId },
					publisher: { "@id": orgId }
				}
			: {})
	};
}

export function buildFaqPageStructuredData(faqs: FaqJsonLdItem[]): object {
	return {
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.title,
			acceptedAnswer: {
				"@type": "Answer",
				text: plainTextFromHtml(faq.content)
			}
		}))
	};
}

export function buildBreadcrumbStructuredData(origin: string, items: BreadcrumbItem[]): object {
	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: toAbsoluteUrl(item.path, origin)
		}))
	};
}
