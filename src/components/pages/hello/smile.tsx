'use client';

import { eventBus } from '@/lib/eventbus';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef } from 'react';
import { useMouse, useWindowSize } from 'react-use';

export const Smile: React.FC = () => {
	const screenRef = useRef<HTMLDivElement>(null);
	const { docX, docY } = useMouse(screenRef);
	const { width, height } = useWindowSize();

	const { theme } = useTheme();

	const eyeScale = useSpring(1);
	const position = useMotionValue('0%');
	const positionSpring = useSpring(position);
	const rotation = useMotionValue(0);
	const rotationSpring = useSpring(rotation);

	const onThemeChange = () => {
		eyeScale.set(0.8);
		setTimeout(() => {
			eyeScale.set(1);
		}, 1000);
	};

	const onNavToggle = useCallback(
		(data: { on: boolean }) => {
			position.set(data.on ? '-200%' : '0%');

			rotation.set(data.on ? -45 : 0);
		},
		[position, rotation]
	);

	useEffect(() => {
		onThemeChange();
	}, [theme]);

	useEffect(() => {
		eventBus.on('nav:toggle', onNavToggle);

		return () => {
			eventBus.remove('nav:toggle', onNavToggle);
		};
	}, []);

	return (
		<div
			className="w-full h-screen flex justify-center items-center overflow-hidden"
			ref={screenRef}
		>
			<motion.div
				className="absolute h-full aspect-square"
				style={{ x: positionSpring, rotate: rotationSpring }}
			>
				<motion.svg
					viewBox="0 0 10 10"
					className="absolute top-1/3 left-32 w-64 h-64"
					style={{
						scale: eyeScale
					}}
				>
					<motion.circle
						r="4"
						cx="5"
						cy="5"
						className="fill-foreground"
						style={{
							x: (docX / width) * 2 + '%',
							y: (docY / height) * 2 + '%'
						}}
					/>
				</motion.svg>
				<motion.svg
					viewBox="0 0 10 10"
					className="absolute top-1/3 right-32 w-64 h-64"
					style={{
						scale: eyeScale
					}}
				>
					<motion.circle
						r="4"
						cx="5"
						cy="5"
						className="fill-foreground"
						style={{
							x: (docX / width) * 2 + '%',
							y: (docY / height) * 2 + '%'
						}}
					/>
				</motion.svg>
				<motion.svg
					viewBox="0 0 10 10"
					className="absolute bottom-0 left-1/2 w-64 h-64"
					style={{ x: '-50%', y: 0 }}
				>
					<motion.path
						d="M 1 1 C 3 3, 7 3, 9 1"
						className="fill-transparent stroke-foreground"
						style={{
							x: (docX / width) * 4 + '%',
							y: (docY / height) * 4 + '%'
						}}
					/>
				</motion.svg>
			</motion.div>
		</div>
	);
};
