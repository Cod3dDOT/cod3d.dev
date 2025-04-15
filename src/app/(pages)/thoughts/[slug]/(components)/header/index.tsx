import type { Thought } from "@pocketbase/types";

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
	"[--delay:250ms]",
	"[--delay:300ms]",
	"[--delay:350ms]",
	"[--delay:400ms]",
	"[--delay:450ms]",
	"[--delay:500ms]",
	"[--delay:550ms]",
	"[--delay:600ms]",
	"[--delay:650ms]",
	"[--delay:700ms]",
	"[--delay:750ms]",
	"[--delay:800ms]",
	"[--delay:850ms]",
	"[--delay:900ms]",
	"[--delay:950ms]",
	"[--delay:1000ms]"
];

export const ThoughtHeader: React.FC<HeaderProps> = ({
	slug,
	markdown,
	thought
}) => {
	const words = thought.title.split(" ");
	const spans = words.map((word, index) => (
		<span
			key={`${index.toString()}-markdown-title`}
			className={cn(
				"inline-block opacity-0 motion-safe:animate-in motion-reduce:animate-fade-in",
				delays[index]
			)}
		>
			{word}
			{index !== words.length - 1 && "\xa0"}
		</span>
	));

	return (
		<header className="flex flex-col px-10 pt-20 sm:gap-12">
			<div className="flex flex-col gap-8 text-base uppercase opacity-0 motion-safe:animate-in motion-reduce:animate-fade-in sm:flex-row sm:justify-between">
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
						<DateScroll date={thought.created} />
						<span>/</span>
						<DateScroll date={thought.updated} />
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
								className="transition-colors hover:text-accent-blue focus:text-accent-blue dark:focus:text-accent-blue dark:hover:text-accent-yellow"
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
								className="transition-colors hover:text-accent-blue focus:text-accent-blue dark:focus:text-accent-blue dark:hover:text-accent-yellow"
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
			<div>
				<h1 className="font-extralight font-mono text-3xl tracking-tight sm:text-5xl md:text-6xl xl:text-8xl">
					{spans}
				</h1>
				<p className="py-8 opacity-0 [--delay:500ms] motion-safe:animate-in sm:text-lg lg:text-xl">
					{thought.description}
				</p>
			</div>
		</header>
	);
};
