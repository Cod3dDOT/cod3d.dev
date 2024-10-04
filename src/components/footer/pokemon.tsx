import { Pokemon } from '@/lib/poke';

import '@/app/styles/pokemons.css';
import { clsx } from 'clsx';

export const FooterMon: React.FC<{
	pokemon: Pokemon;
}> = ({ pokemon }) => {
	return (
		<>
			<div>
				<div
					className={clsx(
						'left-24 text-justify text-6xl md:text-[10vw] font-medium',
						'bg-gradient-to-br from-[var(--c)] via-[var(--c)] bg-clip-text text-transparent',
						pokemon.class
					)}
				>
					{pokemon.name}
				</div>

				<p className="xl:text-xl md:w-[50vw] mt-4">{pokemon.description}</p>
			</div>
			<img
				loading="lazy"
				src={pokemon.sprite}
				alt={'Picture of the ' + pokemon.name}
				width={96}
				height={96}
				className={clsx(
					'h-[60vg] w-[60vh] pixelated -z-10',
					'absolute scale-150 right-0 translate-x-1/3 opacity-20 md:opacity-50 md:scale-125',
					'xl:translate-x-0 xl:opacity-100 xl:scale-110'
				)}
			/>
		</>
	);
};
