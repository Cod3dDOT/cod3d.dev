'use client';

import { useLenis } from '@/lib/lenis';
import { remapRange } from '@/lib/utils/math';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const calculateScale = (
	scrollProgress: number,
	index: number,
	totalItems: number,
	factor: number = 10
) => {
	// Calculate the relative position of the current span
	const position = index / (totalItems - 1); // Normalize the index position between 0 and 1
	const relativePosition = position - scrollProgress;

	// Determine the scale factor
	// The closer to 0 the relative position is, the larger the scale
	const scaleFactor = Math.exp(-Math.pow(relativePosition * factor, 2)); // Adjust 5 for sensitivity

	// Return the scale, adjusting the multiplier to suit your needs
	return scaleFactor; // Adjust 1.5 for maximum scale effect
};

export const TableOfContents: React.FC<{ markdown: string }> = ({
	markdown
}) => {
	const [headings, setHeadings] = useState<{ content: string; id: string }[]>(
		markdown
			.split('\n')
			.map((line) => line.match(/#{2,6} (.*)/))
			.filter(Boolean)
			.map((heading) => {
				const content = heading![1];
				const id = content
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^\w-]+/g, '');
				return { content, id };
			})
	);

	useEffect(() => {
		const article = document.getElementsByTagName('article')[0];
		if (!article) return;

		const headings = article.querySelectorAll('h2, h3, h4, h5, h6');
		setHeadings(
			Array.from(headings).map((heading) => {
				const id = heading.id;
				const content = heading.textContent || '';
				return { content, id };
			})
		);
	}, []);

	const [progress, setProgress] = useState(0);
	useLenis(({ scroll, dimensions }) => {
		const scrollProgress = remapRange(
			scroll,
			dimensions.height,
			dimensions.scrollHeight - dimensions.height,
			0,
			dimensions.scrollHeight
		);
		setProgress(scrollProgress / dimensions.scrollHeight);
	}, []);

	return (
		<nav className="hidden xl:block not-prose left-full overflow-hidden -translate-y-1/2 sticky top-1/2 mt-60 self-start">
			<ul className="list-none">
				{headings.map(({ content: heading, id }, index) => (
					<TableOFContentsLi
						key={'toc-' + id}
						heading={heading}
						id={id}
						index={index}
						total={headings.length}
						progress={progress}
					/>
				))}
			</ul>
		</nav>
	);
};

export const TableOFContentsLi = ({
	heading,
	id,
	index,
	total,
	progress
}: {
	heading: string;
	id: string;
	index: number;
	total: number;
	progress: number;
}) => {
	const lenis = useLenis();
	const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		lenis?.scrollTo(`#${id}`);
	};
	return (
		<li
			key={heading}
			className="whitespace-nowrap text-foreground font-light w-96"
			style={{
				margin: calculateScale(progress, index, total, total / 1.5) + 'rem 0px',
				opacity: 0.5 + calculateScale(progress, index, total)
			}}
		>
			<Link href={`#${id}`} onClick={onClick}>
				{heading}
			</Link>
		</li>
	);
};
