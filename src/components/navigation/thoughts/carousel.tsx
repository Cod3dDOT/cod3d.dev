import Link from "next/link";
import { getThoughts } from "@pocketbase/req";
import { Thought } from "@pocketbase/types";

import { SpotlightCard } from "@/components/effects/spotlightCard";
import { cn } from "@/lib/utils/cn";
import { dateToString } from "@/lib/utils/date";

const bg = cn(
	// 'bg-[radial-gradient(200px_circle_at_100%_-20%_in_oklab,oklch(70%_0.23_268)_0%_0%,var(--to)_100%)]',
	// '[--to:var(--color-container)] hover:[--to:var(--color-background)]',
	"transititon-all duration-300 ease-in-out",
	"bg-radial-[circle_at_100%_0%] to-background from-accent to-40% hover:to-container"
);

const shimmer =
	"overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent";

const ThoughtLink: React.FC<{
	thought: Thought;
}> = ({ thought }) => {
	return (
		<Link
			hrefLang="en"
			key={thought.id}
			href={"/thoughts/" + thought.slug}
			aria-label={"Thought: " + thought.title}
		>
			<SpotlightCard
				id={"spotlight-nav-link-" + thought.id}
				from="#1cd1c6"
				via="#407cff"
				size={200}
				className="bg-container relative h-full w-full overflow-hidden rounded-xl"
			>
				<div
					className={cn(
						"absolute inset-1 flex flex-col overflow-hidden rounded-xl px-4 py-4",
						bg
					)}
				>
					<div
						className="flex space-x-2 [font-size:smaller]"
						role="Tag list"
						aria-label={"Thought tags: " + thought.tags.join(", ")}
					>
						{thought.tags.map((tag, i) => (
							<span
								key={i.toString() + thought.id}
								className="bg-container rounded-full p-2 px-3 whitespace-nowrap"
								aria-hidden="true"
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
						<span>cod3d.dev</span>
					</div>
				</div>
			</SpotlightCard>
		</Link>
	);
};

const ThoughtLinkSkeleton: React.FC = () => {
	return (
		<div
			className={cn(
				"bg-container !via-foreground/50 relative h-full w-full overflow-hidden rounded-xl",
				shimmer
			)}
		>
			<div className="bg-background absolute inset-1 flex flex-col overflow-hidden rounded-xl px-4 py-4">
				<div
					className="flex space-x-2 [font-size:smaller]"
					role="Tag list"
				>
					{["w-16", "w-24", "w-8"].map((w, i) => (
						<span
							key={i}
							className={cn(
								w,
								shimmer,
								"bg-container h-[calc(1lh+0.5rem)] rounded-full backdrop-blur-lg"
							)}
							aria-hidden="true"
						/>
					))}
				</div>
				<h3
					className={cn(
						"bg-container relative mt-auto mb-auto h-[1lh] w-3/4 rounded-lg [font-size:larger] md:mb-1",
						shimmer
					)}
				/>
				<div className="flex justify-between">
					<span
						className={cn(
							"relative h-[calc(1lh)] w-24 rounded-md",
							shimmer
						)}
					/>
					<span>cod3d.dev</span>
				</div>
			</div>
		</div>
	);
};

export const ThoughtsCarousel: React.FC = async () => {
	const thoughtReponse = await getThoughts(1, 2, { sort: "-created" });
	const thoughts = thoughtReponse as Thought[];

	return (
		<div className="grid aspect-video grid-cols-1 grid-rows-1 space-x-2 sm:aspect-[32/9] sm:grid-cols-2">
			{thoughts.map((thought) => {
				return (
					<ThoughtLink
						key={"nav-link-thought-" + thought.id}
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
						key={"nav-skeleton-thought-" + index.toString()}
					/>
				);
			})}
		</div>
	);
};
