import { clsx } from 'clsx';
import Link from 'next/link';

import { Thought } from '@/lib/pocketbase/types';
import { SpotlightCard } from '@/components/effects/spotlightCard';

type ThoughtsBodyProps = {
	year: number;
	thoughts: Thought[];
	className?: string;
};

const colors = {
	from: ['rgb(141, 141, 225)', 'rgb(214, 141, 225)'],
	to: ['rgb(70, 101, 202)', 'rgb(156, 70, 202)']
};

export const ThoughtsYear: React.FC<ThoughtsBodyProps> = ({
	year,
	thoughts,
	className
}) => {
	return (
		<div className="space-y-10">
			<h2>{year}</h2>
			<div className={clsx('masonry h-screen text-5xl', className)}>
				{thoughts.map((th, index) => (
					<SpotlightCard
						from={colors.from[index]}
						via={colors.to[index]}
						size={200}
						className="rounded-xl overflow-hidden grid-item bg-background-dark/50"
					>
						<Link
							href={'/thoughts/' + th.slug}
							key={th.id}
							className="absolute inset-1 grid-item-inner"
							// @ts-ignore
							style={{ '--from': colors.from[index], '--to': colors.to[index] }}
						>
							<h4>{th.name}</h4>
						</Link>
					</SpotlightCard>
				))}
				{Array.from({ length: 7 - thoughts.length }).map((v, i) => {
					return (
						<SpotlightCard
							from="#fff"
							via="#222"
							size={200}
							className="rounded-xl overflow-hidden grid-item bg-background-dark/50"
							key={year + '-coming-soon-' + i}
						>
							<div
								className="absolute inset-1 grid-item-inner"
								// @ts-ignore
								style={{ '--from': '#222', '--to': '#222' }}
							>
								???
							</div>
						</SpotlightCard>
					);
				})}
			</div>
		</div>
	);
};
