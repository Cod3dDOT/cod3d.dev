import { clsx } from 'clsx';

import MarkdownIcon from '@/components/icons/markdown';
import RssIcon from '@/components/icons/rss';
import { Tooltip } from '@/components/tooltip';
import { Thought } from '@/lib/pocketbase/types';
import readingTime from '@/lib/readingTime';
import { dateToString } from '@/lib/utils/date';

const DateScroll: React.FC<{
	date: Date;
	delay?: 'delay-500' | 'delay-1000' | 'delay-2000';
}> = ({ date, delay = 'delay-500' }) => {
	const startDate = new Date(date);
	startDate.setDate(startDate.getDate() - 7); // Start from 7 days ago

	const dates = Array.from({ length: 8 }, (_, i) => {
		const d = new Date(startDate);
		d.setDate(d.getDate() + i);

		return dateToString(d);
	});

	return (
		<time
			dateTime={date.toISOString()}
			className="relative inline-block overflow-hidden"
		>
			<span className="invisible">{dateToString(date)}</span>
			<div
				className={clsx(
					'left-0 absolute flex flex-col whitespace-nowrap motion-reduce:duration-0 animate-out slide-out-to-top-full fill-mode-forwards duration-1000 ease-in-out',
					'motion-reduce:delay-0',
					delay
				)}
				aria-hidden="true"
			>
				{dates.map((date, i) => (
					<span key={i + '-date-scroll-' + date}>{date}</span>
				))}
			</div>
		</time>
	);
};

const ReadingTime: React.FC<{
	markdown: string;
}> = ({ markdown }) => {
	const minutes = readingTime(markdown).minutes;
	const minArray = Array.from({ length: minutes }, (_, i) => i + 1);
	return (
		<>
			<div className="relative overflow-hidden inline-block" aria-hidden="true">
				<span className="invisible">{minutes}</span>
				<span className="left-0 absolute flex flex-col whitespace-nowrap motion-reduce:duration-0 animate-out slide-out-to-top-full fill-mode-forwards duration-1000 ease-in-out">
					{minArray.map((m, i) => {
						return <span key={i + '-reading-time'}>{m}</span>;
					})}
				</span>
				<span> minutes</span>
			</div>
			<span className="sr-only">{minutes} minutes</span>
		</>
	);
};

export const HeroImage: React.FC<{
	src: string;
	srcDark?: string;
	alt: string;
}> = ({ alt, src, srcDark }) => {
	return (
		<figure className={clsx('pixelated !m-0 xl:!my-6')}>
			<img
				loading="eager"
				src={src}
				alt={alt}
				className={clsx(
					'!m-0 md:rounded-lg w-full aspect-video object-cover xl:w-[25vw]',
					srcDark && 'dark:hidden'
				)}
			/>
			{srcDark && (
				<img
					loading="lazy"
					src={srcDark}
					alt={alt}
					className="!m-0 md:rounded-lg w-full aspect-video hidden dark:block object-cover xl:w-[25vw]"
				/>
			)}
			<figcaption className="sr-only text-center md:text-left">
				{alt}
			</figcaption>
		</figure>
	);
};

interface HeaderProps {
	thought: Thought;
	markdown: string;
	slug: string;
	blurDataURL?: string;
}

export const ThoughtHeader: React.FC<HeaderProps> = ({
	slug,
	markdown,
	thought
}) => {
	const words = thought.title.split(' ');
	const spans = words.map((word, index) => (
		<span
			key={index + '-markdown-title'}
			className="inline-block motion-safe:animate-blog-in motion-reduce:animate-blog-in-reduced motion-reduce:!delay-0 opacity-0 fill-mode-forwards"
			style={{ animationDelay: `${500 + index * 100}ms` }}
		>
			{word}
			&nbsp;
		</span>
	));

	// determine header size based on number of lines the title is going to occupy
	let headerSize = 'sm:text-5xl lg:text-7xl';

	return (
		<header className="flex flex-col gap-12 pt-20 mb-16">
			<div className="px-10 uppercase flex flex-col sm:flex-row text-base sm:justify-between gap-8 opacity-0 motion-safe:animate-blog-in motion-reduce:animate-blog-in-reduced delay-300">
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
			<div className="px-10">
				<h1 className={headerSize}>{spans}</h1>
				<p>{thought.description}</p>
			</div>
		</header>
	);
};
