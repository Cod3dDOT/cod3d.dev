import '@/app/styles/thoughts.css';

import { Metadata } from 'next';
import { BreadcrumbList, WebPage, WithContext } from 'schema-dts';

import { PageError } from '@/components/error';
import { Footer } from '@/components/footer';
import { ThoughtsTextReveal } from '@/components/pages/thoughts/textReveal';
import { Years } from '@/components/pages/thoughts/years';
import { ReactLenis } from '@/lib/lenis';
import { getThoughts } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';
import { isError } from '@/lib/pocketbase/utils';

export const metadata: Metadata = {
	title: "cod3d's thoughts | A place where I share my struggles",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	robots: {
		index: true,
		follow: true,
		noarchive: true,
		nosnippet: false,
		noimageindex: false
	},
	alternates: {
		canonical: 'https://cod3d.dev/thoughts',
		types: {
			'application/rss+xml': 'https://cod3d.dev/feed.xml'
		}
	},
	openGraph: {
		locale: 'en_US',
		type: 'website',
		url: 'https://cod3d.dev/thoughts',
		title: "cod3d's thoughts | A place where I share my struggles",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		siteName: "cod3d's den",
		images: [
			{
				url: '/img/og/og.webp'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: "cod3d's thoughts",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		creator: '@cod3ddot',
		images: {
			url: 'https://cod3d.dev/img/og/og.webp', // Must be an absolute URL
			alt: 'cod3d'
		}
	}
};

// revalidate at most every hour, in seconds
export const revalidate = 3600;
// export const experimental_ppr = true;

const jsonLd: WithContext<WebPage> = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	url: 'https://cod3d.dev/thoughts/',
	mainEntityOfPage: {
		'@type': 'WebPage',
		'@id': 'https://cod3d.dev/thoughts/'
	},
	name: "cod3d's thoughts | A place where I share my struggles",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	image: 'https://cod3d.dev/img/og/og.webp',
	author: {
		'@type': 'Person',
		name: 'cod3d',
		url: 'https://github.com/cod3ddot'
	}
};

const jsonLdBreadcrumbList: WithContext<BreadcrumbList> = {
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	name: 'BreadcrumbList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'cod3d.dev',
			item: 'https://cod3d.dev'
		},
		{
			'@type': 'ListItem',
			position: 2,
			name: 'thoughts',
			item: 'https://cod3d.dev/thoughts'
		}
	]
};

const ThoughtsPage: React.FC = async () => {
	const thoughtsResponse = await getThoughts(1, 20, { sort: 'created' });

	if (isError(thoughtsResponse)) {
		return <PageError />;
	}

	const thoughts = thoughtsResponse as Thought[];

	return (
		<ReactLenis root>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd)
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLdBreadcrumbList)
				}}
			/>
			<main className="bg-background relative md:px-24 px-10">
				<ThoughtsTextReveal />
				<Years thoughts={thoughts} />
			</main>
			<Footer />
		</ReactLenis>
	);
};

export default ThoughtsPage;
