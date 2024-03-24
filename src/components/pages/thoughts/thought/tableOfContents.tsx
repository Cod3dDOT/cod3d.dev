'use client';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

type Heading = {
	text: string;
	id: string;
};

export const TableofContents: React.FC<{ className?: string }> = ({
	className
}) => {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (!window) return;

		const headingsWithIds = Array.from(
			document.querySelectorAll(
				'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'
			)
		);

		const headingsText = Array.from(headingsWithIds).map((heading) => {
			return {
				id: heading.id,
				text: heading.textContent || ''
			};
		});

		setHeadings(headingsText);

		const options = {
			root: document,
			rootMargin: '0px',
			threshold: 1.0
		};

		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				const last = entries.findIndex((el) => el.isIntersecting);
				if (last != -1) setActiveIndex(last);
			},
			options
		);
		headingsWithIds.forEach((element) => {
			observer.observe(element);
		});
	}, [activeIndex]);

	return (
		<div className={clsx('space-y-8 xl:block hidden', className)}>
			<span className="">Table of Contents</span>
			<ul className="text-sm">
				{headings.map((heading, index) => {
					return (
						<li
							key={heading.id}
							className={clsx(
								'transition-all hover:scale-105',
								index == activeIndex && ' text-blue-500'
							)}
						>
							<a
								className="thoughts-table-of-contents py-2 block"
								href={'#' + heading.id}
							>
								{heading.text}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
