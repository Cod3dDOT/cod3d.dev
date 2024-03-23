import { ImageResponse } from 'next/og';

import { getThought } from '@/lib/pocketbase/req';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
	width: 1200,
	height: 675
};

export const contentType = 'image/png';

const getFont = async () => {
	const response = await fetch(
		new URL('./PixelifySans-Regular.ttf', import.meta.url)
	);
	const font = await response.arrayBuffer();

	return font;
};

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
	const thought = await getThought(params.slug);

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 128,
					backgroundColor: '#111',
					padding: '7rem 8rem',
					color: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					position: 'relative',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<span style={{ color: 'white' }}>cod3d.dev</span>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						fontSize: 64,
						marginTop: 'auto'
					}}
				>
					<span>Thought:</span>
					<br />
					<span>{thought.name}</span>
				</div>
				<div
					style={{
						position: 'absolute',
						top: '-16rem',
						right: '-16rem',
						width: '36rem',
						height: '36rem',
						borderRadius: '999px',
						filter: 'blur(50px)',
						backgroundColor: '#34AAFF'
					}}
				/>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				{
					name: 'Inter',
					data: await getFont(),
					style: 'normal',
					weight: 400
				}
			]
		}
	);
}
