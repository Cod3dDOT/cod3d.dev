import { Link } from 'next-view-transitions';
import ChevronIcon from '../icons/chevron';

export const SectionLink: React.FC<{ link: string; text: string }> = ({
	link,
	text
}) => {
	return (
		<Link
			hrefLang="en"
			href={link}
			target="_top"
			className="relative flex group w-full justify-between items-center mb-8 overflow-hidden leading-none
            hover:-skew-x-6 transition-transform"
		>
			<h2 className="md:text-[5.65rem] sm:text-[4rem] text-[2.83rem] group-hover:[text-shadow:4px_4px_0px_#407cff] transition-all">
				{text}
			</h2>
			<div className="relative w-8 h-8 group-hover:opacity-100 lg:opacity-0 transition-opacity">
				<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows left-1" />
				<ChevronIcon className="absolute aspect-square h-full fill-foreground animate-arrows delay-75" />
			</div>
		</Link>
	);
};
