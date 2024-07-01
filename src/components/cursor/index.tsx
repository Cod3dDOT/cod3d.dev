'use client';

import CursorEditIcon from '../icons/cursor/edit';
import AnimatedCursor from './AnimatedCursor';

export const Cursor: React.FC<{ nonce?: string }> = ({ nonce }) => {
	return (
		<AnimatedCursor
			nonce={nonce}
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
					target: 'a,button',
					outerSize: 12,
					innerSize: 0
				},
				{
					target: 'pre',
					outerSize: 0,
					innerSize: 0,
					innerScale: 0,
					outerScale: 0,
					children: <CursorEditIcon className="w-8 h-8 fill-current" />
				}
			]}
		/>
	);
};
