import { Suspense } from 'react';
import { WebPage, WithContext } from 'schema-dts';

import { GlitchText } from '@/components/effects/glitchText';
import { GrainyBackground } from '@/components/effects/grainyBackground';
import { ColorfulBlobs } from '@/components/pages/home/blobs';

export const experimental_ppr = true;
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
				<h1 className="md:text-[8rem] sm:text-[5.65rem] text-[4rem]">
					cod3d.dev
				</h1>

				<p className="whitespace-pre">
					<span>Probably trying to hack you. </span>
					<br className="sm:hidden" />
					<span>Or sleeping.</span>
					<br />
					<GlitchText as="span" text="Or both." />
				</p>

				<div className="absolute inset-0 right-0 -z-10 overflow-hidden flex lg:justify-center lg:items-center">
					<Suspense>
						<ColorfulBlobs />
					</Suspense>
				</div>
			</main>
		</>
	);
}
