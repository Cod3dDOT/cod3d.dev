'use client';

import { useCallback, useEffect, useState } from 'react';
import CopyIcon from '../../../../icons/copy';
import { clsx } from 'clsx';

export const CopyButton: React.FC<{
	id?: string;
	content?: string;
	className?: string;
}> = ({ id, content: _content, className }) => {
	const [content, setContent] = useState(_content || '');
	const [copied, setCopied] = useState(false);

	const handleClick = useCallback(() => {
		navigator.clipboard.writeText(content);
		setCopied(true);
	}, [content]);

	useEffect(() => {
		if (content || !id) return;

		const element = document.getElementById(id);
		if (!element) return;

		setContent(element.textContent || '');
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (copied) setCopied(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [copied]);

	return (
		<>
			<button
				type="button"
				className={clsx(
					'relative hover:scale-110 transition-all duration-200 z-10',
					className
				)}
				onClick={handleClick}
				title="Copy to clipboard"
				aria-label="Copy to clipboard"
			>
				<CopyIcon
					showCheck={copied}
					className={clsx(
						'absolute stroke-foreground stroke-2 inset-0 w-full h-full transition-all',
						copied && 'stroke-lime-500'
					)}
				/>
			</button>
			<span
				className={clsx(
					'absolute bg-lime-500 w-20 h-20 right-0 top-0 translate-x-full -translate-y-full rounded-full',
					copied && 'animate-ping'
				)}
			/>
		</>
	);
};
