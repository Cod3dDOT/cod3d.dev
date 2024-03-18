import { pb } from '@/app/lib/pocketbase/config';

import { NavProject } from './project';

async function getProjects() {
	return (
		await pb.collection('projects').getList(1, 3, {
			filter: 'repo != null',
			sort: 'status'
		})
	).items;
}

const NavProjectsShowcase = async () => {
	const projects = await getProjects();
	return (
		<div>
			<h2 className="text-5xl mb-4">Projects</h2>

			<div className="space-y-2">
				{projects.map((project) => {
					return <NavProject project={project} key={project.id} />;
				})}
			</div>
		</div>
	);
};

export default NavProjectsShowcase;
