'use client';

import {
	ScrollScene,
	ScrollSceneChildProps,
	UseCanvas
} from '@14islands/r3f-scroll-rig';
import { useTheme } from 'next-themes';
import { useRef } from 'react';

import { DistortionEffect } from '@/components/three/distortionEffect';
import { WebGLText } from '@/components/three/text';

export const HomepageTitle: React.FC = () => {
	const el = useRef<HTMLHeadingElement>(null);
	const { resolvedTheme } = useTheme();

	return (
		<>
			<h1
				ref={el}
				className="md:text-[8rem] sm:text-[5.65rem] text-[4rem] h-[1lh] text-transparent"
			>
				cod3d.dev
			</h1>
			<UseCanvas theme={resolvedTheme}>
				<ScrollScene track={el as React.RefObject<HTMLHeadingElement>}>
					{(props) => {
						const theme = (props as ScrollSceneChildProps & { theme: string })
							.theme;
						return (
							<>
								<WebGLText
									el={el as React.RefObject<HTMLHeadingElement>}
									{...props}
									color={
										theme === 'dark' ? 'rgb(232,232,232)' : 'rgb(18,18,18)'
									}
									font="/fonts/PixelifySans-Regular.ttf"
								>
									cod3d.dev
								</WebGLText>

								<DistortionEffect
									springStrength={0.5}
									damping={0.9}
									strength={0.2}
									radius={1.0}
									gridSize={40}
								/>
							</>
						);
					}}
				</ScrollScene>
			</UseCanvas>
		</>
	);
};
