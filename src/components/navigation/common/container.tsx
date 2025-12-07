/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import clsx from "clsx";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type React from "react";
import {
	memo,
	type RefObject,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
} from "react";

import { useNavigation } from "@/lib/context/navigation";
import { useDeviceDetection } from "@/lib/hooks/useDeviceDetection";
import { DesktopOpener } from "./desktopOpener";
import { MobileOpener } from "./mobileOpener";

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
			const link = (event.target as HTMLElement).tagName === "a";

			if (!contains || link) closeNav();
		},
		[closeNav, menu],
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

const ScrollContainer: React.FC<{ children: React.ReactNode }> = memo(
	({ children }) => {
		const options = useMemo(
			() => ({ duration: 1.5, overscroll: false }),
			[],
		);

		return (
			<ReactLenis
				options={options}
				className="h-full w-full overflow-y-auto overflow-x-hidden p-8 pt-20 sm:pt-8 [&>div]:space-y-16"
			>
				{children}
			</ReactLenis>
		);
	},
);

ScrollContainer.displayName = "Lenis";

export const NavigationContainer: React.FC<NavigationProps> = ({
	children,
}) => {
	const pathname = usePathname();
	const menu = useRef<HTMLDivElement>(null);
	const { isMobile, isDesktop } = useDeviceDetection();

	const { isOpen, closeNav } = useNavigation();
	const id = useId();

	// biome-ignore lint/correctness/useExhaustiveDependencies: closes nav on route change
	useEffect(() => {
		closeNav();
	}, [pathname]);

	useAutoClose({ closeNav, menu });

	return (
		<nav className="relative print:hidden" id={id}>
			<div
				className={clsx(
					"-z-10 fixed inset-0 hidden bg-black opacity-0 transition-[opacity,right] duration-300 ease-in-out lg:block",
					isOpen && "right-1/2 z-50 opacity-30",
				)}
			/>

			<div
				ref={menu}
				className={clsx(
					"fixed inset-0 z-50 flex xl:left-1/2",
					"[transition:background-color_150ms_cubic-bezier(0.4,0,0.2,1),translate_300ms_cubic-bezier(0.4,0,0.2,1)]",
					"will-change-transform bg-background",
					isOpen
						? "translate-x-0"
						: "translate-x-full sm:translate-x-[calc(100%-4rem)]",
				)}
			>
				<DesktopOpener sidebarId={id} />
				<MobileOpener sidebarId={id} />
				<div inert={!isOpen} className="w-full">
					{isDesktop && <ScrollContainer>{children}</ScrollContainer>}
					{isMobile && (
						<div className="h-full w-full space-y-16 overflow-hidden overflow-y-auto overscroll-none p-8 pt-20 sm:pt-8">
							{children}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
