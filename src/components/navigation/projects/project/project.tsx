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
