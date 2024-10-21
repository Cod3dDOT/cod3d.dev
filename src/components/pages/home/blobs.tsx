import { headers } from 'next/headers';

export const ColorfulBlobs: React.FC = () => {
	// force dynamic
	const _ = headers();

	const seconds = Math.round(Date.now() / 1000);

	return (
		<>
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
					<ellipse rx="35" ry="35" cx="60" cy="60" className="fill-blue-400" />
					<ellipse
						rx="35"
						ry="35"
						cx="140"
						cy="140"
						className="fill-yellow-300"
					/>
				</g>
			</svg>
		</>
	);
};
