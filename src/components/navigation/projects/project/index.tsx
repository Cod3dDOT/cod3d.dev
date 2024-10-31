import { Project } from '@pocketbase/types';
import { clsx } from 'clsx';

import GithubIcon from '@/components/icons/github';

import { ProjectBadge } from './badge';
import { MemoProjectGridEffect } from './gridEffect';

export const NavProject: React.FC<{
	project: Project;
}> = ({ project }) => {
	return (
		<div className="relative flex sm:h-16 items-center overflow-hidden group transition-shadow rounded-md hover:shadow-xl">
			<ProjectBadge status={project.status} />
			<div className="flex flex-col sm:w-fit p-2 flex-1 sm:flex-initial space-y-1">
				<span className="text-xl">{project.name}</span>
				<span className="text-sm">{project.description}</span>
			</div>
			<div className="sm:block hidden flex-1" aria-hidden="true">
				<MemoProjectGridEffect id={project.id} />
			</div>

			{project.repo && (
				<a
					href={project.repo}
					className="h-full aspect-square flex justify-center items-center"
					target="_blank"
					rel="noreferrer"
					aria-label={'Github link to the source code of ' + project.name}
				>
					<GithubIcon focusable="false" className="h-8 w-8 fill-foreground" />
				</a>
			)}
		</div>
	);
};

export const NavProjectSkeleton: React.FC = () => {
	return (
		<div
			className={clsx(
				'relative flex sm:h-16 items-center justify-between transition-shadow rounded-md overflow-hidden',
				'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent'
			)}
		>
			<div className="flex flex-col sm:w-fit p-2 flex-1 sm:flex-initial space-y-1">
				<span className="text-xl w-24 h-[1lh] bg-foreground/10 rounded-md shadow-sm" />
				<span className="text-sm w-48 h-[1lh] bg-foreground/10 rounded-md shadow-sm" />
			</div>

			<span className="h-8 w-8 rounded-full bg-foreground/10 mr-4" />
		</div>
	);
};
