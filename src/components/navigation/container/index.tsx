'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import React, {
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef
} from 'react';

import { useNavigation } from '@/lib/context/navigationContext';
import { ReactLenis } from '@/lib/lenis';

import { DesktopOpener } from './desktopOpener';
import { MobileOpener } from './mobileOpener';
import { ProgressBar } from './progressBar';

type NavigationProps = {
	children?: React.ReactNode;
};

const useAutoClose = ({
	closeNav,
	menu
}: {
	closeNav: () => void;
	menu: RefObject<Element | null>;
}) => {
	const handleClosure = useCallback(
		(event: MouseEvent | FocusEvent) => {
			const contains = menu.current?.contains(event.target as Node);
			const link = (event.target as HTMLElement).tagName == 'a';

			if (!contains || link) closeNav();
		},
		[closeNav, menu]
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

export const NavigationContainer: React.FC<NavigationProps> = ({
	children
}) => {
	const pathname = usePathname();
	const menu = useRef<HTMLDivElement>(null);

	const { isOpen, closeNav } = useNavigation();

	useEffect(() => {
		closeNav();
	}, [pathname]);

	useAutoClose({ closeNav, menu });

	return (
		<nav className="relative print:hidden" role="navigation">
			<div
				className={clsx(
					'fixed inset-0 hidden lg:block -z-10 opacity-0 duration-300 bg-black transition-all ease-in-out',
					isOpen && 'opacity-10 z-50 right-1/2'
				)}
			/>

			<div
				ref={menu}
				className={clsx(
					'z-50 fixed flex inset-0 xl:left-1/2',
					'transition-transform duration-300 will-change-transform ease-in-out',
					'bg-background bg-grainy md:bg-not-grainy md:bg-background/50 md:backdrop-blur-xl',
					isOpen
						? 'translate-x-0'
						: 'sm:translate-x-[calc(100%-4rem)] translate-x-full'
				)}
			>
				<DesktopOpener />

				<MobileOpener />

				<MemoizedLenis>{children}</MemoizedLenis>
			</div>
		</nav>
	);
};

const MemoizedLenis: React.FC<{ children: React.ReactNode }> = React.memo(
	({ children }) => {
		const options = useMemo(() => ({ duration: 1.5 }), []);

		return (
			<ReactLenis
				className="overflow-y-auto w-full p-8 sm:pt-6 [&>div]:space-y-16 2xl:scrollbar-none"
				options={options}
			>
				<ProgressBar />
				{children}
			</ReactLenis>
		);
	}
);
