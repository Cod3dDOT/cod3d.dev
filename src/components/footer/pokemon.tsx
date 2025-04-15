import { memo } from "react";

import { cn } from "@/lib/utils/cn";
import type { Pokemon } from "@/lib/utils/poke";

const _FooterMon: React.FC<{
	pokemon: Pokemon;
}> = ({ pokemon }) => {
	return (
		<>
			<div>
				<div
					className={cn(
						"text-justify font-medium text-6xl md:text-[10vw]",
						"bg-gradient-to-br from-[var(--c)] via-[var(--c)] bg-clip-text text-transparent",
						pokemon.class
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
					src={pokemon.sprite}
					alt={pokemon.name}
					width={96}
					height={96}
					className="image-rendering-pixelated h-full w-full object-contain"
				/>
			</picture>
		</>
	);
};

export const FooterMon = memo(_FooterMon);
