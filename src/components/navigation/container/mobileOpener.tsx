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
				"absolute z-20 flex space-x-2 rounded-bl-xl border-b-2 border-l-2 border-transparent p-4 sm:hidden",
				"transition-all duration-300 will-change-transform",
				!isOpen
					? "-translate-x-full"
					: "translate-x-[calc(100vw-100%)]",
				!isOpen && pathname.includes("thoughts/") && "border-foreground"
			)}
		>
			<Link
				hrefLang="en"
				href="/"
				className={cn(
					"ml-auto transition-all hover:scale-95 focus:scale-95",
					pathname == "/" && "scale-0"
				)}
				aria-disabled={pathname == "/"}
				inert={pathname == "/"}
			>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="fill-foreground h-12 w-12 p-2"
				/>
				<span className="sr-only">Home</span>
			</Link>

			<ThemeSwitch id="theme-switch-mobile" className="h-12 w-12 p-3" />

			<button
				ref={ref}
				type="button"
				aria-expanded={isOpen}
				aria-controls="sidebar"
			>
				<ChevronIcon
					focusable={false}
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
