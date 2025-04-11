import { Suspense } from "react";

import { ThoughtsCarousel, ThoughtsCarouselSkeleton } from "./carousel";

const NavThoughtsShowcase: React.FC = () => {
	return (
		<section className="sm:!mt-0">
			<h2 className="relative mb-8 cursor-default overflow-hidden text-[2.83rem] leading-none transition-all hover:-skew-x-6 hover:[text-shadow:4px_4px_0px_#407cff] sm:text-[4rem] md:text-[5.65rem]">
				Thoughts
			</h2>
			<Suspense fallback={<ThoughtsCarouselSkeleton />}>
				<ThoughtsCarousel />
			</Suspense>
		</section>
	);
};

export default NavThoughtsShowcase;
