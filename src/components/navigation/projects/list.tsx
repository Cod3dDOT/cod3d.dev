import { getProjects } from '@pocketbase/req';
import { Project } from '@pocketbase/types';
import { isError } from '@pocketbase/utils';

import { NavProject, NavProjectSkeleton } from './project';

export const NavProjectsList: React.FC = async () => {
	const projectResponse = await getProjects(1, 3);
	if (isError(projectResponse)) {
		return <p>Error: {projectResponse.message}</p>;
	}

	const projects = projectResponse as Project[];

	return (
		<div className="space-y-2">
			{projects.map((project) => {
				return (
					<NavProject project={project} key={'nav-project-' + project.id} />
				);
			})}
		</div>
	);
};

export const NavProjectsListSkeleton: React.FC = () => {
	return (
		<div className="space-y-2">
			{[1, 2, 3].map((project) => {
				return (
					<NavProjectSkeleton
						key={'nav-skeleton-project-' + project.toString()}
					/>
				);
			})}
		</div>
	);
};
