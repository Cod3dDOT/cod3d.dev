import NavContactsShowcase from './contacts';
import { NavigationContainer } from './container';
import NavProjectsShowcase from './projects';
import NavThoughtsShowcase from './thoughts';
import { Suspense } from 'react';

export const Navigation: React.FC = async () => {
	return (
		<NavigationContainer>
			<Suspense fallback={<div>Loading...</div>}>
				<NavThoughtsShowcase />
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				<NavProjectsShowcase />
			</Suspense>
			<NavContactsShowcase />
		</NavigationContainer>
	);
};

export default Navigation;
