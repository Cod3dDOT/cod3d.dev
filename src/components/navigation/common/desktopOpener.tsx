/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { memo, useEffect, useRef } from "react";

import HomeIcon from "@/components/icons/home";
import { ThemeSwitch } from "@/components/themeSwitch";
import { useNavigation } from "@/lib/context/navigation";
import { cn } from "@/lib/utils/cn";

export const DesktopOpener: React.FC = memo(() => {
	const ref = useRef<HTMLButtonElement>(null);
	const { isOpen, toggleNav } = useNavigation();
	const pathname = usePathname();
	const isHome = pathname === "/";

	useEffect(() => {
		const current = ref.current;
		if (!current) return;
		current.addEventListener("click", toggleNav);
		return () => current.removeEventListener("click", toggleNav);
	}, [toggleNav]);

	return (
		<div className="hidden h-full w-16 flex-col items-center shadow-lg sm:flex">
			<ThemeSwitch
				id="theme-switch-desktop"
				className="my-4 w-full translate-y-4"
			/>
			<Link
				aria-disabled={isHome}
				inert={isHome}
				hrefLang="en"
				href="/"
				className={cn(
					"aspect-square w-full p-4 transition-transform hover:scale-95",
					isHome && "!scale-0"
				)}
				aria-label="Link to homepage"
			>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="h-full w-full fill-foreground"
				/>
				<span className="sr-only">Home</span>
			</Link>
			<button
				ref={ref}
				type="button"
				aria-expanded={isOpen}
				aria-controls="sidebar"
				className="group *:-translate-y-1/2 relative h-full w-16 cursor-pointer *:absolute *:top-1/2 *:left-1/2 *:h-16 *:w-1 *:bg-foreground"
			>
				<span
					className={cn(
						"-translate-x-[calc(50%-4px)] transition-all",
						isOpen
							? "!h-8 !-translate-x-1/2 !rotate-45 group-hover:scale-y-90"
							: "group-hover:scale-y-125 group-focus:scale-y-125"
					)}
				/>
				<span
					className={cn(
						"-translate-x-[calc(50%+4px)] transition-all",
						isOpen &&
							"!h-8 !-translate-x-1/2 !-rotate-45 group-hover:scale-y-90"
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
		</div>
	);
});

DesktopOpener.displayName = "DesktopOpener";
