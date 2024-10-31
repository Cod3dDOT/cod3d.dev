'use client';

import { clsx } from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import CopyIcon from '@/components/icons/copy';

type CopyState = null | 'success' | 'error';

export const CopyButton: React.FC<{
	id?: string;
	content?: string;
	contentName: string;
	className?: string;
}> = ({ id, content: _content, contentName, className }) => {
	const [content, setContent] = useState(_content || '');
	const [copied, setCopied] = useState<CopyState>();
	const ref = useRef<HTMLButtonElement>(null);

	const handleClick = useCallback(() => {
		navigator.clipboard
			.writeText(content)
			.then(() => {
				setCopied('success');
			})
			.catch(() => {
				setCopied('error');
			})
			.finally(() => {
				setCopied(null);
			});
	}, [content]);

	useEffect(() => {
		if (content || !id) return;

		const element = document.getElementById(id);
		if (!element) return;

		setContent(element.textContent || '');

		ref.current?.addEventListener('click', handleClick);
		return () => ref.current?.removeEventListener('click', handleClick);
	}, [content, id]);

	return (
		<>
			<button
				ref={ref}
				type="button"
				className={clsx(
					'relative hover:scale-110 transition-all duration-200 z-10',
					className
				)}
				title="Copy to clipboard"
				aria-label={'Copy ' + contentName + ' to clipboard'}
			>
				<CopyIcon
					showCheck={copied === 'success'}
					className={clsx(
						'absolute stroke-foreground stroke-2 inset-0 w-full h-full transition-all',
						{
							'bg-red-500': copied === 'error',
							'bg-lime-500': copied === 'success'
						}
					)}
				/>
			</button>
			<span
				className={clsx(
					'absolute bg-lime-500 w-20 h-20 right-0 top-0 translate-x-full -translate-y-full rounded-full',
					copied === 'success' && 'animate-ping'
				)}
			/>
		</>
	);
};
