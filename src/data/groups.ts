export type BrandAsset = {
	white?: string;
	black?: string;
	primary?: string;
};

export type GroupBrand = {
	icon?: BrandAsset;
	logo: BrandAsset;
};

export type Group = {
	id: string;
	name: string;
	href: string;
	instagram?: string;
	brand: GroupBrand;
};

export type GroupHighlightClass = {
	class?: string;
};

export type GroupHighlightOverride = {
	container?: GroupHighlightClass;
	icon?: GroupHighlightClass;
	logo?: GroupHighlightClass;
};

export const groups = [
	{
		id: 'flamingo',
		name: 'Revolucioni Flamingo',
		href: 'https://www.flamingorevolution.eu',
		instagram: 'https://instagram.com/flamingo.tv',
		brand: {
			icon: {
				white: '/images/flamingo-mark-dark.svg',
				black: '/images/flamingo-mark-light.svg'
			},
			logo: {
				white: '/images/flamingo-wordmark-dark.svg',
				black: '/images/flamingo-wordmark-light.svg'
			}
		}
	},
	{
		id: 'lumi',
		name: 'LUMI – Movement for Water, Environment, and Integration',
		href: 'https://lumi.al/',
		instagram: 'https://instagram.com/lumi',
		brand: {
			// icon: {
			// 	white: "/images/groups/lumi/icon/white.svg",
			// 	black: "/images/groups/lumi/icon/black.svg"
			// },
			logo: {
				white: '/images/groups/lumi/logo/white.svg',
				black: '/images/groups/lumi/logo/black.svg',
				primary: '/images/groups/lumi/logo/primary.svg'
			}
		}
	},
	{
		id: 'resu',
		name: 'Reinforce Sustainability',
		href: 'https://reinforcesustainability.com',
		brand: {
			// icon: {
			// 	primary: "/images/groups/resu/logo/primary.svg"
			// },
			logo: {
				white: '/images/groups/resu/logo/white.svg',
				black: '/images/groups/resu/logo/black.svg',
				primary: '/images/groups/resu/logo/primary.svg'
			}
		}
	},
	{
		id: 'albnatyra',
		name: 'AlbNatyra',
		href: 'https://www.albnatyra.org/rreth-nesh/',
		brand: {
			icon: {
				primary: '/images/groups/albnatyra/logo/primary.png'
			},
			logo: {
				primary: '/images/groups/albnatyra/logo/primary.png'
			}
		}
	},
	{
		id: 'udacn',
		name: 'United Diaspora for Albania Civic Network',
		href: 'https://albaniandiasporacivicnetwork.com/sq/',
		instagram: 'https://instagram.com/uda.cn',
		brand: {
			// icon: {
			// 	white: "/images/groups/udacn/logo/primary.png",
			// 	black: "/images/groups/udacn/logo/primary.png",
			// 	primary: "/images/groups/udacn/logo/primary.png"
			// },
			logo: {
				black: '/images/groups/udacn/logo/black.png',
				white: '/images/groups/udacn/logo/white.png',
				primary: '/images/groups/udacn/logo/primary.png'
			}
		}
	}
] as const satisfies Readonly<Group[]>;

export type GroupId = (typeof groups)[number]['id'];

export function groupInitials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return '';
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}

export function getGroupHighlightImage(group: Group) {
	const logo = group.brand.logo;
	const icon = group.brand.icon;

	const source =
		logo.primary || logo.black || logo.white
			? { asset: logo, kind: 'logo' as const }
			: icon?.black || icon?.white || icon?.primary
				? { asset: icon, kind: 'icon' as const }
				: undefined;

	if (!source) return undefined;

	return {
		kind: source.kind,
		black: source.asset.black,
		white: source.asset.white,
		primary: source.asset.primary
	};
}