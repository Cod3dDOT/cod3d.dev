/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
					"theme-switch transition-transform hover:scale-95",
					className
				)}
				aria-label="Theme switch"
				aria-live="polite"
			>
				<svg
					className="sun-and-moon"
					aria-hidden="true"
					viewBox="0 0 24 24"
					focusable={false}
				>
					<mask className="moon" id={`moon-mask-${id}`}>
						<rect x="0" y="0" width="100%" height="100%" fill="white" />
						<circle cx="24" cy="10" r="6" fill="black" />
					</mask>
					<circle
						className="sun"
						cx="12"
						cy="12"
						r="6"
						mask={`url(#moon-mask-${id})`}
						fill="currentColor"
					/>
					<g className="sun-beams" stroke="currentColor">
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
