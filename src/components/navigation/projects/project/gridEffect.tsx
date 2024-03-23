'use client';

import clsx from 'clsx';
import { memo } from 'react';

import { GridPattern } from '@/components/effects/gridPattern';
import { randomIntFromInterval } from '@/lib/math';

export const ProjectGridEffect = () => {
	const animationDelay = [
		'delay-0',
		'delay-100',
		'delay-200',
		'delay-300',
		'delay-500'
	];
	const blocks = Array.from({ length: 60 }, () => [
		randomIntFromInterval(0, 4),
		randomIntFromInterval(0, 30)
	]);
	return (
		<GridPattern
			offsetX={0}
			offsetY={-2}
			size={22}
			className="h-full w-full group-hover:opacity-100 opacity-0 transition-opacity stroke-foreground stroke-2
                [mask-image:radial-gradient(white,transparent_70%)]"
		>
			{blocks.map(([row, column], index) => (
				<GridPattern.Block
					v-for="([row, column], index) in blocks"
					key={index}
					row={row}
					column={column}
					className={clsx(
						'fill-foreground opacity-70 transition animate-pulse',
						animationDelay[randomIntFromInterval(0, 4)]
					)}
				/>
			))}
		</GridPattern>
	);
};

export const MemoProjectGridEffect = memo(ProjectGridEffect);
