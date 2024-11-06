'use client';

import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import CopyIcon from '@/components/icons/copy';

type CopyState = null | 'success' | 'error';

export const CopyButton: React.FC<{
	id?: string;
	content?: string;
	contentName: string;
	className?: string;
}> = ({ id, content: initialContent = '', contentName, className }) => {
	// Use refs instead of state for values that don't need to trigger re-renders
	const timeoutRef = useRef<NodeJS.Timeout>();
	const buttonRef = useRef<HTMLButtonElement>(null);
	// Only copied state needs to trigger re-renders for visual feedback
	const [copyState, setCopyState] = useState<CopyState>(null);

	// Memoized copy handler
	const handleCopy = async (content: string) => {
		try {
			await navigator.clipboard.writeText(content).catch(() => {});

			setCopyState('success');
		} catch {
			setCopyState('error');
		}

		// Clear previous timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Reset copy state after animation
		timeoutRef.current = setTimeout(() => {
			setCopyState(null);
		}, 1000);
	};

	// Set up content and event listener
	useEffect(() => {
		// If we have direct content or no id, skip
		if (initialContent || !id) return;

		const element = document.getElementById(id);
		if (!element) return;

		// Set content once
		const c = element.textContent || '';

		buttonRef.current?.addEventListener('click', () => void handleCopy(c));

		// Clean up timeout on unmount
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			buttonRef.current?.removeEventListener('click', () => void handleCopy(c));
		};
	}, [id]);

	return (
		<button
			ref={buttonRef}
			type="button"
			className={clsx(
				'group relative hover:scale-110 transition-all duration-200 z-10',
				className
			)}
			title="Copy to clipboard"
			aria-label={`Copy ${contentName} to clipboard`}
		>
			<CopyIcon
				showCheck={copyState === 'success'}
				className={clsx(
					'absolute stroke-foreground stroke-2 inset-0 w-full h-full transition-all',
					{
						'stroke-red-500': copyState === 'error',
						'stroke-lime-500': copyState === 'success'
					}
				)}
			/>
			{/* Animation ping effect */}
			<span
				className={clsx(
					'absolute bg-lime-500/20 w-20 h-20 right-0 top-0 translate-x-full -translate-y-full rounded-full opacity-0 transition-opacity duration-200',
					'group-[.copied]:opacity-100 group-[.copied]:animate-ping'
				)}
			/>
		</button>
	);
};
