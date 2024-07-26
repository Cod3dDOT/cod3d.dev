'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { ReactLenis, useLenis } from '@/lib/lenis';
import { eventBus } from '@/lib/eventbus';
import { DesktopOpener } from './desktopOpener';
import { MobileOpener } from './mobileOpener';
import { ProgressBar } from './progressBar';

type NavigationProps = {
	children?: React.ReactNode;
};

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

export const NavigationContainer: React.FC<NavigationProps> = ({
	children
}) => {
	const pathname = usePathname();
	const menu = useRef<HTMLDivElement>(null);
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		eventBus.dispatch('nav:toggle', { on: opened });
	}, [opened]);

	useEffect(() => {
		setOpened(false);
	}, [pathname]);

	useAutoClose({ setOpened, menu });

	return (
		<nav className="relative" role="navigation">
			<div
				className={clsx(
					'fixed inset-0 hidden lg:block -z-10 opacity-0 duration-300 bg-black transition-all ease-in-out',
					opened && 'opacity-10 z-50 right-1/2'
				)}
			/>

			<div
				ref={menu}
				className={clsx(
					'z-50 fixed flex inset-0 xl:left-1/2',
					'transition-transform duration-300 will-change-transform ease-in-out',
					'bg-background bg-grainy md:bg-not-grainy md:bg-background/50 md:backdrop-blur-xl',
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

				<ReactLenis className="overflow-y-auto w-full p-8 sm:pt-6 [&>div]:space-y-16 2xl:scrollbar-none">
					<ProgressBar />
					{children}
				</ReactLenis>
			</div>
		</nav>
	);
};
