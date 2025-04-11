import { Suspense } from "react";

import { NavProjectsList, NavProjectsListSkeleton } from "./list";

const NavProjectsShowcase: React.FC = () => {
	return (
		<section>
			<h2 className="relative mb-8 cursor-default overflow-hidden text-[2.83rem] leading-none transition-all hover:-skew-x-6 hover:[text-shadow:4px_4px_0px_#407cff] sm:text-[4rem] md:text-[5.65rem]">
				Projects
			</h2>
			<Suspense fallback={<NavProjectsListSkeleton />}>
				<NavProjectsList />
			</Suspense>
		</section>
	);
};

export default NavProjectsShowcase;
