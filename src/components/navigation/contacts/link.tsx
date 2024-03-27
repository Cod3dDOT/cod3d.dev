'use client';

import { useInView } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';

import PokeballImage from '@/../public/pokeball.png';
import { randomIntFromInterval } from '@/lib/math';

export const ContactLink: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [delayedHover, setDelayedHover] = useState(false);
	const [played, setPlayed] = useState(false);
	const ref = useRef(null);
	const isInView = useInView(ref);

	useEffect(() => {
		if (!isInView) return;
		setTimeout(
			() => {
				setDelayedHover(true);
				setTimeout(() => {
					setPlayed(true);
				}, 2500);
			},
			randomIntFromInterval(0, 1000)
		);
	}, [isInView]);

	return (
		<div className="w-10 h-10" ref={ref}>
			{!delayedHover ? (
				<Image
					width={128}
					height={128}
					src={PokeballImage}
					alt="pokeball"
					className="w-full h-full scale-125"
				/>
			) : !played ? (
				<Image
					width={128}
					height={128}
					src="/pokeball-open.gif"
					alt="pokeball"
					className="w-full h-full scale-125"
				/>
			) : (
				<div className="fade-in duration-500 animate-in">{children}</div>
			)}
		</div>
	);
};
