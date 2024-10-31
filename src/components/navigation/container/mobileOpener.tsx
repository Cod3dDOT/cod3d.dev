'use client';

import { clsx } from 'clsx';
import { Link } from 'next-view-transitions';
import { useCallback, useEffect, useRef } from 'react';

import ChevronIcon from '@/components/icons/chevron';
import HomeIcon from '@/components/icons/home';
import { ThemeSwitch } from '@/components/themeSwitch';

export const MobileOpener: React.FC<{
	setOpened?: (open: boolean) => void;
	opened: boolean;
	pathname: string;
}> = ({ setOpened, opened, pathname }) => {
	const ref = useRef<HTMLButtonElement>(null);

	const handleClick = useCallback(() => {
		if (!setOpened) return;

		setOpened(!opened);
	}, [setOpened, opened]);

	useEffect(() => {
		ref.current?.addEventListener('click', handleClick);
		return () => ref.current?.removeEventListener('click', handleClick);
	}, [handleClick]);

	return (
		<div
			className={clsx(
				'flex sm:hidden absolute p-4 space-x-2 z-20',
				'transition-transform duration-300 will-change-transform',
				!opened ? '-translate-x-full' : 'translate-x-[calc(100vw-100%)]'
			)}
		>
			<Link
				hrefLang="en"
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
			<button ref={ref} type="button">
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
