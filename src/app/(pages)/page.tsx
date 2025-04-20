import type { WebPage, WithContext } from "schema-dts";

import { ColorfulBlobs } from "./(components)/blobs";
import { SyncedRotationWrapper } from "./(components)/syncedRotationWrapper";

export const revalidate = 3600;

const jsonLd: WithContext<WebPage> = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	url: process.env.SITE_URL,
	mainEntityOfPage: {
		"@type": "WebPage",
		"@id": process.env.SITE_URL
	},
	name: "cod3d's thoughts | A place where I share my struggles",
	description: "Probably trying to hack you. Or sleeping. Or both.",
	image: `${process.env.SITE_URL}/img/og/og.webp`,
	author: {
		"@type": "Person",
		name: "cod3d",
		url: "https://github.com/cod3ddot"
	}
};

export default function Home() {
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd)
				}}
			/>
			<main className="my-auto flex h-screen flex-col justify-center px-10 md:px-24">
				<h1 className="text-[4rem] sm:text-[5.65rem] md:text-[8rem]">
					cod3d.dev
				</h1>

				<p className="whitespace-pre">
					<span>Probably trying to hack you. </span>
					<br className="sm:hidden" />
					<span>Or sleeping.</span>
					<br />
					<span>Or both.</span>
				</p>

				<SyncedRotationWrapper>
					<ColorfulBlobs />
				</SyncedRotationWrapper>
			</main>
		</>
	);
}
