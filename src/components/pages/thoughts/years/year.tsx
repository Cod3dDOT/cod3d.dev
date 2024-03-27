import { clsx } from 'clsx';

import { Thought } from '@/lib/pocketbase/types';

import { ThoughtLink } from '../thoughtLink';

type ThoughtsBodyProps = {
	year: number;
	thoughts: Thought[];
	className?: string;
};

export const ThoughtsYear: React.FC<ThoughtsBodyProps> = ({
	year,
	thoughts,
	className
}) => {
	return (
		<div className={clsx('absolute inset-0', className)}>
			{thoughts.map((th) => (
				<ThoughtLink key={th.id} thought={th} />
			))}
		</div>
	);
};
