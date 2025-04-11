import Link from "next/link";

import BackIcon from "@/components/icons/back";
import { cn } from "@/lib/utils/cn";

interface BackLinkProps {
	className?: string;
}

export const BackLink: React.FC<BackLinkProps> = ({ className }) => {
	return (
		<Link
			hrefLang="en"
			href="/thoughts"
			className={cn(
				"motion-safe:animate-in motion-reduce:animate-in-reduced inline-flex items-center space-x-2 px-10 [--delay:0ms] hover:underline print:hidden",
				className
			)}
		>
			<BackIcon className="aspect-square h-full" />
			<span>All thoughts</span>
		</Link>
	);
};
