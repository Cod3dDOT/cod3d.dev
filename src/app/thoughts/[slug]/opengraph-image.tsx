import { createServerClient } from '@pocketbase/config';
import { getThought, getThoughts } from '@pocketbase/req';
import { Thought } from '@pocketbase/types';
import { isError } from '@pocketbase/utils';
import { clsx } from 'clsx';
import fs from 'fs';
import { ImageResponse } from 'next/og';
import { ImageResponseOptions } from 'next/server';
import path from 'path';
import sharp, { kernel } from 'sharp';
import { fileURLToPath } from 'url';

import { POCKETBASE_HOST } from '@/lib/constants';
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

const getFont = async () => {
	const response = await fs.promises.readFile(
		path.join(
			fileURLToPath(import.meta.url),
			'../../../../assets/fonts/PixelifySans-Regular.ttf'
		)
	);

	return new Uint8Array(response).buffer;
};

const getImage = async (hero: string) => {
	const response = await fetch(new URL(hero, POCKETBASE_HOST));

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

	const fonts: ImageResponseOptions['fonts'] = [
		{
			name: 'PixelifySans',
			data: await getFont(),
			style: 'normal',
			weight: 400
		}
	];

	const image = await getImage(thought?.hero.light || '');

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				tw={clsx('relative flex text-black w-full h-full bg-[#eee]')}
				style={{
					// background:
					// 	'radial-gradient(circle at left top, #3B82F6 0%, #eeeeee 90%)'
					backgroundColor: '#85b1f9',
					backgroundImage: `linear-gradient(white 2px, transparent 2px),
                                    linear-gradient(90deg, white 2px, transparent 2px),
                                    linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)`,
					backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
					backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px'
				}}
			>
				<div
					tw="absolute inset-8"
					style={{
						filter: 'blur(5px)',
						backgroundColor: '#85b1f9',
						backgroundImage: `linear-gradient(white 2px, transparent 2px),
                                    linear-gradient(90deg, white 2px, transparent 2px),
                                    linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)`,
						backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
						backgroundPosition:
							'-34px -34px, -34px -34px, -33px -33px, -33px -33px'
					}}
				/>
				<div
					tw="absolute flex flex-col inset-8 p-8 rounded-[2rem] overflow-hidden shadow-lg border-[1px] border-black/5 bg-opacity-50"
					style={{
						background:
							'radial-gradient(circle at right top, rgba(253,224,71,0.8) 0%, rgba(230,230,230,0.5) 60%)'
					}}
				>
					<div tw="flex justify-between">
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

					<h1 tw="mt-auto w-4/5 text-7xl">{thought?.title}</h1>
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
