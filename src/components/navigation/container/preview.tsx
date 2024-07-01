import { DesktopOpener } from './desktopOpener';
import { MobileOpener } from './mobileOpener';

export const NavigationContainerPreview = () => {
	return (
		<nav className="fixed right-0 inset-y-0" role="navigation">
			<DesktopOpener opened={false} pathname="/" />
			<MobileOpener opened={false} pathname="/" />
		</nav>
	);
};
