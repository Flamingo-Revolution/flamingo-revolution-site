import type { FAQ } from "../../../data/referendumFaq";

export type ActionConfig = {
	enabled: boolean;
	label: string;
	href: string;
};

export type FAQSectionProps = {
	faqs: FAQ[];
	title?: string;
	faq?: Partial<ActionConfig>;
};
