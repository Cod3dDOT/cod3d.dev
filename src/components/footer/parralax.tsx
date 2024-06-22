'use client';

import { remapRange } from '@/lib/math';
import { useLenis } from 'lenis/react';
import { useState } from 'react';
import Image from 'next/image';

export const AsideFooter: React.FC<{
	pokemon: string;
	description: string;
	sprite: string;
	color: string;
}> = ({ pokemon, description, sprite, color }) => {
	const [progress, setProgress] = useState(0);
	useLenis(
		({ progress: p }) => {
			if (p < 0.8) return;
			const mapped = remapRange(p, 0.85, 1, 100, 0);
			if (Math.abs(mapped - progress) < 0.5) return;
			setProgress(mapped);
		},
		[progress]
	);

	return (
		<aside className="sticky bottom-0 w-full bg-background-dark py-16 -z-10 overflow-clip">
			<div
				style={{
					transform: `translate3d(0px, ${progress}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
				}}
				className="will-change-transform flex flex-col md:flex-row justify-center items-center z-10"
			>
				<div className="max-w-prose px-24 space-y-4">
					<div className="text-7xl" style={{ color }}>
						{pokemon}
					</div>
					<div>{description}</div>
				</div>
				<Image
					src={sprite}
					alt={pokemon}
					width={96}
					height={96}
					quality={100}
					className="w-[50vw] max-w-96 pixelated"
				/>
			</div>
		</aside>
	);
};
