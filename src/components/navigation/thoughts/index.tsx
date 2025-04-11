import { Suspense } from "react";

import { SectionHeader } from "../header";
import { ThoughtsCarousel, ThoughtsCarouselSkeleton } from "./carousel";

const NavThoughtsShowcase: React.FC = () => {
	return (
		<section className="sm:!mt-0">
			<SectionHeader section="Thoughts" />
			<Suspense fallback={<ThoughtsCarouselSkeleton />}>
				<ThoughtsCarousel />
			</Suspense>
		</section>
	);
};

export default NavThoughtsShowcase;
