import Link from 'next/link';

import { Thought } from '@/lib/pocketbase/types';

import { SpotlightCard } from '../../effects/spotlightCard';
import { SectionLink } from '../section-link';
import { dateToString } from '@/lib/utils/date';
import { getThoughts } from '@/lib/pocketbase/req';

const NavThoughtsShowcase: React.FC = async () => {
	const thoughtReponse = await getThoughts(1, 2, { sort: '-created' });
	const thoughts = thoughtReponse as Thought[];

	return (
		<section>
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
							className="cursor-thoughts-nav"
						>
							<SpotlightCard
								id={'spotlight-nav-' + i}
								from="#1cd1c6"
								via="#407cff"
								size={200}
								className="relative h-full w-full rounded-xl overflow-hidden"
							>
								<div
									className="rounded-xl overflow-hidden
                                                absolute inset-1 bg-background p-8 md:py-10 flex flex-col justify-between "
								>
									<div>
										<h3 className="md:text-[2rem] sm:text-[1.44rem] text-[1.22rem]">
											{dateToString(new Date(thought.created))}
										</h3>
										<br />
										<h4>{thought.og_title}</h4>
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
