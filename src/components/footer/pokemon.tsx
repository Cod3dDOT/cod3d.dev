import { memo } from "react";

import { cn } from "@/lib/utils/cn";
import { Pokemon } from "@/lib/utils/poke";

const _FooterMon: React.FC<{
	pokemon: Pokemon;
}> = ({ pokemon }) => {
	return (
		<>
			<div>
				<div
					className={cn(
						"left-24 text-justify text-6xl font-medium md:text-[10vw]",
						"bg-gradient-to-br from-[var(--c)] via-[var(--c)] bg-clip-text text-transparent",
						pokemon.class
					)}
				>
					{pokemon.name}
				</div>

				<p className="mt-4 md:w-[50vw] xl:text-xl">
					{pokemon.description}
				</p>
			</div>
			<picture
				className={cn(
					"-z-10 h-[60vw] w-[60vh]",
					"absolute right-0 translate-x-1/3 scale-150 opacity-20 md:scale-125 md:opacity-50",
					"xl:translate-x-0 xl:scale-110 xl:opacity-100"
				)}
			>
				<img
					loading="lazy"
					src={pokemon.sprite}
					alt={"Picture of the " + pokemon.name}
					width={96}
					height={96}
					className="image-rendering-pixelated h-full w-full object-contain"
				/>
			</picture>
		</>
	);
};

export const FooterMon = memo(_FooterMon);
