'use client';

import { useEffect, useRef, useState } from 'react';
import CursorEditIcon from '../icons/cursor/edit';
import { clsx } from 'clsx';
import { lerp } from '@/lib/utils/math';
import useIsTouchdevice from '@/lib/hooks/useIsTouchDevice';
import { usePathname } from 'next/navigation';

interface Target {
	classOrTag: string;
	icon?: JSX.Element;
	className?: string;
	lerp?: number;
}

const targets: Target[] = [
	{ classOrTag: 'a' },
	{ classOrTag: 'button' },
	{
		classOrTag: 'pre',
		className: 'border-transparent bg-transparent',
		icon: (
			<CursorEditIcon
				className="w-6 h-6 fill-current -translate-x-1/2 -translate-y-1/2
                animate-in fade-in slide-in-from-top-1/2 slide-in-from-left-1/2 duration-500"
			/>
		)
	}
];

const defaultTarget = {
	classOrTag: '',
	className: '!bg-transparent !w-16 !h-16',
	lerp: 0.9
};

const defaultClassname =
	'w-2 h-2 rounded-full bg-foreground border border-foreground';

export const Cursor: React.FC = () => {
	const isTouchdevice = useIsTouchdevice();
	if (typeof window !== 'undefined' && isTouchdevice) {
		return <></>;
	}

	const pathname = usePathname();

	const [hoveredTarget, setHoveredTarget] = useState<Target | undefined>();
	const [visible, setVisible] = useState(true);
	const [_lerp, _setLerp] = useState<number>(defaultTarget.lerp);

	const cursorRef = useRef<HTMLDivElement>(null);
	const targetPosition = useRef({ x: 0, y: 0 });
	const currentPosition = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			targetPosition.current = { x: event.clientX, y: event.clientY };
		};

		// Animation function to update cursor position
		const updatePosition = () => {
			// Smooth the cursor movement with linear interpolation
			currentPosition.current.x = lerp(
				currentPosition.current.x,
				targetPosition.current.x,
				_lerp
			);
			currentPosition.current.y = lerp(
				currentPosition.current.y,
				targetPosition.current.y,
				_lerp
			);

			if (cursorRef.current) {
				cursorRef.current.style.translate = `${currentPosition.current.x}px ${currentPosition.current.y}px`;
			}

			// Call update function on the next animation frame
			requestAnimationFrame(updatePosition);
		};

		// Event listener for mouse movements
		window.addEventListener('mousemove', handleMouseMove);
		// Start the animation loop
		requestAnimationFrame(updatePosition);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	useEffect(() => {
		const targetElements = document.querySelectorAll<HTMLElement>(
			targets.map((target) => target.classOrTag).join(',')
		);

		targetElements.forEach((element) => {
			const target = targets.find((target) =>
				element.matches(target.classOrTag)
			);

			if (target === undefined) return;

			const withDefaults = { ...defaultTarget, ...target };

			element.addEventListener('mouseover', () => {
				setHoveredTarget(withDefaults);
			});
			element.addEventListener('mouseout', () => {
				setHoveredTarget(undefined);
			});
		});

		return () => {
			targetElements.forEach((element) => {
				const target = targets.find((target) =>
					element.matches(target.classOrTag)
				);

				if (target === undefined) return;

				const withDefaults = { ...defaultTarget, ...target };

				element.removeEventListener('mouseover', () => {
					setHoveredTarget(withDefaults);
				});
				element.removeEventListener('mouseout', () => {
					setHoveredTarget(undefined);
				});
			});
		};
	}, [targets, pathname]);

	useEffect(() => {
		const onMouseEnterViewport = () => setVisible(true);
		const onMouseLeaveViewport = () => setVisible(false);

		addEventListener('mouseover', onMouseEnterViewport);
		addEventListener('mouseout', onMouseLeaveViewport);

		return () => {
			removeEventListener('mouseover', onMouseEnterViewport);
			removeEventListener('mouseout', onMouseLeaveViewport);
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			className={clsx(
				'fixed left-0 right-0 z-[1000] pointer-events-none transition-cursor -translate-x-1/2 -translate-y-1/2',
				defaultClassname,
				visible ? 'opacity-100' : 'opacity-0',
				hoveredTarget !== undefined && hoveredTarget.className
			)}
		>
			{hoveredTarget?.icon}
		</div>
	);
};
