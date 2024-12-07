import { Thought } from '@pocketbase/types';
import { clsx } from 'clsx';

import MarkdownIcon from '@/components/icons/markdown';
import RssIcon from '@/components/icons/rss';
import { Tooltip } from '@/components/tooltip';

import { DateScroll } from './dateScroll';
import { HeroImage } from './image';
import { ReadingTime } from './readingTime';

interface HeaderProps {
	thought: Thought;
	markdown: string;
	slug: string;
	blurDataURL?: string;
}

const delays = [
	'[--delay:500ms]',
	'[--delay:600ms]',
	'[--delay:700ms]',
	'[--delay:800ms]',
	'[--delay:900ms]',
	'[--delay:1000ms]',
	'[--delay:1100ms]',
	'[--delay:1200ms]',
	'[--delay:1300ms]',
	'[--delay:1400ms]',
	'[--delay:1500ms]',
	'[--delay:1600ms]',
	'[--delay:1700ms]',
	'[--delay:1800ms]',
	'[--delay:1900ms]',
	'[--delay:2000ms]'
];

export const ThoughtHeader: React.FC<HeaderProps> = ({
	slug,
	markdown,
	thought
}) => {
	const words = thought.title.split(' ');
	const spans = words.map((word, index) => (
		<span
			key={index.toString() + '-markdown-title'}
			className={clsx(
				'inline-block motion-safe:animate-blog-in motion-reduce:animate-blog-in-reduced opacity-0',
				`motion-reduce:!delay-0`,
				delays[index]
			)}
		>
			{word}
			&nbsp;
		</span>
	));

	return (
		<header className="flex flex-col xs:gap-12 pt-20">
			<div className="px-10 uppercase flex flex-col sm:flex-row text-base sm:justify-between gap-8 opacity-0 motion-safe:animate-blog-in motion-reduce:animate-blog-in-reduced [--delay:300ms]">
				<div className="*:align-middle">
					<span className="font-extralight">Reading time</span>
					<br />
					<ReadingTime markdown={markdown} />
				</div>
				<div className="w-fit">
					<div className="font-extralight flex justify-between">
						<span>Published</span>
						<span className="hidden md:hidden">/</span>
						<span>Revised</span>
					</div>
					<div className="*:align-middle space-x-2">
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
								className="dark:text-yellow-500 text-yellow-600"
								aria-describedby="md-download-tooltip"
							>
								<MarkdownIcon className="w-[1lh] h-[1lh]" />
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
								className="dark:text-yellow-500 text-yellow-600"
								aria-describedby="blog-rss-link-tooltip"
							>
								<RssIcon className="w-[1lh] h-[1lh]" />
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
			<div className="px-10 space-y-10">
				<h1 className="text-3xl xs:text-5xl md:text-6xl xl:text-8xl font-mono font-extralight tracking-tight">
					{spans}
				</h1>
				<p className="xs:text-lg lg:text-xl">{thought.description}</p>
			</div>
		</header>
	);
};
