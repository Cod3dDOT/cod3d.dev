import '@/app/styles/thoughts.css';

import { GlitchText } from '@/components/effects/glitchText';
import { getGroupedBy } from '@/lib/array';
import { Thought } from '@/lib/pocketbase/types';

import { ThoughtsYear } from './year';

type ThoughtsYearsProps = {
	thoughts: Thought[];
};

// const starAnimations: {
// 	[K: number]: string[];
// } = {
// 	'-1': [
// 		'stars [animation:animateLeft_50s_linear_infinite]',
// 		'stars2 [animation:animateLeft_100s_linear_infinite]',
// 		'stars3 [animation:animateLeft_150s_linear_infinite]'
// 	],
// 	1: [
// 		'stars [animation:animateRight_50s_linear_infinite]',
// 		'stars2 [animation:animateRight_100s_linear_infinite]',
// 		'stars3 [animation:animateRight_150s_linear_infinite]'
// 	]
// };

export const Years: React.FC<ThoughtsYearsProps> = ({ thoughts }) => {
	const thoughtsByYears = getGroupedBy(
		thoughts.map((th) => {
			return { ...th, year: new Date(th.created).getFullYear() };
		}),
		'year'
	);

	return (
		<div
			className="font-pixelify relative flex rounded-lg w-full
                        xl:flex-row flex-col"
		>
			<div className="relative w-full h-full">
				{Object.keys(thoughtsByYears).map((key) => {
					return (
						<div key={key} className="w-full h-screen">
							<ThoughtsYear
								thoughts={thoughtsByYears[key]}
								year={parseInt(key)}
							/>
						</div>
					);
				})}
				<div
					className="w-full h-screen flex flex-col justify-center items-center
                                lg:text-8xl md:text-6xl text-3xl text-center"
				>
					<span>You told me once to forget the</span>
					<GlitchText text="past" as="span" />
				</div>
			</div>
		</div>
	);
};
