'use client';

import { Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useWindowSize } from 'react-use';

import { DistortionEffect } from '@/components/three/distortionEffect';

export const HomeScene: React.FC = () => {
	const { width: windowWidth } = useWindowSize();
	const { resolvedTheme } = useTheme();

	return (
		<Canvas
			camera={{ position: [0, 0, 1] }}
			orthographic
			gl={{
				alpha: true,
				antialias: true,
				preserveDrawingBuffer: true
			}}
		>
			<Text
				position={[-windowWidth / 2 + 400 + 4 * 28, 0, 0]}
				fontSize={300}
				color={resolvedTheme === 'dark' ? 'rgb(232,232,232)' : 'rgb(18,18,18)'}
				anchorX="center"
				anchorY="middle"
				font="/fonts/PixelifySans-Regular.ttf"
				characters="abcdefghijklmnopqrstuvwxyz0123456789!"
			>
				cod3d
			</Text>

			<DistortionEffect
				strength={1}
				radius={0.15}
				gridSize={50}
				springStrength={0.5}
				damping={0.9}
			/>
		</Canvas>
	);
};
