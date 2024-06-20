import { Project } from '@/lib/pocketbase/types';

import GithubIcon from '../../../icons/github';
import { ProjectBadge } from './badge';
import { MemoProjectGridEffect } from './gridEffect';

export const NavProject: React.FC<{
	project: Project;
}> = ({ project }) => {
	return (
		<div className="relative flex sm:h-16 items-center overflow-hidden group transition-shadow rounded-md hover:shadow-xl">
			<ProjectBadge status={project.status} />
			<div className="flex flex-col sm:w-fit p-2 flex-1 sm:flex-initial">
				<span className="text-xl">{project.name}</span>
				<span className="text-sm">{project.description}</span>
			</div>
			<div className="sm:block hidden flex-1">
				<MemoProjectGridEffect id={project.id} />
			</div>

			{project.repo && (
				<a
					href={String(project.repo)}
					className="h-full transition-all lg:w-0 lg:mr-0 mr-2 lg:group-hover:w-14 sm:group-hover:ml-2 flex justify-center items-center overflow-hidden"
				>
					<GithubIcon
						aria-hidden="true"
						focusable="false"
						className="h-8 w-8 fill-foreground"
					/>
					<span className="sr-only">Project Github link</span>
				</a>
			)}
		</div>
	);
};
