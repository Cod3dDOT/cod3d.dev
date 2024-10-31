import { Metadata } from 'next';
import { BreadcrumbList, WebPage, WithContext } from 'schema-dts';

import { Footer } from '@/components/footer';
import { HOST } from '@/lib/constants';
import { ReactLenis } from '@/lib/lenis';

export const metadata: Metadata = {
	title: "cod3d's projects",
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
		canonical: HOST + '/projects'
	},
	openGraph: {
		type: 'website',
		url: HOST + '/projects',
		title: "cod3d's projects",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		siteName: "cod3d's den",
		images: [
			{
				url: HOST + '/img/og/og.webp'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: "cod3d's projects",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		creator: '@cod3ddot',
		site: "cod3d's den",
		images: [
			{
				url: HOST + 'img/og/og.webp',
				width: 1200,
				height: 675,
				alt: "cod3d's den twitter image"
			}
		]
	}
};

const jsonLd: WithContext<WebPage> = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	url: HOST + '/projects/',
	mainEntityOfPage: {
		'@type': 'WebPage',
		'@id': HOST + '/projects/'
	},
	name: "cod3d's projects",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	image: HOST + '/img/og/og.webp',
	author: {
		'@type': 'Person',
		name: 'cod3d',
		url: 'https://github.com/cod3ddot'
	}
};

const jsonLdBreadcrumbList: WithContext<BreadcrumbList> = {
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'cod3d.dev',
			item: HOST
		},
		{
			'@type': 'ListItem',
			position: 2,
			name: 'projects',
			item: HOST + '/projects'
		}
	]
};

// revalidate at most every hour, in seconds
export const revalidate = 3600;
// export const experimental_ppr = true;

const ProjectsPage: React.FC = () => {
	// const thoughtsResponse = await getThoughts(1, 20, { sort: 'created' });

	// if (isError(thoughtsResponse)) {
	// 	return <PageError />;
	// }

	// const thoughts = thoughtsResponse as Thought[];

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
			<div className="h-screen">
				<main className="h-full bg-background relative md:px-24 px-10">
					<img
						src="/img/working-on-it.gif"
						alt="Working on it gif"
						width={1200}
						height={675}
						className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
					/>
				</main>
				<Footer />
			</div>
		</ReactLenis>
	);
};

export default ProjectsPage;
