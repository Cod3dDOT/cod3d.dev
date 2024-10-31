import { clsx } from 'clsx';

import { dateToString } from '@/lib/utils/date';

export const DateScroll: React.FC<{
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
					<span key={i.toString() + '-date-scroll-' + date}>{date}</span>
				))}
			</div>
		</time>
	);
};
