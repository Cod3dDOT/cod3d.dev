/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

import ChevronIcon from "@/components/icons/chevron";
import HomeIcon from "@/components/icons/home";
import { ThemeSwitch } from "@/components/themeSwitch";
import { useNavigation } from "@/lib/context/navigation";
import { cn } from "@/lib/utils/cn";

export const MobileOpener: React.FC = React.memo(() => {
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
		<div
			className={cn(
				"absolute z-20 flex items-center gap-2 rounded-bl-xl border-transparent border-b-2 border-l-2 p-4 sm:hidden",
				"transition-all duration-300 will-change-transform",
				!isOpen ? "-translate-x-full" : "translate-x-[calc(100vw-100%)]",
				!isOpen && pathname.includes("thoughts/") && "border-foreground"
			)}
		>
			<Link
				hrefLang="en"
				href="/"
				className={cn(
					"ml-auto transition-all hover:scale-95 focus:scale-95",
					isHome && "scale-0"
				)}
				aria-disabled={isHome}
				inert={isHome}
			>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="h-12 w-12 fill-foreground p-2"
				/>
				<span className="sr-only">Home</span>
			</Link>

			<ThemeSwitch
				id="theme-switch-mobile"
				className="![block-size:3rem] ![inline-size:3rem] p-3"
			/>

			<button
				ref={ref}
				type="button"
				aria-expanded={isOpen}
				aria-controls="sidebar"
			>
				<ChevronIcon
					focusable={false}
					className={cn(
						"h-12 w-12 fill-foreground p-4 transition-transform duration-300",
						isOpen && "rotate-180"
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
		</div>
	);
});

MobileOpener.displayName = "MobileOpener";
