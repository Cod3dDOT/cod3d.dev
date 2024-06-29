import Link from 'next/link';

import { Thought } from '@/lib/pocketbase/types';

import { SpotlightCard } from '../../effects/spotlightCard';
import { SectionLink } from '../section-link';
import { getNonce } from '@/lib/nonce';

const dateToString = (date: string) => {
	const d = new Date(date);
	return d.toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
};

const NavThoughtsShowcase: React.FC<{ thoughts: Thought[] }> = async ({
	thoughts
}) => {
	const nonce = await getNonce();

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
							key={thought.id}
							href={'/thoughts/' + thought.slug}
							className="cursor-thoughts-nav"
						>
							<SpotlightCard
								id={'spotlight-nav-' + i}
								nonce={nonce}
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
											{dateToString(thought.created)}
										</h3>
										<br />
										<h4>{thought.name}</h4>
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
