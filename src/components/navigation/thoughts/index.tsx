import { Suspense } from 'react';
import { SectionLink } from '../section-link';
import { ThoughtsCarousel, ThoughtsCarouselSkeleton } from './carousel';

const NavThoughtsShowcase: React.FC = () => {
	return (
		<section className="sm:!mt-0">
			<SectionLink link="/thoughts" text="Thoughts" />
			<Suspense fallback={<ThoughtsCarouselSkeleton />}>
				<ThoughtsCarousel />
			</Suspense>
		</section>
	);
};

export default NavThoughtsShowcase;
