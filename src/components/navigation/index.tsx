import { getProjects, getThoughts } from '@/lib/pocketbase/req';

import NavContactsShowcase from './contacts';
import NavigationContainer from './container';
import NavProjectsShowcase from './projects';
import NavThoughtsShowcase from './thoughts';
import { Project, Thought } from '@/lib/pocketbase/types';

export const Navigation: React.FC = async () => {
	const projectResponse = await getProjects(1, 3);
	const thoughtReponse = await getThoughts(1, 2);

	const thoughts = thoughtReponse as Thought[];
	const projects = projectResponse as Project[];

	return (
		<NavigationContainer>
			<NavThoughtsShowcase thoughts={thoughts} />
			<NavProjectsShowcase projects={projects} />
			<NavContactsShowcase />
		</NavigationContainer>
	);
};

export default Navigation;
