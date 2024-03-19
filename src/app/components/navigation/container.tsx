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
					'absolute inset-0 hidden lg:block -z-10 opacity-0 duration-300 bg-black transition-all',
					opened && 'opacity-10 z-10 right-1/2'
				)}
			/>
			<nav
				role="navigation"
				ref={menu}
				className={clsx(
					'z-10 fixed flex backdrop-blur-lg shadow-lg transition-transform duration-300',
					'inset-0 lg:left-1/2',
					opened ? 'translate-x-0' : 'translate-x-[calc(100%-4rem)]'
				)}
			>
				<div className="relative flex flex-col items-center h-full py-8 flex-[0_0_4rem] w-16 shadow-inner gap-8">
					<ThemeSwitch className="w-8 h-8" />
					<Link
						href="/"
						className={clsx(
							'cursor transition-transform',
							pathname == '/' && 'scale-0'
						)}
					>
						<HomeIcon className="w-8 h-8 fill-foreground" />
					</Link>
					<button
						className="fixed top-1/2 cursor w-16 cursor-none flex items-center justify-center gap-2"
						onClick={() => setOpened(!opened)}
					>
						<span className="w-1 h-16 bg-foreground" />
						<span className="w-1 h-16 bg-foreground" />
					</button>
				</div>
				<div className="flex flex-col w-full p-8 space-y-8">{children}</div>
			</nav>
		</>
	);
};

export default NavigationContainer;
