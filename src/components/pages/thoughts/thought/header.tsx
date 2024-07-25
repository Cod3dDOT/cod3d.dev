import { Thought } from '@/lib/pocketbase/types';
import readingTime from '@/lib/readingTime';
import { dateToString } from '@/lib/utils/date';
import { clsx } from 'clsx';

const DateScroll: React.FC<{
	date: string;
	delay?: 'delay-500' | 'delay-1000' | 'delay-2000';
}> = ({ date, delay = 'delay-500' }) => {
	const original = new Date(date);
	const startDate = new Date(date);
	startDate.setDate(startDate.getDate() - 7); // Start from 7 days ago

	const dates = Array.from(
		{ length: original.getDate() - startDate.getDate() },
		(_, i) => {
			const d = new Date(startDate);
			d.setDate(d.getDate() + i);
			return dateToString(d);
		}
	);

	return (
		<time dateTime={date} className="relative inline-block overflow-hidden">
			<span className="invisible">{dateToString(original)}</span>
			<div
				className={clsx(
					'left-0 absolute flex flex-col whitespace-nowrap animate-out slide-out-to-top-full fill-mode-forwards duration-1000',
					delay
				)}
			>
				{dates.map((date, i) => (
					<span key={i}>{date}</span>
				))}
			</div>
		</time>
	);
};

const ReadingTime: React.FC<{
	markdown: string;
}> = ({ markdown }) => {
	const minutes = readingTime(markdown, { wordsPerMinute: 100 }).minutes;
	const minArray = Array.from({ length: minutes }, (_, i) => i + 1);
	return (
		<div className="relative overflow-hidden inline-block">
			<span className="invisible">{minutes}</span>
			<span className="left-0 absolute flex flex-col whitespace-nowrap animate-out slide-out-to-top-full fill-mode-forwards duration-1000">
				{minArray.map((m) => {
					return <span>{m}</span>;
				})}
			</span>
		</div>
	);
};

export const ThoughtHeader: React.FC<{
	thought: Thought;
	markdown: string;
}> = ({ markdown, thought }) => {
	return (
		<header className="uppercase flex flex-col sm:flex-row py-20 text-base sm:gap-72 gap-12 opacity-0 animate-blog-in delay-300">
			<div className="*:align-middle">
				<span className="font-extralight">Reading time</span>
				<br />
				<ReadingTime markdown={markdown} />
				<span> minutes</span>
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
		</header>
	);
};
