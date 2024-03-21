'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
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
			<AnimatePresence>
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
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
