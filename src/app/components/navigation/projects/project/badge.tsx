import { clsx } from 'clsx';

import { Project } from '@/app/lib/pocketbase/types';

type ProjectBadgeProps = {
	status: Project['status'];
};

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({ status }) => {
	let color = '';
	switch (status) {
		case 'stale':
			color = 'bg-yellow-400';
			break;
		case 'dev':
			color = 'bg-green-500';
			break;
		case 'idea':
			color = 'bg-blue-500';
			break;
	}
	return (
		<div
			className={clsx(
				color,
				'hidden sm:flex h-full w-0 transition-all group-hover:w-16 justify-center items-center overflow-hidden',
				'text-foreground dark:text-background'
			)}
		>
			{status}
		</div>
	);
};
