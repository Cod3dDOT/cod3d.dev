/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import clsx from "clsx";
import Link from "next/link";
import { SpotlightCard } from "@/components/effects/spotlightCard";
import { dateToString } from "@/lib/utils/date";
import { isError } from "@/pocketbase/utils";

const shimmer =
	"overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent";

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
				className="relative aspect-video h-full w-full overflow-hidden rounded-xl bg-container transition-[background-color]"
			>
				<div className="absolute inset-1 z-10 flex flex-col overflow-hidden rounded-xl px-4 py-4">
					<ul
						className="flex space-x-2 text-base"
						aria-label={`Thought tags: ${thought.tags.join(", ")}`}
					>
						{thought.tags.map((tag, i) => (
							<li
								key={`${thought.id}-tag-${i}`}
								aria-hidden
								className="whitespace-nowrap rounded-xl border-2 border-transparent bg-background p-3 leading-0 transition-[border,background-color] group-hover:border-warn group-focus:border-warn"
							>
								<span>{tag}</span>
							</li>
						))}
					</ul>
					<h3 className="mt-auto mb-auto w-3/4 text-xl md:mb-1">
						{thought.title}
					</h3>
					<div className="flex justify-between">
						<time dateTime={thought.created.toISOString()}>
							{dateToString(thought.created)}
						</time>
						<span aria-hidden>{process.env.SITE_NAME}</span>
					</div>

					<span
						className={clsx(
							"-z-10 absolute inset-0",
							"bg-radial-[circle_at_100%_0%]",
							"from-accent-blue to-40% to-background",
							"group-hover:from-accent-yellow group-hover:to-40% group-hover:to-background",
							"transition-colors"
						)}
					/>
				</div>
			</SpotlightCard>
		</Link>
	);
};

const ThoughtLinkSkeleton: React.FC = () => {
	return (
		<div
			className={clsx(
				"relative h-full w-full overflow-hidden rounded-xl bg-container via-foreground/50!",
				shimmer
			)}
		>
			<div className="absolute inset-1 flex flex-col overflow-hidden rounded-xl bg-background px-4 py-4">
				<div className="flex space-x-2 text-[smaller]">
					{["w-16", "w-24", "w-8"].map((w, i) => (
						<span
							key={`skeleton-tag-placeholder-${i.toString()}`}
							className={clsx(
								w,
								shimmer,
								"h-[calc(1lh+0.5rem)] rounded-full bg-container backdrop-blur-lg"
							)}
							aria-hidden="true"
						/>
					))}
				</div>
				<div
					className={clsx(
						"relative mt-auto mb-auto h-lh w-3/4 rounded-lg bg-container text-[larger] md:mb-1",
						shimmer
					)}
				/>
				<div className="flex justify-between">
					<span
						className={clsx("relative h-[calc(1lh)] w-24 rounded-md", shimmer)}
					/>
					<span>{process.env.SITE_NAME}</span>
				</div>
			</div>
		</div>
	);
};

export const ThoughtsCarousel: React.FC = async () => {
	const thoughtReponse = await getThoughts(undefined, undefined, {
		sort: "-created"
	});

	if (isError(thoughtReponse)) {
		console.error("Could not get thoughts");
		return null;
	}

	const thoughts = thoughtReponse as Thought[];

	return (
		<ul
			className={clsx(
				"grid auto-cols-[90%] grid-flow-col space-x-4 sm:auto-cols-[50%]",
				"carousel"
			)}
		>
			{thoughts.map((thought) => {
				return (
					<li key={`nav-link-thought-${thought.id}`}>
						<ThoughtLink thought={thought} />
					</li>
				);
			})}
		</ul>
	);
};

export const ThoughtsCarouselSkeleton: React.FC = () => {
	return (
		<ul
			className={clsx(
				"grid auto-cols-[90%] grid-flow-col space-x-4 sm:auto-cols-[50%]",
				"carousel"
			)}
		>
			{[1, 2].map((index) => {
				return (
					<li key={`nav-skeleton-thought-${index.toString()}`}>
						<ThoughtLinkSkeleton />
					</li>
				);
			})}
		</ul>
	);
};
