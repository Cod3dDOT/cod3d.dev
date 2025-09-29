/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import clsx from "clsx";
import type React from "react";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useMouse } from "react-use";
import { useDeviceDetection } from "@/lib/hooks/useDeviceDetection";
import { useIsVisible } from "@/lib/hooks/useIsVisible";

type Color =
	| `rgba(${number}, ${number}, ${number}, ${number})`
	| `var(--${string})`
	| "transparent";

interface SpotlightCardProps {
	id: string;
	from: Color;
	via?: Color;
	to?: Color;
	size?: number;
	children: React.ReactNode;
	className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
	id,
	from = "var(--accent-yellow)",
	via,
	to = "transparent",
	size = 350,
	children,
	className,
	...props
}: SpotlightCardProps) => {
	const container = useRef<HTMLDivElement>(null);
	const { elX, elY, elW, elH } = useMouse(container as RefObject<HTMLElement>);
	const isVisible = useIsVisible(container as RefObject<HTMLElement>);
	const { isReducedMotion, isMobile } = useDeviceDetection();

	// State for CSS variables
	const [cssVars, setCssVars] = useState<Record<string, string>>({
		"--spotlight-size": `${size}px`,
		"--spotlight-x": "0px",
		"--spotlight-y": "0px",
		"--spotlight-color-stops": `${from},${via ? `${via},` : ""}${to}`
	});

	const centerX = elW / 2 || 0;
	const centerY = elH / 2 || 0;
	const thresholdDistance = size * 2;

	// Calculate spotlight color stops
	const spotlightColorStops = useMemo(() => {
		return [from, via, to].filter(Boolean).join(",");
	}, [from, via, to]);

	// Update CSS variables using useEffect instead of inline styles
	useEffect(() => {
		if (
			!isVisible ||
			Math.hypot(elX - centerX, elY - centerY) > thresholdDistance ||
			isReducedMotion ||
			isMobile
		)
			return;

		setCssVars((prev) => ({
			...prev,
			"--spotlight-x": `${elX}px`,
			"--spotlight-y": `${elY}px`,
			"--spotlight-color-stops": spotlightColorStops
		}));
	}, [
		isVisible,
		elX,
		elY,
		centerX,
		centerY,
		thresholdDistance,
		spotlightColorStops,
		isMobile,
		isReducedMotion
	]);

	return (
		<>
			<style>
				{`
                #${id} {
                    ${Object.entries(cssVars)
											.map(([key, value]) => `${key}: ${value};`)
											.join("\n")}
                }
            `}
			</style>
			<div
				id={id}
				ref={container}
				className={clsx(
					"relative transform-gpu",
					"before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color-stops))]",
					className
				)}
				{...props}
			>
				{children}
			</div>
		</>
	);
};
