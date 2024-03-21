import Link from 'next/link';

import { pb } from '@/lib/pocketbase/config';

import { SpotlightCard } from '../../spotlightCard';

const NavBlogShowcase: React.FC = async () => {
	return (
		<div className="relative block">
			<h2 className="text-5xl mb-4">Blog</h2>
			<div className="relative w-full h-36 grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-1 *:bg-gray-300 rounded-md overflow-hidden">
				{Array.from({ length: 3 }).map((_, index) => {
					return (
						<Link key={index} href="/blog" className="cursor-blog-nav">
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

export default NavBlogShowcase;
