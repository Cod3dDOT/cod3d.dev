'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import React, { useEffect, useRef } from 'react';

import HomeIcon from '@/components/icons/home';
import { ThemeSwitch } from '@/components/themeSwitch';
import { useNavigation } from '@/lib/context/navigationContext';

export const DesktopOpener: React.FC = React.memo(() => {
	const ref = useRef<HTMLButtonElement>(null);
	const { isOpen, toggleNav } = useNavigation();

	useEffect(() => {
		ref.current?.addEventListener('click', toggleNav);
		return () => ref.current?.removeEventListener('click', toggleNav);
	}, [toggleNav]);

	return (
		<div className="hidden sm:flex flex-col items-center h-full sm:w-16 w-12 shadow-lg">
			<DesktopThemeSwitch />
			<HomeLink>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="w-full h-full fill-foreground"
				/>
				<span className="sr-only">Home</span>
			</HomeLink>
			<button
				ref={ref}
				type="button"
				className="relative group h-1/2 my-auto w-16 *:absolute *:w-1 *:h-16 *:bg-foreground *:top-1/2 *:left-1/2 *:-translate-y-1/2"
			>
				<span
					className={clsx(
						'transition-all -translate-x-[calc(50%-4px)] ',
						isOpen
							? '!-translate-x-1/2 !h-8 !rotate-45 group-hover:scale-y-90'
							: 'group-hover:scale-y-125'
					)}
				/>
				<span
					className={clsx(
						'transition-all -translate-x-[calc(50%+4px)]',
						isOpen &&
							'!-translate-x-1/2 !h-8 !-rotate-45 group-hover:scale-y-90'
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
		</div>
	);
});

const HomeLink: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	return (
		<Link
			hrefLang="en"
			href="/"
			className={clsx(
				'transition-transform w-full aspect-square p-4 hover:scale-95',
				pathname == '/' && '!scale-0'
			)}
			aria-label="Link to homepage"
		>
			{children}
		</Link>
	);
};

const DesktopThemeSwitch = React.memo(() => (
	<ThemeSwitch
		id="theme-switch-desktop"
		className="w-full p-4 transition-transform duration-300 translate-y-4"
	/>
));
