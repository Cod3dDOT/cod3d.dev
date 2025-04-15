import { Suspense } from "react";

import { getRandomPokemon } from "@/lib/utils/poke";
import { FooterMon } from "./pokemon";
import { PrintFooter } from "./printFooter";

const _Footer: React.FC = () => {
	const pokemon = getRandomPokemon();

	return (
		<>
			<footer className="bg-background px-10 py-8 md:px-20">
				<div className="container mx-auto flex justify-between xl:max-w-full">
					<p>
						<span>cod3d.dev</span>
						<span> @ 2024</span>
					</p>
					<p>Made with ☕</p>
				</div>
			</footer>

			<PrintFooter />
			<aside className="-z-10 parallax-footer relative flex h-[50vh] w-full items-center overflow-clip bg-container px-12 md:px-24 print:hidden">
				<FooterMon pokemon={pokemon} />
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
