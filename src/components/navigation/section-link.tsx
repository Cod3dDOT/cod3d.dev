import Link from 'next/link';
import ChevronIcon from '../icons/chevron';

export const SectionLink: React.FC<{ link: string; text: string }> = ({
	link,
	text
}) => {
	return (
		<Link
			href={link}
			className="relative flex group w-full justify-between items-center mb-8 overflow-hidden
            hover:px-8 hover:rounded-full transition-all duration-500"
		>
			<h2 className="leading-tight">{text}</h2>
			<div className="relative w-8 h-8 group-hover:opacity-100 lg:opacity-0 transition-opacity">
				<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows left-1" />
				<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows delay-75" />
			</div>
			<span
				className="absolute left-0 bottom-0 bg-white dark:mix-blend-exclusion mix-blend-multiply w-0 h-2 transition-all
                            group-hover:animate-link-hover"
			/>
		</Link>
	);
};
