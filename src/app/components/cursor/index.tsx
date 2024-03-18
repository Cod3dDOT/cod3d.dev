'use client';

import { clsx } from 'clsx';
import {
	domAnimation,
	LazyMotion,
	m,
	useMotionValue,
	useSpring
} from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CursorProps, Interactable, InteractableOpts } from './types';
import find from './util/find';
import useIsTouchdevice from './util/useIsTouchDevice';

let timeout: NodeJS.Timeout;

export const Cursor: React.FC<CursorProps> = ({
	showSystemCursor = false,
	interactables,
	children,
	color,
	alpha,
	size = 15,
	snap
}) => {
	const defaultOptions = useMemo(
		() => ({
			children,
			color,
			alpha,
			width: size,
			height: size,
			snap
		}),
		[children, color, alpha, size, snap]
	);
	const [state, setState] = useState({
		isMoving: false,
		isHovered: false,
		snap: {
			dims: null as DOMRect | null,
			mode: null as InteractableOpts['snap'] | null
		}
	});

	const mouse = {
		x: useMotionValue(100),
		y: useMotionValue(100)
	};

	const targetSize = {
		w: useMotionValue(defaultOptions.width),
		h: useMotionValue(defaultOptions.height)
	};

	const smoothOptions = { damping: 200, stiffness: 5000, mass: 1 };
	const smoothMouse = {
		x: useSpring(mouse.x, smoothOptions),
		y: useSpring(mouse.y, smoothOptions)
	};
	const smoothSize = {
		w: useSpring(targetSize.w, smoothOptions),
		h: useSpring(targetSize.h, smoothOptions)
	};

	const manageMouseMove = useCallback(
		(e: { clientX: number; clientY: number }) => {
			const { clientX, clientY } = e;
			const { isHovered, snap } = state;

			if (isHovered && snap && snap.dims && snap.mode) {
				const { left, top, height, width } = snap.dims;
				const center = { x: left + width / 2, y: top + height / 2 };
				const distance = {
					x: clientX - center.x,
					y: clientY - center.y
				};

				const mapW = snap.mode === 'vertical' ? 1 : 0.2;
				const mapH = snap.mode === 'horizontal' ? 1 : 0.2;

				mouse.x.set(center.x - smoothSize.w.get() / 2 + distance.x * mapW);
				mouse.y.set(center.y - smoothSize.h.get() / 2 + distance.y * mapH);
			} else {
				mouse.x.set(clientX - smoothSize.w.get() / 2);
				mouse.y.set(clientY - smoothSize.h.get() / 2);
			}

			clearTimeout(timeout);
			if (!state.isMoving) setState({ ...state, isMoving: true });
			timeout = setTimeout(() => {
				if (state.isMoving) setState({ ...state, isMoving: false });
			}, 5000);
		},
		[mouse.x, mouse.y, smoothSize.h, smoothSize.w, state]
	);

	// hide system cursor
	useEffect(() => {
		if (typeof window !== 'object') return;
		document.body.style.cursor = showSystemCursor ? 'pointer' : 'none';
	}, [showSystemCursor]);

	useEffect(() => {
		const onMouseEnter = (el: HTMLElement, opts: typeof defaultOptions) => {
			setState((prevState) => ({
				...prevState,
				isHovered: true,
				snap: {
					dims: el.getBoundingClientRect(),
					mode: opts.snap
				}
			}));

			targetSize.w.set(opts.width * 1.4);
			targetSize.h.set(opts.height * 1.4);
		};

		const onMouseLeave = () => {
			setState((prevState) => ({
				...prevState,
				isHovered: false,
				dims: null
			}));
			targetSize.w.set(defaultOptions.width);
			targetSize.h.set(defaultOptions.height);
		};

		window.addEventListener('mousemove', manageMouseMove);

		const interactEls = document.querySelectorAll<HTMLElement>(
			interactables
				.map((interactable) =>
					typeof interactable === 'object' && interactable?.target
						? interactable.target
						: interactable ?? ''
				)
				.join(',')
		);

		interactEls.forEach((el) => {
			if (!showSystemCursor) el.style.cursor = 'none';

			const iOptions: InteractableOpts = (
				typeof interactEls === 'object'
					? find(
							interactables,
							(interactable: Interactable) =>
								typeof interactable === 'object' &&
								el.matches(interactable.target)
						) || {}
					: {}
			) as InteractableOpts;

			// caches size, but passes the element later into the callback use up-to-date position
			// will not work if element will change size
			const dims = el.getBoundingClientRect();

			let w = iOptions.size || defaultOptions.width;
			if (typeof w != 'number') {
				w =
					iOptions.size == 'width' || iOptions.size == 'both'
						? dims.width
						: dims.height;
			}
			let h = iOptions.size || defaultOptions.height;
			if (typeof h != 'number') {
				h =
					iOptions.size == 'height' || iOptions.size == 'both'
						? dims.height
						: dims.width;
			}

			const options: typeof defaultOptions = {
				...defaultOptions,
				...iOptions,
				width: h,
				height: h
			};

			el.addEventListener('mouseenter', () => {
				onMouseEnter(el, options);
			});

			el.addEventListener('mouseleave', () => {
				onMouseLeave();
			});
		});

		return () => {
			window.removeEventListener('mousemove', manageMouseMove);

			interactEls.forEach((el) => {
				if (!showSystemCursor) el.style.cursor = 'none';

				const iOptions: InteractableOpts = (
					typeof interactEls === 'object'
						? find(
								interactables,
								(interactable: Interactable) =>
									typeof interactable === 'object' &&
									el.matches(interactable.target)
							) || {}
						: {}
				) as InteractableOpts;

				const dims = el.getBoundingClientRect();

				let w = iOptions.size || defaultOptions.width;
				if (typeof w != 'number') {
					w =
						iOptions.size == 'width' || iOptions.size == 'both'
							? dims.width
							: dims.height;
				}
				let h = iOptions.size || defaultOptions.height;
				if (typeof h != 'number') {
					h =
						iOptions.size == 'height' || iOptions.size == 'both'
							? dims.height
							: dims.width;
				}

				const options: typeof defaultOptions = {
					...defaultOptions,
					...iOptions,
					width: h,
					height: h
				};

				el.removeEventListener('mouseenter', () => {
					onMouseEnter(el, options);
				});

				el.removeEventListener('mouseleave', () => {
					onMouseLeave();
				});
			});
		};
	}, [
		showSystemCursor,
		manageMouseMove,
		targetSize.w,
		targetSize.h,
		interactables,
		defaultOptions
	]);

	const isTouchdevice = useIsTouchdevice();
	if (typeof window !== 'undefined' && isTouchdevice) {
		return <></>;
	}

	return (
		<LazyMotion features={domAnimation}>
			<m.div
				style={{
					left: smoothMouse.x,
					top: smoothMouse.y,
					width: smoothSize.w,
					height: smoothSize.h
				}}
				animate={{
					// width: state.cursorW,
					// height: state.cursorH,
					opacity: state.isMoving ? 1 : 0
				}}
				className={clsx(
					'opacity-0 z-50 fixed w-5 h-5 rounded-full bg-foreground border-foreground border-2 transition-colors duration-500 pointer-events-none',
					state.isHovered && 'bg-transparent'
				)}
			/>
		</LazyMotion>
	);
};

export default Cursor;
