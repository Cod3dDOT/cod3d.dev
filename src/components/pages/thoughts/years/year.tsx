import { clsx } from 'clsx';
import Link from 'next/link';

import { Thought } from '@/lib/pocketbase/types';

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
		<div className={clsx('masonry flex-[1_0_100%] ', className)}>
			{thoughts.map((th) => (
				<Link href={'/thoughts/' + th.slug} key={th.id} className="grid-item">
					{th.name}
				</Link>
			))}
			{Array.from({ length: 7 - thoughts.length }).map((v, i) => {
				return (
					<div key={year + '-coming-soon-' + i} className="grid-item">
						???
					</div>
				);
			})}
		</div>
	);
};
