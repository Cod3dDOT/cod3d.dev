'use client';

import AnimatedCursor from './AnimatedCursor';

export const Cursor = () => {
	return (
		<AnimatedCursor
			color="255,255,255"
			trailingSpeed={1}
			innerSize={8}
			outerSize={0}
			outerAlpha={1}
			innerStyle={{
				backgroundColor: 'rgb(var(--foreground))'
			}}
			outerStyle={{
				background: 'transparent',
				border: '2px solid rgb(var(--foreground))'
			}}
			clickables={[
				{
					target: '.thoughts-table-of-contents',
					outerSize: 5,
					innerSize: 0
				},
				{
					target: 'a,button',
					outerSize: 12,
					innerSize: 0
				}
			]}
		/>
	);
};
