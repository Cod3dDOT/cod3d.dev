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
import { imageToData } from "@/lib/utils/image";

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

	// FIXME: this will fail if the image isn't a png
	// we can use sharp to convert the images (they are generated at build time anyways)
	const image = thought?.hero.light
		? await imageToData(thought?.hero.light)
		: null;

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
					{image && image.length !== 0 && (
						<picture>
							<img
								alt="Thought's hero"
								src={image}
								tw="w-38 h-auto object-cover"
								width={66}
								height={38}
								style={{
									// FIXME: Doesn't work (probably due to canvas imageSmoothingEnabled)
									// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
									imageRendering: "pixelated"
								}}
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
}
