import Image from 'next/image';
import Link from 'next/link';

import ChevronIcon from '@/components/icons/chevron';
import { getFileUrl, pb } from '@/lib/pocketbase/config';

import { SpotlightCard } from '../../effects/spotlightCard';

async function getThoughts() {
	return (
		await pb.collection('thoughts').getList(1, 2, {
			filter: 'preview != null',
			sort: 'created'
		})
	).items;
}

const NavThoughtsShowcase: React.FC = async () => {
	const thoughts = await getThoughts();

	return (
		<div className="relative">
			<Link
				href="/thoughts"
				className="relative flex group w-full justify-between items-center sm:mb-8 mb-4"
			>
				<h2>Thoughts</h2>
				<div className="relative w-8 h-8 group-hover:opacity-100 lg:opacity-0 transition-opacity">
					<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows left-1" />
					<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows delay-75" />
				</div>
				<span className="absolute left-0 -bottom-2 h-1 w-0 group-hover:w-full transition-[width] bg-foreground" />
			</Link>
			<div className="absolute inset-x-0 bottom-0 sm:aspect-[32/9] aspect-video">
				<div className="relative w-full h-full *:order-foreground *:border-y-2 *:border-foreground *:w-8 *:inset-y-0">
					<div className="absolute mask-linear mask-dir-to-l -left-6"></div>
					<div className="absolute mask-linear mask-dir-to-r -right-6"></div>
				</div>
			</div>
			<div
				className="relative *:bg-foreground rounded-md
            grid sm:grid-cols-2 grid-cols-1 grid-rows-1 sm:aspect-[32/9] aspect-video"
			>
				{thoughts.map((thought) => {
					return (
						<Link
							key={thought.id}
							href={'/thoughts/' + thought.slug}
							className="cursor-thoughts-nav"
						>
							<SpotlightCard
								from="#1cd1c6"
								via="#407cff"
								size={200}
								className="relative h-full w-full"
							>
								<Image
									width={512}
									height={256}
									src={getFileUrl(thought, thought.preview)}
									alt={thought.name + ' preview'}
									className="absolute inset-0 p-1 w-full h-full z-10"
								/>
							</SpotlightCard>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default NavThoughtsShowcase;
