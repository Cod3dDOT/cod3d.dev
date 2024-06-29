'use client';

import { clsx } from 'clsx';
import Link from 'next/link';

import { Thought } from '@/lib/pocketbase/types';
import { SpotlightCard } from '@/components/effects/spotlightCard';

type ThoughtsBodyProps = {
	nonce?: string;
	year: number;
	thoughts: Thought[];
	className?: string;
};

export const ThoughtsYear: React.FC<ThoughtsBodyProps> = ({
	nonce,
	year,
	thoughts,
	className
}) => {
	const gridClasses =
		'grid h-screen gap-1 grid-cols-[repeat(2,minmax(100px,1fr))] ' +
		'md:gap-2 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ' +
		'xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]';
	const cardClasses =
		'grid-item relative rounded-xl overflow-hidden bg-background-dark/50';
	const contentClasses =
		'grid-item-inner absolute flex inset-1 justify-center items-center transition-all rounded-lg md:p-8 p-4';

	return (
		<div className="space-y-10 py-8">
			<h2 className="md:text-[5.65rem] sm:text-[4rem] text-[2.83rem]">
				{year}
			</h2>
			<div className={clsx(gridClasses, className)}>
				{thoughts.map((th) => (
					<SpotlightCard
						id={`year-${year}-thought-${th.id}`}
						from="var(--spotlight-from)"
						size={200}
						key={th.id}
						className={cardClasses}
					>
						<Link href={'/thoughts/' + th.slug} className={contentClasses}>
							<h3 className="md:text-[2rem] sm:text-[1.44rem] text-[1.22rem]">
								{th.name}
							</h3>
						</Link>
					</SpotlightCard>
				))}
				{Array.from({ length: 7 - thoughts.length }).map((v, i) => {
					return (
						<SpotlightCard
							id={`year-${year}-unknown-${i}`}
							from="var(--spotlight-from)"
							size={200}
							className={cardClasses}
							key={year + '-coming-soon-' + i}
						>
							<div className={contentClasses}>???</div>
						</SpotlightCard>
					);
				})}
			</div>
		</div>
	);
};
