"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

import { useDeviceDetection } from "@/lib/hooks/useDeviceDetection";

const AsideFooter: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	const container = useRef<HTMLBaseElement>(null);
	const [progress, setProgress] = useState(0);

	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		setHeight(container.current?.offsetHeight || 0);
	}, [container]);

	const { isReducedMotion } = useDeviceDetection();

	useLenis(
		({ scroll, limit }) => {
			if (isReducedMotion) return;

			if (scroll < limit - height) return;
			const p = (limit - scroll) / height;

			setProgress(-p * 20);
		},
		[height, isReducedMotion]
	);

	return (
		<aside
			ref={container}
			className="bg-container -z-10 block w-full overflow-clip px-12 md:px-24 print:hidden"
		>
			<div
				style={{
					transform: `translate3d(0px, ${progress.toString()}%, 0px)`,
				}}
				className="z-10 flex h-[50vh] flex-col items-center justify-center will-change-transform md:flex-row md:justify-normal"
			>
				{children}
			</div>
		</aside>
	);
};

export default AsideFooter;
