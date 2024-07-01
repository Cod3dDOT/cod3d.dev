'use client';

import HomeIcon from '@/components/icons/home';
import { ThemeSwitch } from '@/components/themeSwitch';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

export const DesktopOpener: React.FC<{
	setOpened?: (open: boolean) => void;
	opened: boolean;
	pathname: string;
}> = ({ setOpened, opened, pathname }) => {
	const openRef = useRef<HTMLButtonElement>(null);

	const onClick = useCallback(() => {
		if (setOpened) setOpened(!opened);
	}, [opened]);

	useEffect(() => {
		const open = openRef.current;
		if (!open) return;

		open.addEventListener('click', onClick);

		return () => {
			open.removeEventListener('click', onClick);
		};
	}, [openRef]);

	return (
		<div className="hidden sm:flex flex-col items-center h-full sm:w-16 w-12 shadow-lg">
			<ThemeSwitch
				id="theme-switch-desktop"
				className={clsx(
					'w-full p-4 transition-transform duration-300 translate-y-4',
					opened && pathname == '/' && 'translate-y-[3.3rem]'
				)}
			/>
			<Link
				href="/"
				className={clsx(
					'transition-transform w-full aspect-square p-4 hover:scale-95',
					pathname == '/' && '!scale-0'
				)}
			>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="w-full h-full fill-foreground"
				/>
				<span className="sr-only">Home</span>
			</Link>
			<button
				ref={openRef}
				className="relative group h-1/2 my-auto w-16 *:absolute *:w-1 *:h-16 *:bg-foreground *:top-1/2 *:left-1/2 *:-translate-y-1/2"
			>
				<span
					className={clsx(
						'transition-all -translate-x-[calc(50%-4px)] ',
						opened
							? '!-translate-x-1/2 !h-8 !rotate-45 group-hover:scale-y-90'
							: 'group-hover:scale-y-125'
					)}
				/>
				<span
					className={clsx(
						'transition-all -translate-x-[calc(50%+4px)]',
						opened &&
							'!-translate-x-1/2 !h-8 !-rotate-45 group-hover:scale-y-90'
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
		</div>
	);
};
