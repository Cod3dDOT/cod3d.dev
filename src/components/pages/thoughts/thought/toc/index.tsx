'use client';

import { useEffect, useMemo, useState } from 'react';

import { useLenis } from '@/lib/lenis';
import clsx from 'clsx';

interface Heading {
	content: string;
	id: string;
	top: number; // Top offset of the heading
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

const calculateScale = (
	headings: Heading[], // List of all headings
	index: number, // Index of the current heading
	scrollY: number, // Current scroll position
	factor: number = 800 // Sensitivity factor for scaling
): number => {
	const currentHeading = headings[index];
	const nextHeading = headings[index + 1] || {
		top: document.body.scrollHeight
	};

	const sectionHeight = nextHeading.top - currentHeading.top; // Height of the section
	const distanceFromScroll = Math.abs(
		scrollY - (currentHeading.top + sectionHeight / 2)
	); // Distance from scroll position

	// Calculate scale using exponential decay
	const scale = Math.exp(-distanceFromScroll / factor);
	const colorScale = Math.exp((-distanceFromScroll / factor) * 2);

	return scale;
};

export const TableOfContents: React.FC<{ markdown: string }> = ({
	markdown
}) => {
	const [headings, setHeadings] = useState<Heading[]>([]);

	useEffect(() => {
		const article = document.getElementsByTagName('article')[0];
		if (!article) return;

		const headings = article.querySelectorAll('h2, h3, h4, h5, h6');
		setHeadings(
			Array.from(headings).map((heading) => {
				const id = heading.id;
				const content = heading.textContent || '';
				const level = parseInt(heading.tagName[1]);
				const top = (heading as HTMLElement).offsetTop;
				return { content, id, level, top } as Heading;
			})
		);
	}, []);

	const [scrollY, setScrollY] = useState(0);
	useLenis(({ scroll, dimensions }) => {
		// const scrollProgress = remapRange(
		// 	scroll,
		// 	dimensions.height,
		// 	dimensions.scrollHeight - dimensions.height,
		// 	0,
		// 	dimensions.scrollHeight
		// );
		setScrollY(scroll - dimensions.height);
	}, []);

	return (
		<nav className="relative">
			<ul className="list-none">
				{headings.map((heading, index) => (
					<TableOFContentsLi
						key={'toc-' + heading.id}
						headings={headings}
						index={index}
						scrollY={scrollY}
					/>
				))}
			</ul>
		</nav>
	);
};

export const TableOFContentsLi = ({
	headings,
	index,
	scrollY
}: {
	headings: Heading[];
	index: number;
	scrollY: number;
}) => {
	const lenis = useLenis();
	const heading = headings[index];
	const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		lenis?.scrollTo(`#${heading.id}`);
	};

	const scale = calculateScale(headings, index, scrollY);

	return (
		<li
			key={heading.content}
			className={clsx(
				'relative whitespace-nowrap text-foreground font-light w-96'
			)}
			style={{
				margin: `0 0 0 ${(heading.level - 1) * 2}rem`,
				opacity: 0.5 + scale
			}}
		>
			<span
				className="absolute top-1/2 -translate-y-1/2 -left-full -translate-x-4 w-full h-px bg-blue-400"
				style={{
					opacity: 0.25 + scale
				}}
			/>
			<a href={`#${heading.id}`} onClick={onClick}>
				{heading.content}
			</a>
		</li>
	);
};
