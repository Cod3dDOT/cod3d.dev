'use client';

import { useLenis } from '@/lib/lenis';
import { clsx } from 'clsx';
import { useCallback, useEffect, useState } from 'react';

type Heading = {
	text: string;
	id: string;
};

export const TableofContents: React.FC<{ className?: string }> = ({
	className
}) => {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [active, setActive] = useState<number[]>([]);

	const lenis = useLenis();

	const onLinkClick = useCallback(
		(e: MouseEvent, href: string) => {
			e.preventDefault();
			const relativeHref = '#' + href?.split('#').at(-1);

			lenis?.scrollTo(relativeHref);
		},
		[lenis]
	);

	const onIntersect = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const activeCopy = active;

			entries.forEach((entry) => {
				const index = headings.findIndex(
					(heading) => heading.id === entry.target.id
				);
				if (entry.isIntersecting) {
					activeCopy.push(index);
				} else {
					activeCopy.splice(activeCopy.indexOf(index), 1);
				}
			});

			setActive([...activeCopy]);
		},
		[headings, active]
	);

	useEffect(() => {
		const options = {
			root: document,
			rootMargin: '0px',
			threshold: 0.1
		};

		const observer = new IntersectionObserver(onIntersect, options);

		headings.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
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

	useEffect(() => {
		const tableOfContents = document.getElementById('table-of-contents');
		const anchorLinks = Array.from(
			tableOfContents?.getElementsByTagName('a') || []
		).filter((link) => link.getAttribute('href')?.includes('#'));

		for (const link of anchorLinks) {
			link.addEventListener('click', (e) => onLinkClick(e, link.href));
		}

		return () => {
			for (const link of anchorLinks) {
				link.removeEventListener('click', (e) => onLinkClick(e, link.href));
			}
		};
	}, [lenis]);

	return (
		<div
			id="table-of-contents"
			className={clsx('space-y-8 2xl:block hidden', className)}
		>
			<ul>
				{headings.map((heading, index) => {
					return (
						<li
							key={heading.id}
							className={clsx(
								'transition-all hover:scale-105',
								active.includes(index) && ' text-blue-500'
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
