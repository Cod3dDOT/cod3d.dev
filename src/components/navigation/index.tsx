import { getProjects, getThoughts } from '@/lib/pocketbase/req';

import NavContactsShowcase from './contacts';
import NavigationContainer from './container';
import NavProjectsShowcase from './projects';
import NavThoughtsShowcase from './thoughts';

const projects = await getProjects(1, 3);
const thoughts = await getThoughts(1, 2);

export const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<NavThoughtsShowcase thoughts={thoughts} />
			<NavProjectsShowcase projects={projects} />
			<NavContactsShowcase />
		</NavigationContainer>
	);
};

export default Navigation;
