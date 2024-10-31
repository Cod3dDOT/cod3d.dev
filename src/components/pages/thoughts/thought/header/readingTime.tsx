import readingTime from '@/lib/readingTime';

export const ReadingTime: React.FC<{
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
						return <span key={i.toString() + '-reading-time'}>{m}</span>;
					})}
				</span>
				<span> minutes</span>
			</div>
			<span className="sr-only">{minutes} minutes</span>
		</>
	);
};
