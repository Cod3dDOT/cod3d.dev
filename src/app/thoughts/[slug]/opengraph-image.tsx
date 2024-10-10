import { ImageResponse } from 'next/og';
import { ImageResponseOptions } from 'next/server';

import { getThought } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';
import { isError } from '@/lib/pocketbase/utils';
import { dateToString } from '@/lib/utils/date';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = "Cod3d's thoughts";
export const size = {
	width: 1200,
	height: 675
};

export const contentType = 'image/png';

const getFont = async () => {
	const response = await fetch(
		new URL(
			'../../../../public/fonts/PixelifySans-Regular.ttf',
			import.meta.url
		)
	);
	const font = await response.arrayBuffer();

	return font;
};

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
	const thoughtResponse = await getThought(params.slug);
	const fonts: ImageResponseOptions['fonts'] = [
		{
			name: 'PixelifySans',
			data: await getFont(),
			style: 'normal',
			weight: 400
		}
	];

	const errored = isError(thoughtResponse);
	const thought = errored ? null : (thoughtResponse as Thought);

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					color: 'black',
					backgroundColor: '#eee',
					width: '100%',
					height: '100%',
					display: 'flex',
					position: 'relative',
					background:
						'radial-gradient(circle at left top, rgb(59,130,246) 0%, white 100%)'
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						position: 'absolute',
						top: '2rem',
						bottom: '2rem',
						left: '2rem',
						right: '2rem',
						padding: '2rem',
						backgroundColor: 'rgb(230,230,230)',
						borderRadius: '2rem',
						overflow: 'hidden'
					}}
				>
					<div style={{ display: 'flex', gap: '0.5rem' }}>
						{thought?.tags.map((tag, i) => (
							<div
								key={tag + i}
								style={{
									fontSize: '2rem',
									whiteSpace: 'nowrap',
									backdropFilter: 'blur(10px)',
									backgroundColor: 'rgba(255, 255, 255)',
									padding: '1rem 2rem',
									borderRadius: '10rem'
								}}
							>
								{tag}
							</div>
						))}
					</div>
					<h1 style={{ fontSize: '4rem', marginTop: 'auto', width: '80%' }}>
						{thought?.title}
					</h1>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							fontSize: '2rem'
						}}
					>
						<time dateTime={thought?.created}>
							{thought
								? dateToString(new Date(thought.created))
								: 'At the end of times'}
						</time>

						<span>cod3d.dev</span>
					</div>

					<div
						style={{
							position: 'absolute',
							top: '-10rem',
							right: '-10rem',
							width: '40rem',
							height: '40rem',
							background:
								'radial-gradient(circle at right top, rgb(59,130,246) 40%, rgba(230,230,230, 0) 70%)'
						}}
					/>
				</div>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: fonts
		}
	);
}
