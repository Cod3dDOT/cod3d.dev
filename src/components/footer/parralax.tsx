'use client';

import { remapRange } from '@/lib/utils/math';
import { useLenis } from 'lenis/react';
import { useState } from 'react';
import { FooterMon } from './pokemon';

export const AsideFooter: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const [progress, setProgress] = useState(0);
	useLenis(
		({ progress: p }) => {
			if (p < 0.5) return;
			const mapped = remapRange(p, 0.5, 1, 100, 0);
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
				{children}
			</div>
		</aside>
	);
};
