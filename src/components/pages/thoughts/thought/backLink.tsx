import { Link } from 'next-view-transitions';

import BackIcon from '@/components/icons/back';

export const BackLink: React.FC = () => {
	return (
		<Link
			hrefLang="en"
			href="/thoughts"
			className="print:hidden inline-flex items-center space-x-2 hover:underline motion-safe:animate-blog-in motion-reduce:animate-blog-in-reduced px-10 duration-1000"
		>
			<BackIcon className="h-full aspect-square" />
			<span>All thoughts</span>
		</Link>
	);
};
