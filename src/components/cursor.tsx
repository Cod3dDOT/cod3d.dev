'use client';

import AnimatedCursor from 'react-animated-cursor';

import useIsTouchdevice from '@/lib/hooks/useIsTouchDevice';

export const LibCursor = () => {
	const isMobile = useIsTouchdevice();
	if (isMobile) return <></>;

	return (
		<AnimatedCursor
			color="255,255,255"
			trailingSpeed={1}
			innerSize={8}
			outerSize={0}
			outerAlpha={1}
			innerStyle={{
				backgroundColor: 'var(--foreground)'
			}}
			outerStyle={{
				background: 'transparent',
				border: '2px solid var(--foreground)'
			}}
			clickables={[
				{
					target: 'a,button',
					outerSize: 12,
					innerSize: 0
				}
			]}
		/>
	);
};
