import type { Locale } from './site';

export type HomepageEvent = {
	slug: string;
	status: string;
	day: string;
	month: string;
	year: string;
	datetime: string;
	time: string;
	title: string;
	description: string;
	venue: string;
	location: string;
	locationHref?: string;
	admission: string;
	href?: string;
	ticketHref?: string;
};

export type EventsSectionCopy = {
	eyebrow: string;
	title: string;
	description: string;
	dateLabel: string;
	timeLabel: string;
	venueLabel: string;
	admissionLabel: string;
	detailsLabel: string;
	ticketsLabel: string;
	previousLabel: string;
	nextLabel: string;
	carouselLabel: string;
};

export const eventsSectionCopy: Record<Locale, EventsSectionCopy> = {
	sq: {
		eyebrow: 'Së shpejti',
		title: 'Ku takohemi më pas',
		description: 'Protesta, diskutime dhe aktivitete të Revolucionit Flamingo, në Shqipëri dhe në diasporë.',
		dateLabel: 'Data',
		timeLabel: 'Ora',
		venueLabel: 'Vendi',
		admissionLabel: 'Hyrja',
		detailsLabel: 'Shiko aktivitetin',
		ticketsLabel: 'Rezervo falas',
		previousLabel: 'Aktiviteti i mëparshëm',
		nextLabel: 'Aktiviteti i ardhshëm',
		carouselLabel: 'Aktivitetet e Revolucionit Flamingo'
	},
	en: {
		eyebrow: 'On the agenda',
		title: 'Where we meet next',
		description: 'Protests, discussions and Flamingo Revolution events in Albania and across the diaspora.',
		dateLabel: 'Date',
		timeLabel: 'Time',
		venueLabel: 'Venue',
		admissionLabel: 'Admission',
		detailsLabel: 'View event',
		ticketsLabel: 'Reserve for free',
		previousLabel: 'Previous event',
		nextLabel: 'Next event',
		carouselLabel: 'Flamingo Revolution events'
	}
};

export const homepageEvents: Record<Locale, HomepageEvent[]> = {
	sq: [
		{
			slug: 'the-flamingo-revolution-amsterdam',
			status: 'Bisedë publike',
			day: '15',
			month: 'Shtator',
			year: '2026',
			datetime: '2026-09-15T20:00:00+02:00',
			time: '20:00–21:30',
			title: 'The Flamingo Revolution',
			description:
				'Çfarë roli luan arkitektura në qeverisjen shqiptare? Një bisedë e hapur me arkitektë, gazetarë dhe studiues mbi zhvillimin, pushtetin dhe rezistencën qytetare.',
			venue: 'IJzaal · Pakhuis de Zwijger',
			location: 'Amsterdam, Holandë',
			locationHref: 'https://www.google.com/maps/search/?api=1&query=Pakhuis+de+Zwijger+Amsterdam',
			admission: 'Hyrja falas',
			href: 'https://dezwijger.nl/programma/the-flamingo-revolution',
			ticketHref: 'https://tickets.dezwijger.nl/mtTicket/performance/10037041'
		}
	],
	en: [
		{
			slug: 'the-flamingo-revolution-amsterdam',
			status: 'Public conversation',
			day: '15',
			month: 'September',
			year: '2026',
			datetime: '2026-09-15T20:00:00+02:00',
			time: '20:00–21:30',
			title: 'The Flamingo Revolution',
			description:
				'What role does architecture play in Albanian governance? An open conversation with architects, journalists and researchers about development, power and civic resistance.',
			venue: 'IJzaal · Pakhuis de Zwijger',
			location: 'Amsterdam, the Netherlands',
			locationHref: 'https://www.google.com/maps/search/?api=1&query=Pakhuis+de+Zwijger+Amsterdam',
			admission: 'Free admission',
			href: 'https://dezwijger.nl/programma/the-flamingo-revolution',
			ticketHref: 'https://tickets.dezwijger.nl/mtTicket/performance/10037041'
		}
	]
};
