"use client";

import { useLenis } from "lenis/react";
import { memo, useCallback, useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import { cn } from "@/lib/utils/cn";

interface Heading {
	content: string;
	id: string;
	top: number;
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

const isActive = (
	headingTop: number,
	nextHeadingTop: number,
	scrollY: number,
	screenHeight: number
): boolean => {
	const startedLookingAt = scrollY - headingTop + screenHeight / 2 > 0;
	const stoppedLookingAt = scrollY - nextHeadingTop + screenHeight / 2 > 0;
	return startedLookingAt && !stoppedLookingAt;
};

const margin = {
	2: "ml-8",
	3: "ml-16",
	4: "ml-24",
	5: "ml-32",
	6: "ml-40"
};

const TOCListItem = memo(
	({
		heading,
		active,
		onHeadingClick
	}: {
		heading: Heading;
		active: boolean;
		onHeadingClick: (id: string) => void;
	}) => {
		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLAnchorElement>) => {
				event.preventDefault();
				onHeadingClick(heading.id);
			},
			[heading.id, onHeadingClick]
		);

		return (
			<li
				className={cn(
					"relative w-96 whitespace-nowrap transition-all duration-200",
					margin[heading.level as keyof typeof margin],
					active && "font-normal text-accent-blue dark:text-accent-yellow"
				)}
			>
				<span
					className={cn(
						"bg-foreground/10 transition-all duration-200",
						"-left-full -translate-x-4 -translate-y-1/2 absolute top-1/2 h-px w-full",
						active && "bg-accent-blue dark:bg-accent-yellow"
					)}
				/>
				<a href={`#${heading.id}`} onClick={handleClick}>
					{heading.content}
				</a>
			</li>
		);
	}
);

TOCListItem.displayName = "TOCListItem";

export const TableOfContents: React.FC = () => {
	const [headings, setHeadings] = useState<Heading[]>([]);

	const [active, setActive] = useState(0);
	const { height } = useWindowSize();

	const lenis = useLenis(
		({ scroll }: { scroll: number }) => {
			if (headings.length === 0) return;

			const scrollY = scroll - height;

			for (let i = 0; i < headings.length; i++) {
				const heading = headings[i];
				const nextHeading = headings.at(i + 1);
				const active = isActive(
					heading.top,
					nextHeading ? nextHeading.top : document.body.scrollHeight,
					scrollY,
					height
				);
				if (active) {
					setActive(i);
					break;
				}
			}
		},
		[headings, height]
	);

	useEffect(() => {
		const article = document.getElementsByTagName("article")[0];

		const headingElements = article.querySelectorAll("h2, h3, h4, h5, h6");
		const newHeadings = Array.from(headingElements).map((heading) => ({
			id: heading.id,
			content: heading.textContent || "",
			level: Number.parseInt(heading.tagName[1]) as Heading["level"],
			top: (heading as HTMLElement).offsetTop
		}));

		setHeadings(newHeadings);
	}, []);

	const handleHeadingClick = useCallback(
		(id: string) => {
			lenis?.scrollTo(`#${id}`);
		},
		[lenis]
	);

	return (
		<nav className="relative animate-in opacity-0 [--delay:1000ms]">
			<ul className="list-none font-light text-foreground/30 text-xl leading-relaxed">
				{headings.map((heading, index) => (
					<TOCListItem
						key={`toc-${heading.id}`}
						heading={heading}
						active={active === index}
						onHeadingClick={handleHeadingClick}
					/>
				))}
			</ul>
		</nav>
	);
};
