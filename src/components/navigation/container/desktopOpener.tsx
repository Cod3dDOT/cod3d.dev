'use client';

import { clsx } from 'clsx';
import { Link } from 'next-view-transitions';

import HomeIcon from '@/components/icons/home';
import { ThemeSwitch } from '@/components/themeSwitch';

export const DesktopOpener: React.FC<{
	setOpened?: (open: boolean) => void;
	opened: boolean;
	pathname: string;
}> = ({ setOpened, opened, pathname }) => {
	return (
		<div className="hidden sm:flex flex-col items-center h-full sm:w-16 w-12 shadow-lg">
			<ThemeSwitch
				id="theme-switch-desktop"
				className={clsx(
					'w-full p-4 transition-transform duration-300 translate-y-4',
					opened &&
						pathname == '/' &&
						'translate-y-[1.5rem] lg:translate-y-[2.5rem]'
				)}
			/>
			<Link
				hrefLang="en"
				href="/"
				className={clsx(
					'transition-transform w-full aspect-square p-4 hover:scale-95',
					pathname == '/' && '!scale-0'
				)}
				aria-label="Link to homepage"
			>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="w-full h-full fill-foreground"
				/>
				<span className="sr-only">Home</span>
			</Link>
			<button
				type="button"
				onClick={() => setOpened && setOpened(!opened)}
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
