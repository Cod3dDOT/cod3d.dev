'use client';

import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useMouse } from 'react-use';

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

	const centerX = elW ? elW / 2 : 0;
	const centerY = elH ? elH / 2 : 0;
	const thresholdDistance = size * 2;

	const spotlightColorStops = useMemo(() => {
		if (hsl) {
			const margin = hslMax - hslMin;
			const rate = (elY! + elX!) / (elH! + elW!);
			const hue = Math.round(margin * rate + hslMin);

			return `hsl(${hue} 80% 70%),transparent`;
		}

		return [from, via, to].filter((value) => !!value).join(',');
	}, [hsl, hslMax, hslMin, from, via, to, elY, elX, elH, elW]);

	const { x, y } = useMemo(() => {
		const distance = Math.sqrt(
			Math.pow(elX - centerX, 2) + Math.pow(elY - centerY, 2)
		);
		if (distance > thresholdDistance) return { x: -size * 2, y: -size * 2 };

		return {
			x: elX,
			y: elY
		};
	}, [size, elY, elX, elH, elW]);

	const classes =
		mode === 'before'
			? `before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color-stops))]`
			: `after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color-stops))]`;

	if (mobile) {
		return (
			<Component
				nonce={nonce}
				className={clsx(
					`bg-background spotlight-card-${id}`,
					classes,
					className
				)}
				style={{
					'--spotlight-color-stops': spotlightColorStops,
					'--spotlight-size': `${size}px`,
					'--spotlight-x': `0px`,
					'--spotlight-y': `0px`
				}}
				{...props}
			>
				{children}
			</Component>
		);
	}

	return (
		<Component
			nonce={nonce}
			ref={container}
			className={clsx(
				`relative transform-gpu h-full spotlight-card-${id}`,
				classes,
				className
			)}
			style={{
				'--spotlight-color-stops': spotlightColorStops,
				'--spotlight-size': `${size}px`,
				'--spotlight-x': `${x}px`,
				'--spotlight-y': `${y}px`
			}}
			{...props}
		>
			{children}
		</Component>
	);
}
