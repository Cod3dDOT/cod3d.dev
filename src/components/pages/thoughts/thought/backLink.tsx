import { clsx } from 'clsx';
import { Link } from 'next-view-transitions';

import BackIcon from '@/components/icons/back';

interface BackLinkProps {
	className?: string;
}

export const BackLink: React.FC<BackLinkProps> = ({ className }) => {
	return (
		<Link
			hrefLang="en"
			href="/thoughts"
			className={clsx(
				'not-prose print:hidden inline-flex items-center space-x-2 hover:underline motion-safe:animate-blog-in motion-reduce:animate-blog-in-reduced px-10 [--delay:0ms]',
				className
			)}
		>
			<BackIcon className="h-full aspect-square" />
			<span>All thoughts</span>
		</Link>
	);
};
