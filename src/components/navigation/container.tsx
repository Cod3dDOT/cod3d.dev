'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import HomeIcon from '../icons/home';
import { ThemeSwitch } from '../themeSwitch';

const useAutoClose = ({
	setOpened,
	menu
}: {
	setOpened: (open: boolean) => void;
	menu: RefObject<HTMLElement>;
}) => {
	const handleClosure = useCallback(
		(event: MouseEvent | FocusEvent) =>
			!menu?.current?.contains(event.target as Node) && setOpened(false),
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
	const menu = useRef<HTMLElement>(null);
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		setOpened(false);
	}, [pathname]);

	useAutoClose({ setOpened, menu });

	return (
		<>
			<div
				className={clsx(
					'fixed inset-0 hidden lg:block -z-10 opacity-0 duration-300 bg-black transition-all',
					opened && 'opacity-10 z-10 right-1/2'
				)}
			/>
			<nav
				role="navigation"
				ref={menu}
				className={clsx(
					'z-10 fixed flex backdrop-blur-lg transition-transform duration-300 will-change-transform',
					'inset-0 xl:left-1/2',
					opened
						? 'translate-x-0'
						: 'sm:translate-x-[calc(100%-4rem)] translate-x-[calc(100%-3rem)]'
				)}
			>
				<div className="flex flex-col items-center h-full py-6 sm:w-16 w-12 shadow-lg">
					<ThemeSwitch className="w-full sm:p-4 p-2" />
					<Link
						href="/"
						className={clsx(
							'transition-transform w-full aspect-square sm:p-4 p-2 hover:scale-95',
							pathname == '/' && 'scale-0'
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
				<div className="flex flex-col w-full justify-between p-8 space-y-8">
					{children}
				</div>
			</nav>
		</>
	);
};

export default NavigationContainer;
