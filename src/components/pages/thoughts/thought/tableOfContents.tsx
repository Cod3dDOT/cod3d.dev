"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useWindowSize } from "react-use";

import { cn } from "@/lib/utils/cn";

interface Heading {
	content: string;
	id: string;
	top: number;
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

const calculateScale = (
	headingTop: number,
	nextHeadingTop: number,
	scrollY: number,
	screenHeight: number
): number => {
	const startedLookingAt = scrollY - headingTop + screenHeight / 2 > 0;
	const stoppedLookingAt = scrollY - nextHeadingTop + screenHeight / 2 > 0;
	return startedLookingAt && !stoppedLookingAt ? 1 : 0;
};

const margin = {
	2: "ml-8",
	3: "ml-16",
	4: "ml-24",
	5: "ml-32",
	6: "ml-40",
};

const classNames = {
	0: "text-foreground/30",
	1: "text-accent font-normal",
};

const TOCListItem = memo(
	({
		heading,
		active,
		onHeadingClick,
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
					"text-foreground relative w-96 font-light whitespace-nowrap transition-all duration-200 ease-linear",
					margin[heading.level as keyof typeof margin],
					classNames[active ? 1 : 0]
				)}
			>
				<span
					className={cn(
						"absolute top-1/2 -left-full h-px w-full -translate-x-4 -translate-y-1/2 transition-colors",
						active ? "bg-accent" : "bg-foreground/10"
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
				const scale = calculateScale(
					heading.top,
					nextHeading ? nextHeading.top : document.body.scrollHeight,
					scrollY,
					height
				);
				if (scale == 1) {
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
			level: parseInt(heading.tagName[1]) as Heading["level"],
			top: (heading as HTMLElement).offsetTop,
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
		<nav className="relative">
			<ul className="list-none">
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
