import NavBlogShowcase from './blog';
import NavContactsShowcase from './contacts';
import NavigationContainer from './container';
import NavProjectsShowcase from './projects';

export const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<NavBlogShowcase />
			<NavProjectsShowcase />
			<NavContactsShowcase />
		</NavigationContainer>
	);
};

export default Navigation;
