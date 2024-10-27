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
	screenHeight: number
): number => {
	const currentHeading = headings[index];
	const nextHeading = headings[index + 1] || {
		top: document.body.scrollHeight
	};

	const startedLookingAt = scrollY - currentHeading.top + screenHeight / 2 > 0;
	const stoppedLookingAt = scrollY - nextHeading.top + screenHeight / 2 > 0;

	return startedLookingAt && !stoppedLookingAt ? 1 : 0;
};

export const TableOfContents: React.FC = () => {
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
		lenis?.scrollTo(`#${heading.id}`, { offset: -100 });
	};

	const scale = calculateScale(
		headings,
		index,
		scrollY,
		lenis?.dimensions.height || 0
	);

	const margin = {
		2: 'ml-8',
		3: 'ml-16',
		4: 'ml-24',
		5: 'ml-32',
		6: 'ml-40'
	};

	const opacity = {
		0: 'opacity-30',
		1: 'opacity-100'
	};

	return (
		<li
			key={heading.content}
			className={clsx(
				'relative whitespace-nowrap text-foreground font-light w-96 transition-opacity duration-200 ease-linear',
				margin[heading.level as keyof typeof margin],
				opacity[scale as keyof typeof opacity]
			)}
		>
			<span className="absolute top-1/2 -translate-y-1/2 -left-full -translate-x-4 w-full h-px bg-blue-400" />
			<a href={`#${heading.id}`} onClick={onClick}>
				{heading.content}
			</a>
		</li>
	);
};
