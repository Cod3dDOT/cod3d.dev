'use client';

import { useScrollbar } from '@14islands/r3f-scroll-rig';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

const AsideFooter: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const container = useRef<HTMLBaseElement>(null);
	const [progress, setProgress] = useState(0);

	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		setHeight(container.current?.offsetHeight || 0);
	}, [container]);

	const prefersReducedMotion = usePrefersReducedMotion();

	const { onScroll } = useScrollbar();

	const scrollCallback = useCallback(
		({ scroll, limit }: { scroll: number; limit: number }) => {
			if (prefersReducedMotion) return;

			if (scroll < limit - height) return;
			const p = (limit - scroll) / height;

			setProgress(-p * 20);
		},
		[prefersReducedMotion, height]
	);

	useEffect(() => {
		onScroll(scrollCallback);
	}, [onScroll, scrollCallback]);

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
