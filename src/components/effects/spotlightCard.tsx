'use client';

import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useMouse } from 'react-use';
import Tilt from 'react-parallax-tilt';
import useIsTouchdevice from '@/lib/hooks/useIsTouchDevice';

interface SpotlightCardProps {
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
			? `before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]`
			: `after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]`;

	if (mobile) {
		return (
			<Component
				className={clsx('bg-background', classes, className)}
				style={{
					'--x': `0px`,
					'--y': `0px`,
					'--spotlight-color-stops': spotlightColorStops,
					'--spotlight-size': `${size}px`
				}}
			>
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
				ref={container}
				className={clsx(
					'relative transform-gpu overflow-hidden h-full',
					classes
				)}
				{...props}
				style={{
					'--x': `${elX}px`,
					'--y': `${elY}px`,
					'--spotlight-color-stops': spotlightColorStops,
					'--spotlight-size': `${size}px`
				}}
			>
				{children}
			</Component>
		</Tilt>
	);
}
