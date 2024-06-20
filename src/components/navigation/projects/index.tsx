import Link from 'next/link';

import { Project } from '@/lib/pocketbase/types';

import ChevronIcon from '../../icons/chevron';
import { NavProject } from './project/project';
import { SectionLink } from '../section-link';

const NavProjectsShowcase: React.FC<{ projects: Project[] }> = ({
	projects
}) => {
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
