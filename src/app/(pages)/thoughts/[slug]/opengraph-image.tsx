/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createServerClient } from "@pocketbase/config";
import { getThought, getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import { ImageResponse } from "next/og";
import type { ImageResponseOptions } from "next/server";

import { readFile } from "node:fs/promises";
import { dateToString } from "@/lib/utils/date";
import { bufferToData } from "@/lib/utils/image";
import sharp from "sharp";

export async function generateStaticParams() {
	const thoughtsResponse = await getThoughts(1, 20, { sort: "created" });

	if (isError(thoughtsResponse)) {
		console.error("Could not get thoughts");
		return [];
	}

	const thoughts = thoughtsResponse as Thought[];

	return thoughts.map((thought) => ({
		slug: thought.slug
	}));
}

const size = { width: 1200, height: 675 };

export const alt = "OpenGraph image";
export const contentType = "image/png";

const getFonts = async (fonts: string[]) => {
	const promises = fonts.map(async (font) => {
		try {
			const response = await readFile(`./public/fonts/${font}`);
			return response;
		} catch (error) {
			try {
				const response = await fetch(`${process.env.SITE_URL}/fonts/${font}`);
				return response.arrayBuffer();
			} catch (error) {
				throw new Error(`Could not get font ${font}`);
			}
		}
	});

	return Promise.all(promises);
};

const getScaledImage = async (url?: string, scaleFactor = 3) => {
	if (!url) return null;

	const response = await fetch(url);
	if (!response.ok)
		throw new Error(`Failed to fetch image: ${response.statusText}`);

	const buffer = await response.arrayBuffer();

	const image = sharp(Buffer.from(buffer));
	const metadata = await image.metadata();

	const width = metadata.width * scaleFactor;
	const height = metadata.height * scaleFactor;

	const resizedBuffer = await image
		.resize(width, height, {
			kernel: sharp.kernel.nearest // Preserve pixel art
		})
		.png()
		.toBuffer();

	return bufferToData("image/png", resizedBuffer);
};

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

	const fontData = await getFonts([
		"GeistMono-Regular-1-3-for-og.ttf",
		"PixelifySans-Regular.ttf"
	]);

	const fonts: ImageResponseOptions["fonts"] = [
		{
			name: "GeistMono",
			data: fontData[0],
			style: "normal",
			weight: 400
		},
		{
			name: "PixelifySans",
			data: fontData[1],
			style: "normal",
			weight: 400
		}
	];

	if (errored || !thought) {
		return await OpenGraphErrorImage({ fonts });
	}

	return await OpenGraphImage({ thought, fonts });
}

const OpenGraphErrorImage = async ({
	fonts
}: { fonts: ImageResponseOptions["fonts"] }) => {
	const image = await getScaledImage(`${process.env.SITE_URL}/img/teapot.webp`);

	return new ImageResponse(
		<div
			tw="relative flex w-full h-full bg-transparent"
			style={{ fontFamily: "PixelifySans" }}
		>
			<div
				tw="absolute flex flex-col inset-4 p-8 rounded-[2rem] overflow-hidden shadow-xl border-2 border-black/5"
				style={{
					background:
						"radial-gradient(circle at right top, rgb(224,191,81) 0%, rgb(230,230,230) 50%)"
				}}
			>
				{image && (
					<picture tw="ml-auto">
						<img
							alt="Teapot"
							src={image}
							tw="w-[47px] h-[46px]"
							width={235}
							height={230}
						/>
					</picture>
				)}

				<h1 tw="mt-auto w-4/5 text-7xl" style={{ fontFamily: "GeistMono" }}>
					Oops: I'm a teapot
				</h1>
				<p tw="text-4xl w-4/5" style={{ fontFamily: "GeistMono" }}>
					It seems we ran into some issues. Oh well. :dev sobbing in the back:
				</p>
				<div tw="flex justify-between text-4xl">
					<span>{process.env.SITE_NAME}</span>
				</div>
			</div>
		</div>,
		{
			...size,
			fonts
		}
	);
};

const OpenGraphImage = async ({
	thought,
	fonts
}: { thought: Thought; fonts: ImageResponseOptions["fonts"] }) => {
	const image = await getScaledImage(thought.hero.light);

	return new ImageResponse(
		<div
			tw="relative flex w-full h-full bg-transparent"
			style={{ fontFamily: "PixelifySans" }}
		>
			<div
				tw="absolute flex flex-col inset-4 p-8 rounded-[2rem] overflow-hidden shadow-xl border-2 border-black/5"
				style={{
					background:
						"radial-gradient(circle at right top, rgb(224,191,81) 0%, rgb(230,230,230) 50%)"
				}}
			>
				<div tw="flex justify-between">
					<div
						tw="flex"
						style={{
							gap: "1rem"
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
						<picture>
							<img
								alt="Thought's hero"
								src={image}
								tw="w-38 h-auto"
								width={66}
								height={38}
							/>
						</picture>
					)}
				</div>

				<h1 tw="mt-auto w-4/5 text-7xl" style={{ fontFamily: "GeistMono" }}>
					{thought?.title}
				</h1>
				<div tw="flex justify-between text-4xl">
					<time dateTime={thought?.created.toISOString()}>
						{thought ? dateToString(thought.created) : "At the end of times"}
					</time>

					<span>{process.env.SITE_NAME}</span>
				</div>
			</div>
		</div>,
		{
			...size,
			fonts: fonts
		}
	);
};
