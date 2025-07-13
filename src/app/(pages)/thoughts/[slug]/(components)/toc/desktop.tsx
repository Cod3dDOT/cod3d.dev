/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useLenis } from "lenis/react";
import { memo, useCallback, useState } from "react";
import { useWindowSize } from "react-use";

import { useTableOfContents } from "@/lib/hooks/useTableOfContents";
import type { HeadingInfo } from "@/lib/markdown/pluginTOC";
import { cn } from "@/lib/utils/cn";

const HEADING_MARGINS = {
	2: "ml-8",
	3: "ml-16",
	4: "ml-24",
	5: "ml-32",
	6: "ml-40"
} as const;

const SCROLL_OFFSET = -30;
const TOC_SELECTOR = "h2, h3, h4, h5, h6";

/**
 * Determines if a heading is currently active based on scroll position
 */
const isHeadingActive = (
	headingTop: number,
	nextHeadingTop: number,
	scrollY: number,
	screenHeight: number
): boolean => {
	const startedViewing = scrollY - headingTop + screenHeight / 2 > 0;
	const stoppedViewing = scrollY - nextHeadingTop + screenHeight / 2 > 0;

	return startedViewing && !stoppedViewing;
};

interface TOCListItemProps {
	heading: HeadingInfo;
	isActive: boolean;
	onHeadingClick?: (id: string) => void;
}

export const TOCListItem = memo<TOCListItemProps>(
	({ heading, isActive, onHeadingClick }) => {
		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLAnchorElement>) => {
				if (!onHeadingClick) return;
				event.preventDefault();
				onHeadingClick(heading.id);
			},
			[heading.id, onHeadingClick]
		);

		const marginClass =
			HEADING_MARGINS[heading.level as keyof typeof HEADING_MARGINS];

		return (
			<li
				className={cn(
					// Base styles
					"group/li relative w-96 whitespace-nowrap transition-all duration-200",
					// Margin based on heading level
					marginClass
				)}
			>
				{/* Active indicator line */}
				<span
					className={cn(
						// Base line styles
						"-left-full -translate-x-4 -translate-y-1/2 absolute top-1/2",
						"h-px w-full bg-foreground/10 transition-colors duration-200",
						// Active line styles
						isActive
							? "bg-accent-blue dark:bg-accent-yellow"
							: "group-hover/li:bg-accent-blue/60 dark:group-hover/li:bg-accent-yellow/60"
					)}
				/>

				{/* Heading link */}
				<a
					href={`#${heading.id}`}
					onClick={handleClick}
					className={cn(
						"block transition-all duration-200",
						// Active state styles
						isActive
							? "font-medium text-accent-blue dark:text-accent-yellow"
							: "group-hover/li:text-accent-blue/60 dark:group-hover/li:text-accent-yellow/60"
					)}
				>
					{heading.text}
				</a>
			</li>
		);
	}
);

TOCListItem.displayName = "TOCListItem";

export const TableOfContents: React.FC = () => {
	const headings = useTableOfContents({
		container: "article",
		selector: TOC_SELECTOR,
		observeChanges: false
	});

	const [activeIndex, setActiveIndex] = useState(0);
	const { height: windowHeight } = useWindowSize();

	const lenis = useLenis(
		({ scroll }: { scroll: number }) => {
			if (headings.length === 0) return;

			const adjustedScrollY = scroll - windowHeight;

			// Find the currently active heading
			for (let i = 0; i < headings.length; i++) {
				const currentHeading = headings[i];
				const nextHeading = headings[i + 1];

				const nextHeadingTop = nextHeading
					? nextHeading.offsetTop
					: document.body.scrollHeight;

				const isActive = isHeadingActive(
					currentHeading.offsetTop,
					nextHeadingTop,
					adjustedScrollY,
					windowHeight
				);

				if (isActive) {
					setActiveIndex(i);
					break;
				}
			}
		},
		[headings, windowHeight]
	);

	const handleHeadingClick = useCallback(
		(id: string) => {
			lenis?.scrollTo(`#${id}`, { offset: SCROLL_OFFSET });
		},
		[lenis]
	);

	if (headings.length === 0) {
		return;
	}

	return (
		<nav
			className="relative animate-in opacity-0 [--delay:1000ms]"
			aria-label="Table of contents"
		>
			<ul className="list-none font-light text-foreground/40 text-xl leading-relaxed">
				{headings.map((heading, index) => (
					<TOCListItem
						key={`toc-${heading.id}`}
						heading={heading}
						isActive={activeIndex === index}
						onHeadingClick={handleHeadingClick}
					/>
				))}
			</ul>
		</nav>
	);
};
