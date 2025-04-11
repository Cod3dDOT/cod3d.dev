"use client";

import React, { RefObject, useMemo, useRef } from "react";
import { useMouse } from "react-use";

import useIsTouchDevice from "@/lib/hooks/useIsTouchDevice";
import useIsVisible from "@/lib/hooks/useIsVisible";
import { cn } from "@/lib/utils/cn";

interface SpotlightCardProps {
	id?: string;
	nonce?: string;
	as?: React.ElementType;
	from?: string;
	via?: string | null;
	to?: string;
	size?: number;
	mode?: "before" | "after";
	hsl?: boolean;
	hslMin?: number;
	hslMax?: number;
	children?: React.ReactNode;
	className?: string;
}

export function SpotlightCard({
	id = "",
	nonce = "",
	from = "rgba(255,255,255,0.8)",
	via = null,
	to = "transparent",
	size = 350,
	mode = "before",
	hsl = false,
	hslMin = 0,
	hslMax = 360,
	children,
	className,
	...props
}: SpotlightCardProps): React.JSX.Element {
	const mobile = useIsTouchDevice();
	const container = useRef<HTMLDivElement>(null);
	const { elX, elY, elW, elH } = useMouse(
		container as RefObject<HTMLElement>
	);
	const isVisible = useIsVisible(container as RefObject<HTMLElement>);

	const centerX = elW / 2 || 0;
	const centerY = elH / 2 || 0;
	const thresholdDistance = size * 2;

	// Memoize spotlight color stops only when necessary
	const spotlightColorStops = useMemo(() => {
		if (!hsl) {
			return [from, via, to].filter(Boolean).join(",");
		}
		const margin = hslMax - hslMin;
		const rate = (elY + elX) / (elH + elW);
		const hue = Math.round(margin * rate + hslMin);
		return `hsl(${hue.toString()} 80% 70%), transparent`;
	}, [hsl, hslMin, hslMax, from, via, to, elX, elY, elW, elH]);

	// Calculate spotlight position and only update if visible
	const { x, y } = useMemo(() => {
		if (
			!isVisible ||
			Math.hypot(elX - centerX, elY - centerY) > thresholdDistance
		) {
			return { x: -size * 2, y: -size * 2 };
		}
		return { x: elX, y: elY };
	}, [isVisible, elX, centerX, elY, centerY, thresholdDistance, size]);

	const modeClass =
		mode === "before"
			? "before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color-stops))]"
			: "after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color-stops))]";

	// Simplify the mobile check return path
	if (mobile) {
		return (
			<div
				nonce={nonce}
				className={cn(
					`bg-background spotlight-card-${id}`,
					modeClass,
					className
				)}
				style={{
					// @ts-expect-error --spotlight-color-stops
					"--spotlight-color-stops": spotlightColorStops,
					"--spotlight-size": `${size.toString()}px`,
					"--spotlight-x": "0px",
					"--spotlight-y": "0px",
				}}
				{...props}
			>
				{children}
			</div>
		);
	}

	return (
		<div
			nonce={nonce}
			ref={container}
			className={cn(
				`relative transform-gpu spotlight-card-${id}`,
				modeClass,
				className
			)}
			style={{
				// @ts-expect-error --spotlight-color-stops
				"--spotlight-color-stops": spotlightColorStops,
				"--spotlight-size": `${size.toString()}px`,
				"--spotlight-x": `${x.toString()}px`,
				"--spotlight-y": `${y.toString()}px`,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
