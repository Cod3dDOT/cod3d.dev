'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import React, { useEffect, useRef } from 'react';

import ChevronIcon from '@/components/icons/chevron';
import HomeIcon from '@/components/icons/home';
import { ThemeSwitch } from '@/components/themeSwitch';
import { useNavigation } from '@/lib/context/navigationContext';

export const MobileOpener: React.FC = React.memo(() => {
	const ref = useRef<HTMLButtonElement>(null);
	const { isOpen, toggleNav } = useNavigation();
	const pathname = usePathname();

	useEffect(() => {
		ref.current?.addEventListener('click', toggleNav);
		return () => ref.current?.removeEventListener('click', toggleNav);
	}, [toggleNav]);

	return (
		<div
			className={clsx(
				'flex sm:hidden absolute p-4 space-x-2 z-20',
				'transition-transform duration-300 will-change-transform',
				!isOpen ? '-translate-x-full' : 'translate-x-[calc(100vw-100%)]'
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

			<MobileThemeSwitch />

			<button ref={ref} type="button">
				<ChevronIcon
					className={clsx(
						'h-12 w-12 p-4 fill-foreground transition-transform duration-300',
						isOpen && 'rotate-180'
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
		</div>
	);
});

const MobileThemeSwitch = React.memo(() => (
	<ThemeSwitch id="theme-switch-mobile" className="h-12 w-12 p-3" />
));
