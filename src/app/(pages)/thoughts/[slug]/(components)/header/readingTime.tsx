import readingTime from "@/lib/readingTime";

export const ReadingTime: React.FC<{
	markdown: string;
}> = ({ markdown }) => {
	const minutes = readingTime(markdown).minutes;
	const minArray = Array.from({ length: minutes }, (_, i) => i + 1);
	return (
		<>
			<div
				className="relative inline-block overflow-hidden"
				aria-hidden="true"
			>
				<span className="invisible">{minutes}</span>
				<span className="animate-scroll-in motion-reduce:animate-scroll-in-reduced absolute left-0 flex flex-col whitespace-nowrap">
					{minArray.map((m, i) => {
						return (
							<span key={i.toString() + "-reading-time"}>
								{m}
							</span>
						);
					})}
				</span>
				<span> minutes</span>
			</div>
			<span className="sr-only">{minutes} minutes</span>
		</>
	);
};
