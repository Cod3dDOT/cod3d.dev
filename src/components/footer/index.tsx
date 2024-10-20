import dynamic from 'next/dynamic';

import { getRandomPokemon } from '@/lib/poke';

import { FooterMon } from './pokemon';
import { PrintFooter } from './printFooter';

const ParallaxFooter = dynamic(() => import('./parralax'));

export const Footer: React.FC = () => {
	const pokemon = getRandomPokemon();

	return (
		<>
			<footer className="md:px-24 px-10 py-8 bg-background">
				<div className="flex mx-auto justify-between container xl:max-w-full">
					<p>
						<span>cod3d.dev</span>
						<span> @ 2024</span>
					</p>
					<p>Made with ☕</p>
				</div>
			</footer>

			<PrintFooter />
			<ParallaxFooter>
				<FooterMon pokemon={pokemon} />
			</ParallaxFooter>
		</>
	);
};
