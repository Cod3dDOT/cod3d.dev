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
		const options = {
			root: document,
			rootMargin: '0px',
			threshold: 1.0
		};

		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				const last = entries.findLast((el) => el.isIntersecting);
				const index = headings.findIndex((el) => el.id == last?.target.id);
				if (index != -1) setActiveIndex(index);
			},
			options
		);
		headings.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});
	}, [headings]);

	useEffect(() => {
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
	}, []);

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
