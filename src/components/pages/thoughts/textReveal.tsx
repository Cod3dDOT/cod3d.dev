'use client';

import { clsx } from 'clsx';
import React, {
	createContext,
	useContext,
	useMemo,
	useRef,
	useState
} from 'react';

import { useLenis } from '@/lib/lenis';

import ScrollIcon from '@/components/icons/scroll';

interface TextRevealContextType {
	tokens: string[];
	progress: number;
	skip: () => void;
}

const TextRevealContext = createContext<TextRevealContextType>({
	tokens: [],
	progress: 0,
	skip: () => {}
});

interface RootProps {
	body?: string;
	children: (
		tokens: string[],
		progress: number,
		skip: () => void
	) => React.ReactNode;
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
	const [progress, setProgress] = useState(0);

	const lenis = useLenis(
		({ scroll }) => {
			const newProgress = (scroll / height) * 2 * 1.1;
			if (Math.abs(newProgress - progress) < 0.05 || newProgress > 1.1) return;
			setProgress(newProgress);
		},
		[progress]
	);

	const height = useMemo(() => {
		const rect = container.current?.getBoundingClientRect();
		return rect?.height || 0;
	}, [container.current]);

	const skip = () => lenis?.scrollTo(height);

	const tokens = useMemo(() => body.match(/\S+|\s+/g) || [], [body]);

	const context = useMemo(
		() => ({ tokens, progress, skip }),
		[tokens, progress, skip]
	);

	return (
		<TextRevealContext.Provider value={context}>
			<Component ref={container} className={className} {...props}>
				{children(tokens, progress, skip)}
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
		() => index / context.tokens.length < context.progress - 0.1,
		[index, context.progress]
	);

	return <>{children(isActive)}</>;
}

export const TextReveal: React.FC<RootProps> & { Token: React.FC<TokenProps> } =
	Object.assign(Root, { Token });

export const ThoughtsTextReveal = () => {
	return (
		<TextReveal
			body="Archiving thoughts so that my brain doesn't have to"
			className="relative h-[200vh] text-foreground w-full max-w-[96rem]"
		>
			{(tokens, progress, skip) => (
				<div className="sticky top-0 flex h-screen items-center">
					<h1 className="font-medium leading-tight sm:leading-none xl:leading-tight lg:text-[9vw] xl:text-[8rem]">
						{tokens.map((token, index) => (
							<TextReveal.Token key={index} index={index}>
								{(isActive) => (
									<span
										className={clsx('transition-all [font-size:inherit]', {
											'opacity-10': !isActive,
											'[text-shadow:3px_3px_#558ABB] md:[text-shadow:5px_5px_#558ABB]':
												token == 'brain' && isActive,
											'[text-shadow:3px_3px_#BB2649] md:[text-shadow:5px_5px_#BB2649]':
												token == 'thoughts' && isActive
										})}
									>
										{token}
									</span>
								)}
							</TextReveal.Token>
						))}
					</h1>

					<button className="absolute bottom-12 z-20" onClick={skip}>
						<ScrollIcon
							className={'fill-foreground/50'}
							style={{ opacity: 1 - progress || 0 }}
						/>
					</button>
				</div>
			)}
		</TextReveal>
	);
};
