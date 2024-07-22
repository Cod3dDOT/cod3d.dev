import { getRandomPokemon } from '@/lib/poke';
import { AsideFooter } from './parralax';
import { FooterMon } from './pokemon';

export const Footer: React.FC = () => {
	const pokemon = getRandomPokemon();

	return (
		<>
			<footer className="relative md:px-24 px-10 py-8 bg-background">
				<div className="flex mx-auto justify-between container xl:max-w-full">
					<p>
						<span>cod3d.dev</span>
						<span> @ 2024</span>
					</p>
					<p>Made with ❤️ and ☕</p>
				</div>
			</footer>
			<AsideFooter>
				<FooterMon pokemon={pokemon} />
			</AsideFooter>
		</>
	);
};
