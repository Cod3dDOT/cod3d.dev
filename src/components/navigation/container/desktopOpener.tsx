"use client";

import React, { memo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "@/components/icons/home";
import { ThemeSwitch } from "@/components/themeSwitch";
import { useNavigation } from "@/lib/context/navigationContext";
import { cn } from "@/lib/utils/cn";

const HomeLink: React.FC<{ children: React.ReactNode }> = memo(
	({ children }) => {
		const pathname = usePathname();
		return (
			<Link
				hrefLang="en"
				href="/"
				className={cn(
					"aspect-square w-full p-4 transition-transform hover:scale-95",
					pathname == "/" && "!scale-0"
				)}
				aria-label="Link to homepage"
			>
				{children}
			</Link>
		);
	}
);

HomeLink.displayName = "HomeLink";

export const DesktopOpener: React.FC = memo(() => {
	const ref = useRef<HTMLButtonElement>(null);
	const { isOpen, toggleNav } = useNavigation();

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
				className="w-full translate-y-4 p-4 transition-transform duration-300"
			/>
			<HomeLink>
				<HomeIcon
					aria-hidden="true"
					focusable="false"
					className="fill-foreground h-full w-full"
				/>
				<span className="sr-only">Home</span>
			</HomeLink>
			<button
				ref={ref}
				type="button"
				className="group *:bg-foreground relative h-full w-16 cursor-pointer *:absolute *:top-1/2 *:left-1/2 *:h-16 *:w-1 *:-translate-y-1/2"
			>
				<span
					className={cn(
						"-translate-x-[calc(50%-4px)] transition-all",
						isOpen
							? "!h-8 !-translate-x-1/2 !rotate-45 group-hover:scale-y-90"
							: "group-hover:scale-y-125"
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
