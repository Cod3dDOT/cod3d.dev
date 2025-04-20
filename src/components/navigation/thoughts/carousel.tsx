import { getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import Link from "next/link";

import { SpotlightCard } from "@/components/effects/spotlightCard";
import { cn } from "@/lib/utils/cn";
import { dateToString } from "@/lib/utils/date";
import { isError } from "@/pocketbase/utils";

const shimmer =
	"overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent";

const ThoughtLink: React.FC<{
	thought: Thought;
}> = ({ thought }) => {
	return (
		<Link
			hrefLang="en"
			key={thought.id}
			href={`/thoughts/${thought.slug}`}
			aria-label={`Thought: ${thought.title}`}
			className="group"
		>
			<SpotlightCard
				id={`spotlight-card-${thought.id}`}
				from="var(--yellow)"
				via="var(--yellow)"
				size={200}
				className="relative h-full w-full overflow-hidden rounded-xl bg-container"
			>
				<div className="absolute inset-1 z-10 flex flex-col overflow-hidden rounded-xl px-4 py-4">
					<div
						className="flex space-x-2 [font-size:smaller]"
						aria-label={`Thought tags: ${thought.tags.join(", ")}`}
					>
						{thought.tags.map((tag, i) => (
							<span
								key={i.toString() + thought.id}
								className="whitespace-nowrap rounded-xl border-2 border-transparent bg-background p-3 leading-0 transition-colors group-hover:border-warn group-focus:border-warn"
								aria-hidden
							>
								{tag}
							</span>
						))}
					</div>
					<h3 className="mt-auto mb-auto w-3/4 [font-size:larger] md:mb-1">
						{thought.title}
					</h3>
					<div className="flex justify-between">
						<time dateTime={thought.created.toISOString()}>
							{dateToString(thought.created)}
						</time>
						<span aria-hidden>{process.env.SITE_NAME}</span>
					</div>

					<span className="-z-10 absolute inset-0 bg-radial-[circle_at_100%_0%] from-accent-yellow to-40% to-background" />
					<span className="-z-10 absolute inset-0 bg-radial-[circle_at_100%_0%] from-accent-blue to-40% to-background transition-opacity group-hover:opacity-0 group-focus:opacity-0" />
				</div>
			</SpotlightCard>
		</Link>
	);
};

const ThoughtLinkSkeleton: React.FC = () => {
	return (
		<div
			className={cn(
				"!via-foreground/50 relative h-full w-full overflow-hidden rounded-xl bg-container",
				shimmer
			)}
		>
			<div className="absolute inset-1 flex flex-col overflow-hidden rounded-xl bg-background px-4 py-4">
				<div className="flex space-x-2 [font-size:smaller]">
					{["w-16", "w-24", "w-8"].map((w, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={`skeleton-tag-${i}`}
							className={cn(
								w,
								shimmer,
								"h-[calc(1lh+0.5rem)] rounded-full bg-container backdrop-blur-lg"
							)}
							aria-hidden="true"
						/>
					))}
				</div>
				<div
					className={cn(
						"relative mt-auto mb-auto h-[1lh] w-3/4 rounded-lg bg-container [font-size:larger] md:mb-1",
						shimmer
					)}
				/>
				<div className="flex justify-between">
					<span
						className={cn("relative h-[calc(1lh)] w-24 rounded-md", shimmer)}
					/>
					<span>{process.env.SITE_NAME}</span>
				</div>
			</div>
		</div>
	);
};

export const ThoughtsCarousel: React.FC = async () => {
	const thoughtReponse = await getThoughts(1, 2, { sort: "-created" });

	if (isError(thoughtReponse)) {
		console.error("Could not get thoughts");
		return null;
	}

	const thoughts = thoughtReponse as Thought[];

	return (
		<div className="grid aspect-video grid-cols-1 grid-rows-1 space-x-2 sm:aspect-[32/9] sm:grid-cols-2">
			{thoughts.map((thought) => {
				return (
					<ThoughtLink
						key={`nav-link-thought-${thought.id}`}
						thought={thought}
					/>
				);
			})}
		</div>
	);
};

export const ThoughtsCarouselSkeleton: React.FC = () => {
	return (
		<div className="grid aspect-video grid-cols-1 grid-rows-1 space-x-2 sm:aspect-[32/9] sm:grid-cols-2">
			{[1, 2].map((index) => {
				return (
					<ThoughtLinkSkeleton
						key={`nav-skeleton-thought-${index.toString()}`}
					/>
				);
			})}
		</div>
	);
};
