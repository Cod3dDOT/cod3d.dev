import { getThoughts } from '@pocketbase/req';
import { Thought } from '@pocketbase/types';
import { clsx } from 'clsx';
import { Link } from 'next-view-transitions';

import { SpotlightCard } from '@/components/effects/spotlightCard';
import { dateToString } from '@/lib/utils/date';

const shimmer =
	'overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent';

const ThoughtLink: React.FC<{
	thought: Thought;
}> = ({ thought }) => {
	return (
		<Link
			hrefLang="en"
			key={thought.id}
			href={'/thoughts/' + thought.slug}
			aria-label={'Thought: ' + thought.title}
		>
			<SpotlightCard
				id={'spotlight-nav-link-' + thought.id}
				from="#1cd1c6"
				via="#407cff"
				size={200}
				className="relative h-full w-full rounded-xl overflow-hidden bg-background-dark"
			>
				<div className="rounded-xl overflow-hidden absolute inset-1 bg-background px-4 py-4 flex flex-col">
					<div
						className="flex space-x-2 [font-size:smaller]"
						role="Tag list"
						aria-label={'Thought tags: ' + thought.tags.join(', ')}
					>
						{thought.tags.map((tag, i) => (
							<span
								key={i.toString() + thought.id}
								className="whitespace-nowrap backdrop-blur-lg bg-background-dark p-2 px-3 rounded-full"
								aria-hidden="true"
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
};

const ThoughtLinkSkeleton: React.FC = () => {
	return (
		<div
			className={clsx(
				'relative h-full w-full rounded-xl overflow-hidden bg-background-dark !via-foreground/50',
				shimmer
			)}
		>
			<div className="rounded-xl overflow-hidden absolute inset-1 bg-background px-4 py-4 flex flex-col">
				<div className="flex space-x-2 [font-size:smaller]" role="Tag list">
					{['w-16', 'w-24', 'w-8'].map((w, i) => (
						<span
							key={i}
							className={clsx(
								w,
								shimmer,
								'backdrop-blur-lg bg-background-dark h-[calc(1lh+0.5rem)] rounded-full'
							)}
							aria-hidden="true"
						/>
					))}
				</div>
				<h3
					className={clsx(
						'relative h-[1lh] rounded-lg mt-auto mb-auto [font-size:larger] w-3/4 md:mb-1 bg-background-dark',
						shimmer
					)}
				/>
				<div className="flex justify-between">
					<span
						className={clsx('relative h-[calc(1lh)] w-24 rounded-md', shimmer)}
					/>
					<span>cod3d.dev</span>
				</div>
			</div>
		</div>
	);
};

export const ThoughtsCarousel: React.FC = async () => {
	const thoughtReponse = await getThoughts(1, 2, { sort: '-created' });
	const thoughts = thoughtReponse as Thought[];

	return (
		<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 sm:aspect-[32/9] aspect-video space-x-2">
			{thoughts.map((thought) => {
				return (
					<ThoughtLink
						key={'nav-link-thought-' + thought.id}
						thought={thought}
					/>
				);
			})}
		</div>
	);
};

export const ThoughtsCarouselSkeleton: React.FC = () => {
	return (
		<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 sm:aspect-[32/9] aspect-video space-x-2">
			{[1, 2].map((index) => {
				return (
					<ThoughtLinkSkeleton
						key={'nav-skeleton-thought-' + index.toString()}
					/>
				);
			})}
		</div>
	);
};
