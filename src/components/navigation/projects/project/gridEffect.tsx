'use client';

import clsx from 'clsx';
import { memo } from 'react';

import { GridPattern } from '@/components/effects/gridPattern';
import { Project } from '@/lib/pocketbase/types';
import { randomIntFromIntervalPredicted } from '@/lib/utils/math';
import { stringToUniqueId } from '@/lib/utils/crypto';

export const ProjectGridEffect: React.FC<{ id: Project['id'] }> = ({ id }) => {
	const idn = stringToUniqueId(id);
	const animationDelay = [
		'delay-0',
		'delay-100',
		'delay-200',
		'delay-300',
		'delay-500'
	];

	const blocks = Array.from({ length: 60 }, (_, i) => [
		randomIntFromIntervalPredicted(0, 4, idn + i),
		randomIntFromIntervalPredicted(0, 30, idn - i)
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
						'fill-foreground',
						animationDelay[randomIntFromIntervalPredicted(0, 4, idn + index)]
					)}
				/>
			))}
		</GridPattern>
	);
};

export const MemoProjectGridEffect = memo(ProjectGridEffect);
