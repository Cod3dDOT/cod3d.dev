import { Suspense } from 'react';

import { SectionLink } from '../section-link';
import { NavProjectsList, NavProjectsListSkeleton } from './list';

const NavProjectsShowcase: React.FC = () => {
	return (
		<section>
			<SectionLink link="/projects" text="Projects" />

			<Suspense fallback={<NavProjectsListSkeleton />}>
				<NavProjectsList />
			</Suspense>
		</section>
	);
};

export default NavProjectsShowcase;
