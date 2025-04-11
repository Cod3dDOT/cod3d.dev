import { Suspense } from "react";

import { SectionHeader } from "../header";
import { NavProjectsList, NavProjectsListSkeleton } from "./list";

const NavProjectsShowcase: React.FC = () => {
	return (
		<section>
			<SectionHeader section="Projects" />
			<Suspense fallback={<NavProjectsListSkeleton />}>
				<NavProjectsList />
			</Suspense>
		</section>
	);
};

export default NavProjectsShowcase;
