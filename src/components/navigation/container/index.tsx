"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type React from "react";
import {
	type RefObject,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef
} from "react";

import { useNavigation } from "@/lib/context/navigationContext";
import { cn } from "@/lib/utils/cn";
import { DesktopOpener } from "./desktopOpener";
import { MobileOpener } from "./mobileOpener";

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
			const link = (event.target as HTMLElement).tagName === "a";

			if (!contains || link) closeNav();
		},
		[closeNav, menu]
	);

	useEffect(() => {
		window.addEventListener("click", handleClosure);
		window.addEventListener("focusin", handleClosure);

		return () => {
			window.removeEventListener("click", handleClosure);
			window.removeEventListener("focusin", handleClosure);
		};
	}, [handleClosure]);
};

const TRANSITION = "duration-300 ease-in-out";

const MemoizedLenis: React.FC<{ children: React.ReactNode }> = memo(
	({ children }) => {
		const options = useMemo(() => ({ duration: 1.5 }), []);

		return (
			<ReactLenis
				options={options}
				className="h-full w-full overflow-y-auto p-8 pt-20 sm:pt-8 [&>div]:space-y-16"
			>
				{children}
			</ReactLenis>
		);
	}
);

MemoizedLenis.displayName = "Lenis";

export const NavigationContainer: React.FC<NavigationProps> = ({
	children
}) => {
	const pathname = usePathname();
	const menu = useRef<HTMLDivElement>(null);

	const { isOpen, closeNav } = useNavigation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: closes nav on route change
	useEffect(() => {
		closeNav();
	}, [closeNav, pathname]);

	useAutoClose({ closeNav, menu });

	return (
		<nav className="relative print:hidden" id="sidebar">
			<div
				className={cn(
					TRANSITION,
					"-z-10 fixed inset-0 hidden bg-black opacity-0 transition-[opacity,right] lg:block",
					isOpen && "right-1/2 z-50 opacity-20"
				)}
			/>

			<div
				ref={menu}
				className={cn(
					"fixed inset-0 z-50 flex xl:left-1/2",
					TRANSITION,
					"transition-transform will-change-transform",
					"bg-background md:bg-background/50 md:backdrop-blur-xl",
					isOpen
						? "translate-x-0"
						: "translate-x-full sm:translate-x-[calc(100%-4rem)]"
				)}
			>
				<DesktopOpener />

				<MobileOpener />
				<div inert={!isOpen} className="w-full">
					<MemoizedLenis>{children}</MemoizedLenis>
				</div>
			</div>
		</nav>
	);
};
