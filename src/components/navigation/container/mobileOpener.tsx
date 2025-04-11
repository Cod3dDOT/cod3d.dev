"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ChevronIcon from "@/components/icons/chevron";
import HomeIcon from "@/components/icons/home";
import { ThemeSwitch } from "@/components/themeSwitch";
import { useNavigation } from "@/lib/context/navigationContext";
import { cn } from "@/lib/utils/cn";

export const MobileOpener: React.FC = React.memo(() => {
	const ref = useRef<HTMLButtonElement>(null);
	const { isOpen, toggleNav } = useNavigation();
	const pathname = usePathname();

	useEffect(() => {
		const current = ref.current;
		if (!current) return;
		current.addEventListener("click", toggleNav);
		return () => current.removeEventListener("click", toggleNav);
	}, [toggleNav]);

	return (
		<div
			className={cn(
				"absolute z-20 flex space-x-2 p-4 sm:hidden",
				"transition-transform duration-300 will-change-transform",
				!isOpen ? "-translate-x-full" : "translate-x-[calc(100vw-100%)]"
			)}
		>
			<Link
				hrefLang="en"
				href="/"
				className={cn(
					"ml-auto transition-transform hover:scale-95",
					pathname == "/" && "!scale-0"
				)}
			>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="fill-foreground h-12 w-12 p-2"
				/>
				<span className="sr-only">Home</span>
			</Link>

			<ThemeSwitch id="theme-switch-mobile" className="h-12 w-12 p-3" />

			<button ref={ref} type="button">
				<ChevronIcon
					className={cn(
						"fill-foreground h-12 w-12 p-4 transition-transform duration-300",
						isOpen && "rotate-180"
					)}
				/>
				<span className="sr-only">Toggle the navigation drawer</span>
			</button>
		</div>
	);
});

MobileOpener.displayName = "MobileOpener";
