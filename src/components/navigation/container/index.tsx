"use client";

import React, {
	memo,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";

import { useNavigation } from "@/lib/context/navigationContext";
import { cn } from "@/lib/utils/cn";
import { DesktopOpener } from "./desktopOpener";
import { MobileOpener } from "./mobileOpener";
import { ProgressBar } from "./progressBar";

type NavigationProps = {
	children?: React.ReactNode;
};

const useAutoClose = ({
	closeNav,
	menu,
}: {
	closeNav: () => void;
	menu: RefObject<Element | null>;
}) => {
	const handleClosure = useCallback(
		(event: MouseEvent | FocusEvent) => {
			const contains = menu.current?.contains(event.target as Node);
			const link = (event.target as HTMLElement).tagName == "a";

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
	}, [handleClosure, menu]);
};

const TRANSITION = "duration-300 ease-in-out";

const MemoizedLenis: React.FC<{ children: React.ReactNode }> = memo(
	({ children }) => {
		const options = useMemo(() => ({ duration: 1.5 }), []);

		return (
			<ReactLenis
				className="2xl:scrollbar-none w-full overflow-y-auto p-8 sm:pt-6 [&>div]:space-y-16"
				options={options}
			>
				<ProgressBar />
				{children}
			</ReactLenis>
		);
	}
);

MemoizedLenis.displayName = "Lenis";

export const NavigationContainer: React.FC<NavigationProps> = ({
	children,
}) => {
	const pathname = usePathname();
	const menu = useRef<HTMLDivElement>(null);

	const { isOpen, closeNav } = useNavigation();

	useEffect(() => {
		closeNav();
	}, [pathname, closeNav]);

	useAutoClose({ closeNav, menu });

	return (
		<nav className="relative print:hidden" role="navigation">
			<div
				className={cn(
					TRANSITION,
					"fixed inset-0 -z-10 hidden bg-black opacity-0 transition-[opacity,right] lg:block",
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

				<MemoizedLenis>{children}</MemoizedLenis>
			</div>
		</nav>
	);
};
