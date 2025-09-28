/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from "react";

import { cn } from "@/lib/utils/cn";
import { getRandomPokemon, type Pokemon } from "@/lib/utils/mons";
import { PrintFooter } from "./printFooter";

const _Footer: React.FC = async () => {
	const pokemon: Pokemon = await getRandomPokemon();

	return (
		<>
			<PrintFooter />
			<footer
				className={cn(
					"-z-10 parallax-footer relative h-[50vh] overflow-clip print:hidden",
					"bg-container px-5 py-10 transition-[background-color] md:px-20"
				)}
			>
				<p className="flex justify-between space-x-2 lg:justify-normal">
					<span>{process.env.SITE_NAME} @ 2025. </span>
					<span>All rights reserved.</span>
				</p>

				{/* for pokemon color variables to work */}
				<link rel="stylesheet" href="/generated-assets/mons.css" />

				<aside className="flex h-full items-center">
					{/* for pokemon color variables to work */}
					<div className="mons">
						<div
							className={cn(
								pokemon.class,
								"text-justify font-medium text-6xl md:text-[10vw]",
								"bg-linear-to-br from-(--c) via-(--c) bg-clip-text text-transparent",
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
			</footer>
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
