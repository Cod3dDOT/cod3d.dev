'use client';

import { remapRange } from '@/lib/utils/math';
import { useLenis } from 'lenis/react';
import { useState } from 'react';

const AsideFooter: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const [progress, setProgress] = useState(0);
	useLenis(
		({ progress: p }) => {
			if (p < 0.5) return;
			const mapped = remapRange(p, 0.5, 1, 100, 0);
			if (Math.abs(mapped - progress) < 0.25) return;
			setProgress(mapped);
		},
		[progress]
	);

	return (
		<aside className="sticky bottom-0 w-full bg-background-dark -z-10 overflow-clip px-12 md:px-24">
			<div
				style={{
					transform: `translate3d(0px, ${progress}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
				}}
				className="will-change-transform flex flex-col md:flex-row z-10 h-[50vh] justify-center md:justify-normal items-center"
			>
				{children}
			</div>
		</aside>
	);
};

export default AsideFooter;
