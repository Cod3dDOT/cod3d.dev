import { getProjects } from '@/lib/pocketbase/req';
import { Project } from '@/lib/pocketbase/types';

import { SectionLink } from '../section-link';
import { NavProject } from './project/project';

const NavProjectsShowcase: React.FC = async () => {
	const projectResponse = await getProjects(1, 3);
	const projects = projectResponse as Project[];

	return (
		<section>
			<SectionLink link="/projects" text="Projects" />

			<div className="space-y-2">
				{projects.map((project) => {
					return <NavProject project={project} key={project.id} />;
				})}
			</div>
		</section>
	);
};

export default NavProjectsShowcase;
