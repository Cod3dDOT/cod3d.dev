/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const ColorfulBlobs: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 200 200"
			className="relative aspect-square animate-spin will-change-transform [animation-delay:var(--delay)] *:h-140 *:w-140 sm:*:h-168 sm:*:w-2xl motion-safe:[animation-duration:60s] motion-reduce:[animation-duration:3600s]"
		>
			<title>Colorful Blobs</title>
			<defs>
				{/** biome-ignore lint/correctness/useUniqueElementIds: none */}
				<filter id="GaussianBlur" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="10" in="SourceGraphic" result="blur" />
				</filter>
				{/** biome-ignore lint/correctness/useUniqueElementIds: none */}
				<filter id="GrainyTexture" x="-50%" y="-50%" width="200%" height="200%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="15"
						numOctaves="6"
						result="noise"
						stitchTiles="stitch"
					/>
					<feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
				</filter>
			</defs>
			<ellipse
				rx="35"
				ry="35"
				cx="60"
				cy="60"
				filter="url(#GaussianBlur)"
				className="fill-info"
			/>
			<ellipse
				rx="35"
				ry="35"
				cx="140"
				cy="140"
				filter="url(#GaussianBlur)"
				className="fill-warn"
			/>
		</svg>
	);
};
