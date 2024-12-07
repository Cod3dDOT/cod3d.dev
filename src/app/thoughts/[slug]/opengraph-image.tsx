import { createServerClient } from '@pocketbase/config';
import { getThought, getThoughts } from '@pocketbase/req';
import { Thought } from '@pocketbase/types';
import { isError } from '@pocketbase/utils';
import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { ImageResponseOptions } from 'next/server';
import path from 'path';
import sharp, { kernel } from 'sharp';

import { dateToString } from '@/lib/utils/date';

export async function generateStaticParams() {
	const thoughtsResponse = await getThoughts(1, 20, { sort: 'created' });

	if (isError(thoughtsResponse)) {
		return [];
	}

	const thoughts = thoughtsResponse as Thought[];

	return thoughts.map((thought) => ({
		slug: thought.slug
	}));
}

const size = { width: 1200, height: 675 };

const getFonts = async () => {
	const fonts = ['PixelifySans-Regular.ttf', 'GeistMono-Regular.ttf'];
	const promises = fonts.map(async (font) => {
		const response = await readFile(
			path.join(process.cwd(), `./src/assets/fonts/${font}`)
		);

		return new Uint8Array(response).buffer;
	});

	return Promise.all(promises);
};

const getImage = async (hero: string) => {
	const response = await fetch('https://cod3d.dev/' + hero);

	if (!response.ok) {
		return null;
	}

	const buffer = await response.arrayBuffer();

	return (
		'data:image/png;base64,' +
		(
			await sharp(buffer)
				.png()
				.resize({
					width: size.width,
					height: size.height,
					kernel: kernel.nearest
				})
				.toBuffer()
		).toString('base64')
	);
};

export const alt = 'OpenGraph image';
export const contentType = 'image/png';

export default async function Image({
	params
}: {
	params: { slug: string };
	id: string;
}) {
	const client = createServerClient();
	const thoughtResponse = await getThought(client, params.slug);

	const errored = isError(thoughtResponse);
	const thought = errored ? null : (thoughtResponse as Thought);

	const [geistFont, pixelifyFont] = await getFonts();

	const fonts: ImageResponseOptions['fonts'] = [
		{
			name: 'Geist',
			data: geistFont,
			style: 'normal',
			weight: 400
		},
		{
			name: 'PixelifySans',
			data: pixelifyFont,
			style: 'normal',
			weight: 400
		}
	];

	const image = await getImage(thought?.hero.light || '');

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div tw="relative flex text-white w-full h-full bg-transparent">
				<div
					tw="absolute flex flex-col inset-4 p-8 rounded-[2rem] overflow-hidden shadow-xl border-[1px] border-black/5 bg-opacity-50"
					style={{
						background:
							'radial-gradient(circle at right top, rgba(253,224,71,1) 0%, #468EE1 60%)'
					}}
				>
					<div tw="flex justify-between text-black">
						<div
							tw="flex"
							style={{
								gap: '1rem'
							}}
						>
							{thought?.tags.slice(0, 3).map((tag, i) => (
								<div
									key={tag + i.toString()}
									tw="text-3xl bg-[#e6e6e6] border-4 border-[#3B82F6] py-5 px-10 rounded-full"
								>
									{tag}
								</div>
							))}
						</div>
						{image && (
							<img
								src={image}
								tw="mt-auto w-36 h-full"
								width={66}
								height={38}
								style={{
									imageRendering: 'pixelated'
								}}
							/>
						)}
					</div>

					<h1 tw="mt-auto w-4/5 text-7xl" style={{ fontFamily: 'GeistMono' }}>
						{thought?.title}
					</h1>
					<div tw="flex justify-between text-3xl">
						<time dateTime={thought?.created.toISOString()}>
							{thought ? dateToString(thought.created) : 'At the end of times'}
						</time>

						<span>cod3d.dev</span>
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: fonts
		}
	);
}
