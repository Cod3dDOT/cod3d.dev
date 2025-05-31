/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from "react";

import { cn } from "@/lib/utils/cn";
import { imageToData } from "@/lib/utils/image";
import { type Pokemon, getRandomPokemon } from "@/lib/utils/mons";
import { PrintFooter } from "./printFooter";

const _Footer: React.FC = async () => {
	let pokemon: Pokemon;
	try {
		pokemon = await getRandomPokemon(); // FIXME: some weird SSL version error
	} catch (e) {
		pokemon = {
			id: 175,
			name: "Togepi",
			description: "Oops! It seems something went wrong. Togepi is now sad.",
			class: "i175",
			sprite: imageToData(`${process.env.SITE_URL}/img/sad-togepi.webp`)
		};
	}

	return (
		<>
			<footer className="bg-background px-10 py-8 transition-[background-color] md:px-20">
				<div className="container mx-auto flex justify-between xl:max-w-full">
					<p>
						<span>{process.env.SITE_NAME}</span>
						<span> @ 2024</span>
					</p>
					<p>Made with ☕</p>
				</div>
			</footer>

			<PrintFooter />

			<link rel="stylesheet" href="/generated-assets/mons.css" />

			<aside className="-z-10 parallax-footer relative flex h-[50vh] w-full items-center overflow-clip bg-container px-12 transition-[background-color] md:px-24 print:hidden">
				{/* for pokemon color variables to work */}
				<div className="mons">
					<div
						className={cn(
							pokemon.class,
							"text-justify font-medium text-6xl md:text-[10vw]",
							"bg-gradient-to-br from-[var(--c)] via-[var(--c)] bg-clip-text text-transparent",
							"selection:text-foreground"
						)}
					>
						{pokemon.name}
					</div>
					<p className="mt-4 md:w-[50vw] xl:text-xl">{pokemon.description}</p>
				</div>
				<picture
					className={cn(
						"-z-10 -translate-1/2 absolute top-1/2 left-1/2 aspect-square h-full opacity-20",
						"xl:-translate-x-1/4 xl:right-0 xl:left-auto xl:opacity-100"
					)}
				>
					<img
						loading="lazy"
						src={await pokemon.sprite}
						alt={pokemon.name}
						width={96}
						height={96}
						className="image-rendering-pixelated h-full w-full object-contain"
					/>
				</picture>
			</aside>
		</>
	);
};

export const Footer: React.FC = () => {
	return (
		<Suspense>
			<_Footer />
		</Suspense>
	);
};
