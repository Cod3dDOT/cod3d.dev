import NavContactsShowcase from "./contacts";
import { NavigationContainer } from "./container";
import NavProjectsShowcase from "./projects";
import NavThoughtsShowcase from "./thoughts";

export const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<NavThoughtsShowcase />
			<NavProjectsShowcase />
			<NavContactsShowcase />
		</NavigationContainer>
	);
};
