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

export const NotFound404WebGL: React.FC = () => {
	const el = useRef<HTMLHeadingElement>(null);
	const { resolvedTheme } = useTheme();

	return (
		<>
			<h1
				ref={el}
				className="lg:text-[32rem] md:text-[18rem] text-[8rem] h-[1lh] text-transparent"
			>
				404
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
									404
								</WebGLText>

								<DistortionEffect
									springStrength={0.5}
									damping={0.9}
									strength={0.5}
									radius={1.0}
									gridSize={20}
								/>
							</>
						);
					}}
				</ScrollScene>
			</UseCanvas>
		</>
	);
};
