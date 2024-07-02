import { Pokemon } from '@/lib/poke';
import Image from 'next/image';

import '@/app/styles/pokemons.css';
import { clsx } from 'clsx';

export const FooterMon: React.FC<{
	pokemon: Pokemon;
}> = ({ pokemon }) => {
	return (
		<>
			<div className="max-w-prose px-24 space-y-4">
				<div className={clsx('text-4xl sm:text-7xl', pokemon.class)}>
					{pokemon.name}
				</div>
				<div>{pokemon.description}</div>
			</div>
			<Image
				loading="lazy"
				src={pokemon.sprite}
				alt={'Picture of the ' + pokemon.name}
				width={96}
				height={96}
				quality={100}
				className="w-[50vw] max-w-96 pixelated"
			/>
		</>
	);
};
