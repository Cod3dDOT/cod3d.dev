import Link from 'next/link';

import ChevronIcon from '@/components/icons/chevron';
import { pb } from '@/lib/pocketbase/config';

import { SpotlightCard } from '../../spotlightCard';

const NavThoughtsShowcase: React.FC = async () => {
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
			<div className="absolute inset-x-0 bottom-0 h-36">
				<div className="relative w-full h-full *:order-foreground *:border-y-2 *:w-8 *:inset-y-0">
					<div className="absolute mask-linear mask-dir-to-l -left-6"></div>
					<div className="absolute mask-linear mask-dir-to-r -right-6"></div>
				</div>
			</div>
			<div className="relative w-full h-36 grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 *:bg-gray-300 rounded-md overflow-hidden">
				{Array.from({ length: 3 }).map((_, index) => {
					return (
						<Link key={index} href="/thoughts" className="cursor-thoughts-nav">
							<SpotlightCard
								from="#1cd1c6"
								via="#407cff"
								size={150}
								className="relative w-full h-full"
							>
								<div className="absolute inset-[2px] right-px bg-background" />
								<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
									<p className="text-foreground">Coming soon</p>
								</div>
							</SpotlightCard>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default NavThoughtsShowcase;
