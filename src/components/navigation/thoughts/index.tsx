import { Link } from 'next-view-transitions';

import { getThoughts } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';
import { dateToString } from '@/lib/utils/date';

import { SpotlightCard } from '../../effects/spotlightCard';
import { SectionLink } from '../section-link';

const NavThoughtsShowcase: React.FC = async () => {
	const thoughtReponse = await getThoughts(1, 2, { sort: '-created' });
	const thoughts = thoughtReponse as Thought[];

	return (
		<section className="sm:!mt-0">
			<SectionLink link="/thoughts" text="Thoughts" />

			<div
				className="
            grid sm:grid-cols-2 grid-cols-1 grid-rows-1 sm:aspect-[32/9] aspect-video space-x-2"
			>
				{thoughts.map((thought, i) => {
					return (
						<Link
							hrefLang="en"
							key={thought.id}
							href={'/thoughts/' + thought.slug}
						>
							<SpotlightCard
								id={'spotlight-nav-' + i}
								from="#1cd1c6"
								via="#407cff"
								size={200}
								className="relative h-full w-full rounded-xl overflow-hidden bg-background-dark"
							>
								<div
									className="rounded-xl overflow-hidden
                                                absolute inset-1 bg-background px-4 py-4 flex flex-col"
								>
									<div className="flex space-x-2 [font-size:smaller]">
										{thought.tags.map((tag, i) => (
											<span
												key={i + thought.id}
												className="whitespace-nowrap backdrop-blur-lg bg-background-dark p-2 px-3 rounded-full"
											>
												{tag}
											</span>
										))}
									</div>
									<h3 className="mt-auto mb-auto [font-size:larger] w-3/4 md:mb-1">
										{thought.title}
									</h3>
									<div className="flex justify-between">
										<time dateTime={thought.created.toISOString()}>
											{dateToString(thought.created)}
										</time>
										<span>cod3d.dev</span>
									</div>
									<div className="absolute w-36 h-36 rounded-full -top-16 -right-16 bg-blue-500 blur-xl" />
								</div>
							</SpotlightCard>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default NavThoughtsShowcase;
