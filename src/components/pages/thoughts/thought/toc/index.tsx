'use client';

import { useEffect, useMemo, useState } from 'react';

import { useLenis } from '@/lib/lenis';
import clsx from 'clsx';

function lerpColor(color1: string, color2: string, t: number): string {
	const c1 = parseInt(color1.slice(1), 16);
	const c2 = parseInt(color2.slice(1), 16);

	const r1 = (c1 >> 16) & 0xff;
	const g1 = (c1 >> 8) & 0xff;
	const b1 = c1 & 0xff;

	const r2 = (c2 >> 16) & 0xff;
	const g2 = (c2 >> 8) & 0xff;
	const b2 = c2 & 0xff;

	const r = Math.round(r1 + t * (r2 - r1));
	const g = Math.round(g1 + t * (g2 - g1));
	const b = Math.round(b1 + t * (b2 - b1));

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

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
): { scale: number; color: string } => {
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

	const color = lerpColor('#ffffff', '#3b82f6', colorScale);

	return { scale, color };
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

	const { scale, color } = calculateScale(headings, index, scrollY);

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
				className="absolute top-1/2 -translate-y-1/2 -left-full -translate-x-4 w-full bg-foreground h-px"
				style={{
					opacity: scale,
					backgroundColor: color
				}}
			/>
			<a href={`#${heading.id}`} onClick={onClick}>
				{heading.content}
			</a>
		</li>
	);
};
