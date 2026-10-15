import type { Locale } from './site';

export type HomepageEvent = {
	slug: string;
	status: string;
	day: string;
	month: string;
	year: string;
	datetime: string;
	endDatetime?: string;
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

export type EventNoticeCopy = {
	eyebrow: string;
	detailsLabel: string;
	allEventsLabel: string;
	closeLabel: string;
};

export const eventNoticeCopy: Record<Locale, EventNoticeCopy> = {
	sq: {
		eyebrow: 'Aktivitet',
		detailsLabel: 'Shiko aktivitetin',
		allEventsLabel: 'Të gjitha aktivitetet',
		closeLabel: 'Mbyll njoftimin'
	},
	en: {
		eyebrow: 'Event',
		detailsLabel: 'View event',
		allEventsLabel: 'All events',
		closeLabel: 'Dismiss event notice'
	}
};

export const eventEndsAt = (event: HomepageEvent) => new Date(event.endDatetime ?? event.datetime).getTime();

export const getUpcomingEvents = (items: HomepageEvent[], now = new Date()) =>
	[...items]
		.filter((event) => eventEndsAt(event) >= now.getTime())
		.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

export const getPastEvents = (items: HomepageEvent[], now = new Date()) =>
	[...items]
		.filter((event) => eventEndsAt(event) < now.getTime())
		.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

export const homepageEvents: Record<Locale, HomepageEvent[]> = {
	sq: [
		{
			slug: 'insights-on-the-flamingo-revolution-hague',
			status: 'Ligjëratë publike',
			day: '17',
			month: 'Shtator',
			year: '2026',
			datetime: '2026-09-17T13:00:00+02:00',
			endDatetime: '2026-09-17T14:30:00+02:00',
			time: '13:00–14:30',
			title: 'Insights on The Flamingo Revolution in Albania',
			description:
				'Një vështrim kritik mbi lëvizjen Flamingo, marrëdhënien e arkitekturës me pushtetin dhe historinë e rezistencës qytetare në Shqipëri. Me Dea Buza dhe Kedis Burrja në Universitetin e Leiden-it.',
			venue: 'SPUI 3B.38 · Spui Campus (Universiteti i Leiden-it)',
			location: 'Hagë, Holandë',
			locationHref: 'https://www.google.com/maps/search/?api=1&query=Spui+5+2511+BL+The+Hague',
			admission: 'Hyrja falas',
			href: 'https://www.universiteitleiden.nl/en/events/2026/09/insights-on-the-flamingo-revolution-in-albania'
		},
		{
			slug: 'the-flamingo-revolution-amsterdam',
			status: 'Bisedë publike',
			day: '15',
			month: 'Shtator',
			year: '2026',
			datetime: '2026-09-15T20:00:00+02:00',
			endDatetime: '2026-09-15T21:30:00+02:00',
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
			slug: 'insights-on-the-flamingo-revolution-hague',
			status: 'Public lecture',
			day: '17',
			month: 'September',
			year: '2026',
			datetime: '2026-09-17T13:00:00+02:00',
			endDatetime: '2026-09-17T14:30:00+02:00',
			time: '13:00–14:30',
			title: 'Insights on The Flamingo Revolution in Albania',
			description:
				'A critical look at the Flamingo movement, the role of architecture in governance and power, and civic resistance in Albania. With Dea Buza and Kedis Burrja at Leiden University.',
			venue: 'SPUI 3B.38 · Spui Campus (Leiden University)',
			location: 'The Hague, the Netherlands',
			locationHref: 'https://www.google.com/maps/search/?api=1&query=Spui+5+2511+BL+The+Hague',
			admission: 'Free admission',
			href: 'https://www.universiteitleiden.nl/en/events/2026/09/insights-on-the-flamingo-revolution-in-albania'
		},
		{
			slug: 'the-flamingo-revolution-amsterdam',
			status: 'Public conversation',
			day: '15',
			month: 'September',
			year: '2026',
			datetime: '2026-09-15T20:00:00+02:00',
			endDatetime: '2026-09-15T21:30:00+02:00',
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
