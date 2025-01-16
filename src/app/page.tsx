import '@app/styles/glitch.css';

import { Suspense } from 'react';
import { WebPage, WithContext } from 'schema-dts';

import { GlitchText } from '@/components/effects/glitchText';
import { GrainyBackground } from '@/components/effects/grainyBackground';
import { ColorfulBlobs } from '@/components/pages/home/blobs';
import { SyncedRotationWrapper } from '@/components/pages/home/syncedRotationWrapper';
import { HomepageTitle } from '@/components/pages/home/test';

export const revalidate = 3600;

const jsonLd: WithContext<WebPage> = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	url: 'https://cod3d.dev/',
	mainEntityOfPage: {
		'@type': 'WebPage',
		'@id': 'https://cod3d.dev/'
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

export default function Home() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd)
				}}
			/>
			<main className="h-screen flex flex-col justify-center my-auto bg-grainy md:px-24 px-10">
				<GrainyBackground />

				<Suspense>
					<HomepageTitle />
				</Suspense>

				<p className="whitespace-pre">
					<span>Probably trying to hack you. </span>
					<br className="sm:hidden" />
					<span>Or sleeping.</span>
					<br />
					<GlitchText text="Or both." />
				</p>

				<SyncedRotationWrapper>
					<ColorfulBlobs />
				</SyncedRotationWrapper>
			</main>
		</>
	);
}
