'use client';

import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useMouse } from 'react-use';
import Tilt from 'react-parallax-tilt';
import useIsTouchdevice from '@/lib/hooks/useIsTouchDevice';

interface SpotlightCardProps {
	id?: string;
	nonce?: string;
	as?: React.ElementType;
	from?: string;
	via?: string | null;
	to?: string;
	size?: number;
	mode?: 'before' | 'after';
	hsl?: boolean;
	hslMin?: number;
	hslMax?: number;
	children?: React.ReactNode;
	className?: string;
}

export function SpotlightCard({
	id = '',
	nonce = '',
	as: Component = 'div',
	from = 'rgba(255,255,255,0.8)',
	via = null,
	to = 'transparent',
	size = 350,
	mode = 'before',
	hsl = false,
	hslMin = 0,
	hslMax = 360,
	children,
	className,
	...props
}: SpotlightCardProps): JSX.Element {
	const mobile = useIsTouchdevice();

	const container = useRef<HTMLDivElement>(null);
	const { elX, elY, elW, elH } = useMouse(container);

	const spotlightColorStops = useMemo(() => {
		if (hsl) {
			const margin = hslMax - hslMin;
			const rate = (elY! + elX!) / (elH! + elW!);
			const hue = Math.round(margin * rate + hslMin);

			return `hsl(${hue} 80% 70%),transparent`;
		}

		return [from, via, to].filter((value) => !!value).join(',');
	}, [hsl, hslMax, hslMin, from, via, to, elY, elX, elH, elW]);

	const classes =
		mode === 'before'
			? `before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color-stops))]`
			: `after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color-stops))]`;

	if (mobile) {
		return (
			<Component
				className={clsx(
					`bg-background spotlight-card-${id}`,
					classes,
					className
				)}
			>
				<style
					nonce={nonce}
				>{`.spotlight-card-${id} { --spotlight-x: 0px; --spotlight-y: 0px; --spotlight-size: ${size}px; --spotlight-color-stops: ${spotlightColorStops}; }`}</style>
				{children}
			</Component>
		);
	}

	return (
		<Tilt
			glareEnable={true}
			glareBorderRadius="0.75rem"
			tiltMaxAngleX={3}
			tiltMaxAngleY={3}
			className={className}
		>
			<Component
				nonce={nonce}
				ref={container}
				className={clsx(
					`relative transform-gpu h-full spotlight-card-${id}`,
					classes
				)}
				{...props}
			>
				<style
					nonce={nonce}
				>{`.spotlight-card-${id} { --spotlight-x: ${elX}px; --spotlight-y: ${elY}px; --spotlight-size: ${size}px; --spotlight-color-stops: ${spotlightColorStops}; }`}</style>
				{children}
			</Component>
		</Tilt>
	);
}
