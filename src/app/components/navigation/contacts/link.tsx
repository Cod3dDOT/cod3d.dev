'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';

import PokeBall from '@/../public/pokeball.png';
import PokeBallGif from '@/../public/pokeball-open.gif';

function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

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
				}, 2800);
			},
			randomIntFromInterval(0, 1000)
		);
	}, [isInView]);

	return (
		<div className="cursor w-10 h-10" ref={ref}>
			<AnimatePresence>
				{!delayedHover ? (
					<Image
						src={PokeBall}
						alt="pokeball"
						className="w-full h-full scale-125"
					/>
				) : !played ? (
					<Image
						src={PokeBallGif}
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
