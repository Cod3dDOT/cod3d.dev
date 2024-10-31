import { Thought } from '@pocketbase/types';

import { getGroupedBy } from '@/lib/utils/array';

import { ThoughtsYear } from './year';

type ThoughtsYearsProps = {
	thoughts: Thought[];
};

export const Years: React.FC<ThoughtsYearsProps> = ({ thoughts }) => {
	const thoughtsByYears = getGroupedBy(
		thoughts.map((th) => {
			return { ...th, year: new Date(th.created).getFullYear() };
		}),
		'year'
	);

	return (
		<div className="mt-8">
			{Object.keys(thoughtsByYears).map((key) => {
				return (
					<div key={key} className="w-full">
						<ThoughtsYear
							thoughts={thoughtsByYears[key]}
							year={parseInt(key)}
						/>
					</div>
				);
			})}
		</div>
	);
};
