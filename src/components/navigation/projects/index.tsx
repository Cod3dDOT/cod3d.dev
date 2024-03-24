import Link from 'next/link';

import { getProjects } from '@/lib/pocketbase/req';

import ChevronIcon from '../../icons/chevron';
import { NavProject } from './project/project';

const NavProjectsShowcase = async () => {
	const projects = await getProjects(1, 3);
	return (
		<div>
			<Link
				href="/projects"
				className="relative flex group w-full justify-between items-center sm:mb-8 mb-4"
			>
				<h2>Projects</h2>
				<div className="relative w-8 h-8 group-hover:opacity-100 lg:opacity-0 transition-opacity">
					<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows left-1" />
					<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows delay-75" />
				</div>
				<span className="absolute left-0 -bottom-2 h-1 w-0 group-hover:w-full transition-[width] bg-foreground" />
			</Link>

			<div className="space-y-2">
				{projects.map((project) => {
					return <NavProject project={project} key={project.id} />;
				})}
			</div>
		</div>
	);
};

export default NavProjectsShowcase;
