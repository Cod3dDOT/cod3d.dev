'use client';

import { useMemo, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { useLenis } from '@/lib/lenis';

const AsideFooter: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const container = useRef<HTMLBaseElement>(null);
	const [progress, setProgress] = useState(0);

	const height = useMemo(() => {
		const rect = container.current?.getBoundingClientRect();
		return rect?.height || 0;
	}, [container.current]);

	const prefersReducedMotion = usePrefersReducedMotion();

	useLenis(
		({ scroll, dimensions }) => {
			if (prefersReducedMotion) return;

			if (scroll < dimensions.limit.y - height) return;
			const p = (dimensions.limit.y - scroll) / height;

			setProgress(-p * 20);
		},
		[height, prefersReducedMotion]
	);

	return (
		<aside
			ref={container}
			className="print:hidden block w-full bg-background-dark -z-10 overflow-clip px-12 md:px-24"
		>
			<div
				style={{
					transform: `translate3d(0px, ${progress.toString()}%, 0px)`
				}}
				className="will-change-transform flex flex-col md:flex-row z-10 h-[50vh] justify-center md:justify-normal items-center"
			>
				{children}
			</div>
		</aside>
	);
};

export default AsideFooter;
