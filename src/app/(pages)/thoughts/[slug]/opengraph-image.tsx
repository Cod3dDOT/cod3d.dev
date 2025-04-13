import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ImageResponseOptions } from "next/server";
import { createServerClient } from "@pocketbase/config";
import { getThought, getThoughts } from "@pocketbase/req";
import { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import sharp, { kernel } from "sharp";

import { dateToString } from "@/lib/utils/date";

export async function generateStaticParams() {
	const thoughtsResponse = await getThoughts(1, 20, { sort: "created" });

	if (isError(thoughtsResponse)) {
		return [];
	}

	const thoughts = thoughtsResponse as Thought[];

	return thoughts.map((thought) => ({
		slug: thought.slug,
	}));
}

const size = { width: 1200, height: 675 };

export const alt = "OpenGraph image";
export const contentType = "image/png";

const getImage = async (hero: string) => {
	const response = await fetch(new URL(hero, process.env.NEXT_PUBLIC_URL));

	if (!response.ok) {
		return null;
	}

	const buffer = await response.arrayBuffer();

	return (
		"data:image/png;base64," +
		(
			await sharp(buffer)
				.png()
				.resize({
					width: size.width,
					height: size.height,
					kernel: kernel.nearest,
				})
				.toBuffer()
		).toString("base64")
	);
};

export default async function Image({
	params,
}: {
	params: { slug: string };
	id: string;
}) {
	const client = createServerClient();
	const thoughtResponse = await getThought(client, params.slug);

	const errored = isError(thoughtResponse);
	const thought = errored ? null : (thoughtResponse as Thought);

	const fonts: ImageResponseOptions["fonts"] = [
		{
			name: "GeistMono",
			data: await readFile(
				join(
					process.cwd(),
					"./src/assets/fonts/GeistMono-Regular-1.3.otf" // 1.3 is latest before new format, see https://github.com/vercel/geist-font/issues/91
				)
			),
			style: "normal",
			weight: 400,
		},
		{
			name: "PixelifySans",
			data: await readFile(
				join(
					process.cwd(),
					"./src/assets/fonts/PixelifySans-Regular.ttf"
				)
			),
			style: "normal",
			weight: 400,
		},
	];

	const image = await getImage(thought?.hero.light || "");

	return new ImageResponse(
		(
			<div
				tw="relative flex w-full h-full bg-transparent"
				style={{ fontFamily: "PixelifySans" }}
			>
				<div
					tw="absolute flex flex-col inset-4 p-8 rounded-[2rem] overflow-hidden shadow-xl border-2 border-black/5"
					style={{
						background:
							"radial-gradient(circle at right top, rgb(224,191,81) 0%, rgb(230,230,230) 50%)",
					}}
				>
					<div tw="flex justify-between">
						<div
							tw="flex"
							style={{
								gap: "1rem",
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
							<picture className="h-full w-full">
								<img
									alt="cod3d.dev"
									src={image}
									tw="mt-auto w-38 h-full"
									width={66}
									height={38}
									style={{
										imageRendering: "pixelated",
									}}
								/>
							</picture>
						)}
					</div>

					<h1
						tw="mt-auto w-4/5 text-7xl"
						style={{ fontFamily: "GeistMono" }}
					>
						{thought?.title}
					</h1>
					<div tw="flex justify-between text-4xl">
						<time dateTime={thought?.created.toISOString()}>
							{thought
								? dateToString(thought.created)
								: "At the end of times"}
						</time>

						<span>cod3d.dev</span>
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: fonts,
		}
	);
}
