import { Thought } from "@pocketbase/types";

import MarkdownIcon from "@/components/icons/markdown";
import RssIcon from "@/components/icons/rss";
import { Tooltip } from "@/components/tooltip";
import { cn } from "@/lib/utils/cn";
import { DateScroll } from "./dateScroll";
import { HeroImage } from "./image";
import { ReadingTime } from "./readingTime";

interface HeaderProps {
	thought: Thought;
	markdown: string;
	slug: string;
	blurDataURL?: string;
}

const delays = [
	"[--delay:500ms]",
	"[--delay:600ms]",
	"[--delay:700ms]",
	"[--delay:800ms]",
	"[--delay:900ms]",
	"[--delay:1000ms]",
	"[--delay:1100ms]",
	"[--delay:1200ms]",
	"[--delay:1300ms]",
	"[--delay:1400ms]",
	"[--delay:1500ms]",
	"[--delay:1600ms]",
	"[--delay:1700ms]",
	"[--delay:1800ms]",
	"[--delay:1900ms]",
	"[--delay:2000ms]",
];

export const ThoughtHeader: React.FC<HeaderProps> = ({
	slug,
	markdown,
	thought,
}) => {
	const words = thought.title.split(" ");
	const spans = words.map((word, index) => (
		<span
			key={index.toString() + "-markdown-title"}
			className={cn(
				"motion-safe:animate-in motion-reduce:animate-in-reduced inline-block opacity-0",
				`motion-reduce:!delay-0`,
				delays[index]
			)}
		>
			{word}
			&nbsp;
		</span>
	));

	return (
		<header className="flex flex-col pt-20 sm:gap-12">
			<div className="motion-safe:animate-in motion-reduce:animate-in-reduced flex flex-col gap-8 px-10 text-base uppercase opacity-0 [--delay:300ms] sm:flex-row sm:justify-between">
				<div className="*:align-middle">
					<span className="font-extralight">Reading time</span>
					<br />
					<ReadingTime markdown={markdown} />
				</div>
				<div className="w-fit">
					<div className="flex justify-between font-extralight">
						<span>Published</span>
						<span className="hidden md:hidden">/</span>
						<span>Revised</span>
					</div>
					<div className="space-x-2 *:align-middle">
						<DateScroll date={thought.created} delay="delay-2000" />
						<span>/</span>
						<DateScroll date={thought.updated} delay="delay-500" />
					</div>
				</div>
				<div className="hidden lg:block">
					<span className="font-extralight">Available in</span>
					<br />
					<div className="flex space-x-2">
						<Tooltip
							id="md-download-tooltip"
							content="Markdown"
							position="bottom"
						>
							<a
								href={`${slug}/download`}
								rel="noopener"
								className="hover:text-accent-blue focus:text-accent-blue transition-colors"
								aria-describedby="md-download-tooltip"
							>
								<MarkdownIcon className="h-[1lh] w-[1lh]" />
							</a>
						</Tooltip>
						<Tooltip
							id="blog-rss-link-tooltip"
							content="RSS Feed"
							position="bottom"
						>
							<a
								href="/feed.xml"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-accent-blue focus:text-accent-blue transition-colors"
								aria-describedby="blog-rss-link-tooltip"
							>
								<RssIcon className="h-[1lh] w-[1lh]" />
							</a>
						</Tooltip>
					</div>
				</div>
				<span className="hidden sm:block" />
			</div>
			<HeroImage
				src={thought.hero.light}
				srcDark={thought.hero.dark}
				alt="Hero image"
			/>
			<div className="space-y-10 px-10">
				<h1 className="font-mono text-3xl font-extralight tracking-tight sm:text-5xl md:text-6xl xl:text-8xl">
					{spans}
				</h1>
				<p className="sm:text-lg lg:text-xl">{thought.description}</p>
			</div>
		</header>
	);
};
