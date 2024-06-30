'use client';

import { AnimatePresence, LazyMotion, m, domAnimation } from 'framer-motion';
import { useSelectedLayoutSegment } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { useContext, useEffect, useRef } from 'react';

function usePreviousValue<T>(value: T): T | undefined {
	const prevValue = useRef<T>();

	useEffect(() => {
		prevValue.current = value;
		return () => {
			prevValue.current = undefined;
		};
	});

	return prevValue.current;
}

function FrozenRouter(props: { children: React.ReactNode }) {
	const context = useContext(LayoutRouterContext);
	const prevContext = usePreviousValue(context) || null;

	const segment = useSelectedLayoutSegment();
	const prevSegment = usePreviousValue(segment);

	const changed =
		segment !== prevSegment &&
		segment !== undefined &&
		prevSegment !== undefined;

	return (
		<LayoutRouterContext.Provider value={changed ? prevContext : context}>
			{props.children}
		</LayoutRouterContext.Provider>
	);
}

export function LayoutTransition(props: {
	children: React.ReactNode;
	className?: React.ComponentProps<typeof m.div>['className'];
	style?: React.ComponentProps<typeof m.div>['style'];
	initial: React.ComponentProps<typeof m.div>['initial'];
	animate: React.ComponentProps<typeof m.div>['animate'];
	exit: React.ComponentProps<typeof m.div>['exit'];
}) {
	const segment = useSelectedLayoutSegment();

	return (
		<AnimatePresence>
			<m.div
				className={props.className}
				style={props.style}
				key={segment}
				initial={props.initial}
				animate={props.animate}
				exit={props.exit}
			>
				<FrozenRouter>{props.children}</FrozenRouter>
			</m.div>
		</AnimatePresence>
	);
}

export function FadeTransition(props: { children: React.ReactNode }) {
	return (
		<LazyMotion features={domAnimation}>
			<div className="relative flex min-w-screen min-h-screen">
				<LayoutTransition
					className="absolute inset-0"
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 0.1, duration: 0.5 }
					}}
					exit={{ opacity: 0 }}
				>
					{props.children}
				</LayoutTransition>
			</div>
		</LazyMotion>
	);
}
