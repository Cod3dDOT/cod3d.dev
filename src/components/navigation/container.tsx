'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import HomeIcon from '../icons/home';
import { ThemeSwitch } from '../themeSwitch';
import ChevronIcon from '../icons/chevron';
import { ReactLenis } from '@/lib/lenis';

const useAutoClose = ({
	setOpened,
	menu
}: {
	setOpened: (open: boolean) => void;
	menu: RefObject<HTMLElement>;
}) => {
	const handleClosure = useCallback(
		(event: MouseEvent | FocusEvent) => {
			const contains = menu?.current?.contains(event.target as Node);
			const link = (event.target as HTMLElement).tagName == 'a';

			if (!contains || link) setOpened(false);
		},
		[setOpened, menu]
	);

	useEffect(() => {
		window.addEventListener('click', handleClosure);
		window.addEventListener('focusin', handleClosure);

		return () => {
			window.removeEventListener('click', handleClosure);
			window.removeEventListener('focusin', handleClosure);
		};
	}, [handleClosure, menu]);
};

type NavigationProps = {
	children?: React.ReactNode;
};

export const NavigationContainer: React.FC<NavigationProps> = ({
	children
}) => {
	const pathname = usePathname();
	const menu = useRef<HTMLDivElement>(null);
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		setOpened(false);
	}, [pathname]);

	useAutoClose({ setOpened, menu });

	return (
		<nav className="relative" role="navigation">
			<div
				className={clsx(
					'fixed inset-0 hidden lg:block -z-10 opacity-0 duration-300 bg-black transition-all',
					opened && 'opacity-10 z-10 right-1/2'
				)}
			/>

			<div
				ref={menu}
				className={clsx(
					'z-10 fixed flex transition-transform duration-300 will-change-transform inset-0 xl:left-1/2',
					'bg-background bg-grainy md:bg-not-grainy md:bg-transparent md:backdrop-blur-xl',
					opened
						? 'translate-x-0'
						: 'sm:translate-x-[calc(100%-4rem)] translate-x-full'
				)}
			>
				<DesktopOpener
					setOpened={setOpened}
					opened={opened}
					pathname={pathname}
				/>

				<MobileOpener
					setOpened={setOpened}
					opened={opened}
					pathname={pathname}
				/>

				<ReactLenis className="overflow-y-auto w-full p-8 sm:pt-8 pt-24 *:space-y-16">
					{children}
				</ReactLenis>
			</div>
		</nav>
	);
};

const DesktopOpener: React.FC<{
	setOpened: (open: boolean) => void;
	opened: boolean;
	pathname: string;
}> = ({ setOpened, opened, pathname }) => {
	return (
		<div className="hidden sm:flex flex-col items-center h-full sm:w-16 w-12 shadow-lg">
			<ThemeSwitch
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
				className="relative group h-1/2 my-auto w-16 *:absolute *:w-1 *:h-16 *:bg-foreground *:top-1/2 *:left-1/2 *:-translate-y-1/2"
				onClick={() => setOpened(!opened)}
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

const MobileOpener: React.FC<{
	setOpened: (open: boolean) => void;
	opened: boolean;
	pathname: string;
}> = ({ setOpened, opened, pathname }) => {
	return (
		<div
			className={clsx(
				'flex sm:hidden absolute w-screen p-4 space-x-2 z-20',
				'transition-transform duration-300 will-change-transform',
				!opened && '-translate-x-full'
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
			<ThemeSwitch className="h-12 w-12 p-3" />
			<button type="button" onClick={() => setOpened(!opened)}>
				<ChevronIcon
					className={clsx(
						'h-12 w-12 p-4 fill-foreground transition-transform duration-300',
						opened && 'rotate-180'
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
			<span
				className={clsx(
					'absolute bottom-0 left-0 h-full bg-background bg-grainy w-full !m-0 border-b-2 border-foreground -z-10 duration-300 transition-transform',
					!opened ? 'translate-x-full' : 'translate-x-0'
				)}
			/>
		</div>
	);
};

export default NavigationContainer;
