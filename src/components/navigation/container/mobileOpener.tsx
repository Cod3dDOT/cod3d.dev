'use client';

import ChevronIcon from '@/components/icons/chevron';
import HomeIcon from '@/components/icons/home';
import { ThemeSwitch } from '@/components/themeSwitch';
import { clsx } from 'clsx';
import Link from 'next/link';

export const MobileOpener: React.FC<{
	setOpened?: (open: boolean) => void;
	opened: boolean;
	pathname: string;
}> = ({ setOpened, opened, pathname }) => {
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
			<button onClick={() => setOpened && setOpened(!opened)} type="button">
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
