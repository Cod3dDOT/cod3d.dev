'use client';

import ChevronIcon from '@/components/icons/chevron';
import HomeIcon from '@/components/icons/home';
import { ThemeSwitch } from '@/components/themeSwitch';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

export const MobileOpener: React.FC<{
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
		<div
			className={clsx(
				'flex sm:hidden absolute p-4 space-x-2 z-20',
				'transition-transform duration-300 will-change-transform',
				!opened ? '-translate-x-full' : 'translate-x-[calc(100vw-100%)]'
			)}
		>
			<Link
				href="/"
				className={clsx(
					'ml-auto transition-transform hover:scale-95',
					pathname == '/' && '!scale-0'
				)}
			>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="h-12 w-12 p-2 fill-foreground"
				/>
				<span className="sr-only">Home</span>
			</Link>
			<ThemeSwitch id="theme-switch-mobile" className="h-12 w-12 p-3" />
			<button type="button" ref={openRef}>
				<ChevronIcon
					className={clsx(
						'h-12 w-12 p-4 fill-foreground transition-transform duration-300',
						opened && 'rotate-180'
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
		</div>
	);
};
