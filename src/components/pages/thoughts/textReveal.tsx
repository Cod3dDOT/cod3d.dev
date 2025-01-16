'use client';

import { useScrollbar, useWindowSize } from '@14islands/r3f-scroll-rig';
import { clsx } from 'clsx';
import React, {
	createContext,
	RefObject,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

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
}

function convertRemToPixels(rem: number) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function Root({ body = '', children, className, ...props }: RootProps) {
	const [progress, setProgress] = useState(0);

	const { scrollTo, onScroll } = useScrollbar();

	const { height } = useWindowSize();

	const scrollCallback = useCallback(
		({ scroll }: { scroll: number }) => {
			const p = ((height / 2 - scroll) / height) * 2;
			setProgress(1 - p);
		},
		[height]
	);

	const skip = useCallback(() => {
		scrollTo(height + convertRemToPixels(3.5));
	}, [height, scrollTo]);

	useEffect(() => {
		onScroll(scrollCallback);
	}, [scrollCallback, onScroll]);

	const tokens = useMemo(() => body.match(/\S+|\s+/g) || [], [body]);

	const context = useMemo(
		() => ({ tokens, progress, skip }),
		[tokens, progress, skip]
	);

	const memoizedChildren = useMemo(
		() => children(tokens, progress, skip),
		[tokens, progress, skip, children]
	);

	return (
		<TextRevealContext.Provider value={context}>
			<div className={className} {...props}>
				{memoizedChildren}
			</div>
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
		[index, context.tokens.length, context.progress]
	);

	return <>{children(isActive)}</>;
}

export const TextReveal: React.FC<RootProps> & { Token: React.FC<TokenProps> } =
	Object.assign(Root, { Token });

export const ThoughtsTextReveal = () => {
	return (
		<TextReveal
			body="Archiving 💭 so that my 🧠 doesn't have to"
			className="relative h-[200vh] text-foreground w-full max-w-[96rem]"
		>
			{(tokens, progress, skip) => (
				<TextRevealInner tokens={tokens} progress={progress} skip={skip} />
			)}
		</TextReveal>
	);
};

const TextRevealInner: React.FC<TextRevealContextType> = ({
	tokens,
	progress,
	skip
}) => {
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		ref.current?.addEventListener('click', skip);
		return () => ref.current?.removeEventListener('click', skip);
	}, [skip]);

	return (
		<div className="sticky top-0 flex h-screen items-center">
			<ScrollDownButtonMemo
				className={clsx({
					'opacity-50': progress > 0.3 && progress < 0.5,
					'opacity-25': progress > 0.5 && progress < 0.7,
					'opacity-0': progress > 0.7
				})}
				ref={ref}
			/>
			<TitleMemo tokens={tokens} />
		</div>
	);
};

const ScrollDownButtonMemo: React.FC<{
	className?: string;
	ref: RefObject<HTMLButtonElement | null>;
}> = React.memo(({ className, ref }) => (
	<button
		ref={ref}
		type="button"
		className={clsx(
			'absolute top-0 my-[1.15rem] md:bottom-0 md:top-[unset] z-20 duration-300 transition-opacity',
			className
		)}
	>
		<ScrollIcon className={clsx('fill-foreground h-12 w-12 p-2', className)} />
		<span className="sr-only">Scroll down</span>
	</button>
));

const TitleMemo: React.FC<{ tokens: string[] }> = React.memo(({ tokens }) => (
	<h1 className="font-medium leading-tight sm:leading-none xl:leading-tight lg:text-[9vw] xl:text-[8rem] sm:text-[5.65rem] text-[4rem]">
		{tokens.map((token, index) => (
			<TextReveal.Token key={index} index={index}>
				{(isActive) => (
					<span
						className={clsx('transition-all grayscale [font-size:inherit]', {
							'opacity-10': !isActive,
							'[text-shadow:5px_5px_rgb(var(--accent))] saturate-50 grayscale-0':
								(token == '💭' || token == '🧠') && isActive
						})}
					>
						{token}
					</span>
				)}
			</TextReveal.Token>
		))}
	</h1>
));
