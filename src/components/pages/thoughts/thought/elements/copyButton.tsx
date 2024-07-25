'use client';

import { useEffect, useState } from 'react';
import CopyIcon from '../../../../icons/copy';
import ChevronIcon from '../../../../icons/chevron';
import { clsx } from 'clsx';

export const CopyButton: React.FC<{ className?: string }> = ({ className }) => {
	const [copied, setCopied] = useState(false);

	const handleClick = () => {
		// navigator.clipboard.writeText('https://cod3d.dev');
		setCopied(true);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (copied) setCopied(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [copied]);

	return (
		<>
			<button
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
