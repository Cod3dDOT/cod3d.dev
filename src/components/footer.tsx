'use client';

import { remapRange } from '@/lib/math';
import { useLenis } from 'lenis/react';
import { useState } from 'react';

export const Footer = () => {
	const [progress, setProgress] = useState(0);
	useLenis(
		({ progress: p }) => {
			if (p < 0.8) return;
			const mapped = remapRange(p, 0.8, 1, 100, 0);
			if (Math.abs(mapped - progress) < 0.5) return;
			setProgress(mapped);
		},
		[progress]
	);

	return (
		<>
			<footer className="relative md:px-24 px-10 py-8 bg-background">
				<div className="flex mx-auto justify-between container xl:max-w-full">
					<p>
						<span>cod3d.dev</span>
						<span> @ 2024</span>
					</p>
					<p>Made with ❤️ and ☕</p>
				</div>
			</footer>
			<aside className="sticky bottom-0 w-full bg-background-dark py-16 -z-10 overflow-clip">
				<div
					style={{
						transform: `translate3d(0px, ${progress}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
					}}
					className="will-change-transform flex justify-center text-[10rem] text-center z-10"
				>
					<div className="hidden md:block">wooo</div>
					<div>👻</div>
				</div>
			</aside>
		</>
	);
};
