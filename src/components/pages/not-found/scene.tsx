'use client';

import { Image, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { memo } from 'react';

import { DistortionEffect } from '@/components/three/distortionEffect';

const _Scene: React.FC = () => {
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
				fontSize={800}
				color={resolvedTheme === 'dark' ? 'rgb(232,232,232)' : 'rgb(18,18,18)'}
				anchorX="center"
				anchorY="middle"
				font="/fonts/PixelifySans-Regular.ttf"
				characters="abcdefghijklmnopqrstuvwxyz0123456789!"
			>
				404
			</Text>

			<Image scale={1} url="/img/download.png" />

			<DistortionEffect
				strength={0.5}
				radius={1.0}
				gridSize={20}
				springStrength={0.5}
				damping={0.9}
			/>
		</Canvas>
	);
};

export default memo(_Scene);
