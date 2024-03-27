'use client';

import { clsx } from 'clsx';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useWindowScroll } from 'react-use';

import ScrollIcon from '@/components/icons/scroll';

interface TextRevealContextType {
	tokens: string[];
	progress: number;
}

const TextRevealContext = createContext<TextRevealContextType>({
	tokens: [],
	progress: 0
});

interface RootProps {
	body?: string;
	children: (tokens: string[], progress: number) => React.ReactNode;
	className?: string;
	as?: React.ElementType;
}

function Root({
	body = '',
	children,
	className,
	as: Component = 'div',
	...props
}: RootProps) {
	const container = useRef<HTMLDivElement>(null);

	const { y: windowScroll } = useWindowScroll();

	const top = useMemo(() => {
		return container.current?.getBoundingClientRect().top ?? 0;
	}, [windowScroll]);

	const height = useMemo(() => {
		return container.current?.getBoundingClientRect().height ?? 0;
	}, [windowScroll]);

	const tokens = useMemo(() => body.match(/\S+|\s+/g) || [], [body]);

	const progress = useMemo(() => (-top / height) * 2, [top, height]);

	const context = useMemo(() => ({ tokens, progress }), [tokens, progress]);

	return (
		<TextRevealContext.Provider value={context}>
			<Component ref={container} className={className} {...props}>
				{children(tokens, progress)}
			</Component>
		</TextRevealContext.Provider>
	);
}

interface TokenProps {
	index: number;
	children: (isActive: boolean) => React.ReactNode;
}

function Token({ index, children }: TokenProps) {
	const context = useContext(TextRevealContext);

	const isActive = useMemo(
		() => index / context.tokens.length < context.progress,
		[index, context.progress]
	);

	return <>{children(isActive)}</>;
}

export const TextReveal: React.FC<RootProps> & { Token: React.FC<TokenProps> } =
	Object.assign(Root, { Token });

export const ThoughtsTextReveal = () => {
	return (
		<TextReveal
			body={"Archiving thoughts so that my brain doesn't have to"}
			className="relative h-[200vh] text-foreground w-full"
		>
			{(tokens, progress) => (
				<div className="sticky left-0 top-0 flex h-screen items-center leading-none lg:text-9xl md:text-6xl text-4xl font-medium">
					<div>
						{tokens.map((token, index) => (
							<TextReveal.Token key={index} index={index}>
								{(isActive) => (
									<span
										className={clsx(
											{
												'opacity-10': !isActive,
												'[text-shadow:3px_3px_#558ABB] md:[text-shadow:5px_5px_#558ABB]':
													token == 'brain' && isActive
											},
											'transition-all'
										)}
									>
										{token}
									</span>
								)}
							</TextReveal.Token>
						))}
					</div>

					<button
						className="absolute bottom-12"
						onClick={() =>
							document.documentElement.scrollTo(
								0,
								document.documentElement.clientHeight * 2
							)
						}
					>
						<ScrollIcon
							className={'fill-foreground/50'}
							style={{ opacity: 1 - progress }}
						/>
					</button>
				</div>
			)}
		</TextReveal>
	);
};