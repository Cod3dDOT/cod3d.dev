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

	const dates = Array.from(
		{ length: date.getDate() - startDate.getDate() + 1 },
		(_, i) => {
			const d = new Date(startDate);
			d.setDate(d.getDate() + i);
			return dateToString(d);
		}
	);

	return (
		<time
			dateTime={date.toISOString()}
			className="relative inline-block overflow-hidden"
		>
			<span className="invisible">{dateToString(date)}</span>
			<div
				className={clsx(
					'left-0 absolute flex flex-col whitespace-nowrap animate-out slide-out-to-top-full fill-mode-forwards duration-1000 ease-in-out',
					delay
				)}
				aria-hidden="true"
			>
				{dates.map((date, i) => (
					<span key={i + '-date-scroll'}>{date}</span>
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
				<span className="left-0 absolute flex flex-col whitespace-nowrap animate-out slide-out-to-top-full fill-mode-forwards duration-1000 ease-in-out">
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

export const ThoughtHeader: React.FC<{
	slug: string;
	thought: Thought;
	markdown: string;
}> = ({ slug, markdown, thought }) => {
	return (
		<header className="px-10 uppercase flex flex-col sm:flex-row pt-20 pb-6 text-base sm:gap-72 gap-12 opacity-0 animate-blog-in delay-300">
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
			<div className="hidden md:block">
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
							target="_blank"
							rel="noopener noreferrer"
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
		</header>
	);
};
