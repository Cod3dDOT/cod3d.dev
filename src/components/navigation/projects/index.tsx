import { SectionLink } from '../section-link';
import { Suspense } from 'react';
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
