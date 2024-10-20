import { WebPage, WithContext } from 'schema-dts';

import { GlitchText } from '@/components/effects/glitchText';
import { GrainyBackground } from '@/components/effects/grainyBackground';

// export const experimental_ppr = true;
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
	const now = new Date();
	const seconds = (now.getSeconds() + now.getMilliseconds() / 1000).toFixed(2);
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
					<style>
						{`
                            svg {
                                --delay: calc(${seconds} * -1s);
                            }
                        `}
					</style>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 200 200"
						className={`relative h-full aspect-square sm:ml-auto min-h-[62rem] [animation-delay:var(--delay)]
                     motion-safe:[animation-duration:32s] motion-reduce:[animation-duration:512s] will-change-transform animate-spin
                    sm:*:h-[42rem] sm:*:w-[42rem] *:h-[35rem] *:w-[35rem]`}
					>
						<defs>
							<filter
								id="GaussianBlur"
								filterUnits="objectBoundingBox"
								primitiveUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
								x="-50%"
								y="-50%"
								width="200%"
								height="200%"
							>
								<feGaussianBlur
									stdDeviation="10"
									in="SourceGraphic"
									result="blur"
								/>
							</filter>
						</defs>
						<g filter="url(#GaussianBlur)">
							<ellipse
								rx="35"
								ry="35"
								cx="60"
								cy="60"
								className="fill-blue-400"
							/>
							<ellipse
								rx="35"
								ry="35"
								cx="140"
								cy="140"
								className="fill-yellow-300"
							/>
						</g>
					</svg>
				</div>
			</main>
		</>
	);
}
