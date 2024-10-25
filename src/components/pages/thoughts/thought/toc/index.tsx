'use client';

import { useEffect, useState } from 'react';

import { useLenis } from '@/lib/lenis';
import { remapRange } from '@/lib/utils/math';
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
): { scale: number; isCurrent: boolean } => {
	const currentHeading = headings[index];
	const nextHeading = headings[index + 1] || {
		top: document.body.scrollHeight
	};

	const sectionHeight = nextHeading.top - currentHeading.top; // Height of the section
	const distanceFromScroll = Math.abs(
		scrollY - (currentHeading.top + sectionHeight / 2)
	); // Distance from scroll position

	// Check if the current heading is the one closest to the scroll position
	const isCurrent = distanceFromScroll < sectionHeight / 2;

	// Calculate scale using exponential decay
	const scale = Math.exp(-distanceFromScroll / factor);

	return { scale, isCurrent };
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

	const [progress, setProgress] = useState(0);
	useLenis(({ scroll, dimensions }) => {
		// const scrollProgress = remapRange(
		// 	scroll,
		// 	dimensions.height,
		// 	dimensions.scrollHeight - dimensions.height,
		// 	0,
		// 	dimensions.scrollHeight
		// );
		setProgress(scroll);
	}, []);

	return (
		<nav>
			<ul className="list-none">
				{headings.map((heading, index) => (
					<TableOFContentsLi
						key={'toc-' + heading.id}
						headings={headings}
						index={index}
						scrollY={progress}
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

	const { scale, isCurrent } = calculateScale(headings, index, scrollY);

	return (
		<li
			key={heading.content}
			className={clsx(
				'relative whitespace-nowrap text-foreground font-light w-96 duration-500 transition-colors',
				isCurrent && 'text-blue-300'
			)}
			style={{
				margin: `0 0 0 ${(heading.level - 2) * 2}rem`,
				opacity: 0.5 + scale
			}}
		>
			<span
				className="absolute top-1/2 -translate-y-1/2 -left-full -translate-x-4 w-full bg-foreground h-px"
				style={{
					opacity: scale
				}}
			/>
			<a href={`#${heading.id}`} onClick={onClick}>
				{heading.content}
			</a>
		</li>
	);
};
