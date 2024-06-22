import { getRandomPokemon } from '@/lib/poke';
import { AsideFooter } from './parralax';
import { memo } from 'react';

const _Footer: React.FC = async () => {
	const pokemon = await getRandomPokemon();

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
			<AsideFooter
				pokemon={pokemon.name}
				description={pokemon.description}
				sprite={pokemon.sprite}
				color={pokemon.color}
			/>
		</>
	);
};

export const Footer = memo(_Footer);
