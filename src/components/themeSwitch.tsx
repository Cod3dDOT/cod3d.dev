"use client";

import { useTheme } from "next-themes";
import { memo, useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

interface ThemeSwitchProps {
	id?: string;
	className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = memo(
	({ id = "theme-switch", className }) => {
		const { resolvedTheme, setTheme } = useTheme();
		const ref = useRef<HTMLButtonElement>(null);

		const toggleTheme = useCallback(() => {
			setTheme(resolvedTheme === "dark" ? "light" : "dark");
		}, [resolvedTheme, setTheme]);

		useEffect(() => {
			const current = ref.current;
			if (!current) return;
			current.addEventListener("click", toggleTheme);
			return () => current.removeEventListener("click", toggleTheme);
		}, [toggleTheme]);

		return (
			<button
				id={id}
				ref={ref}
				type="button"
				className={cn(
					"group aspect-square cursor-pointer touch-manipulation hover:scale-95",
					className
				)}
				aria-label="Theme switch"
			>
				<svg aria-hidden="true" viewBox="0 0 24 24" focusable={false}>
					<mask className="origin-center" id={`moon-mask-${id}`}>
						<rect x="0" y="0" width="100%" height="100%" fill="white" />
						<circle
							cx="24"
							cy="10"
							r="6"
							className="origin-center transition-[cx] duration-300 dark:translate-x-0 dark:translate-y-0 dark:delay-300 dark:duration-600 dark:[cx:17]"
						/>
					</mask>
					<circle
						className="origin-center fill-foreground transition-all duration-600 group-hover:fill-foreground/80 dark:scale-[1.75] dark:duration-300"
						cx="12"
						cy="12"
						r="6"
						mask={`url(#moon-mask-${id})`}
					/>
					<g className="dark:-rotate-45 origin-center stroke-2 stroke-foreground transition-all delay-150 duration-600 [stroke-linecap:round] group-hover:stroke-foreground/60 dark:opacity-0 dark:delay-0 dark:duration-300">
						<line x1="12" y1="1" x2="12" y2="3" />
						<line x1="12" y1="21" x2="12" y2="23" />
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
						<line x1="1" y1="12" x2="3" y2="12" />
						<line x1="21" y1="12" x2="23" y2="12" />
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
					</g>
				</svg>
			</button>
		);
	}
);

ThemeSwitch.displayName = "ThemeSwitch";
