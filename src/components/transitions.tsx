'use client';

import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
	createContext,
	MouseEventHandler,
	PropsWithChildren,
	use,
	useState,
	useTransition
} from 'react';

import { Loader } from './loader';

export const DELAY = 200;

const sleep = (ms: number) =>
	new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
const noop = () => {};

type TransitionContext = {
	pending: boolean;
	target: string;
	navigate: (url: string) => void;
};
const Context = createContext<TransitionContext>({
	pending: false,
	target: '',
	navigate: noop
});
export const usePageTransition = () => use(Context);
export const usePageTransitionHandler = () => {
	const { navigate } = usePageTransition();
	const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		const href = e.currentTarget.getAttribute('href');
		if (href) navigate(href);
	};

	return onClick;
};

type Props = PropsWithChildren<{
	className?: string;
}>;

export default function Transitions({ children, className }: Props) {
	const [pending, start] = useTransition();
	const router = useRouter();
	const pathname = usePathname();

	const [target, setTarget] = useState('');

	const navigate = (href: string) => {
		start(async () => {
			router.push(href);
			await sleep(DELAY);
		});
	};

	const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
		const a = (e.target as Element).closest('a');
		if (!a) return;

		e.preventDefault();
		const href = a.getAttribute('href');
		if (!href) return;

		if (href == pathname) return;

		setTarget(href);

		// for relative links in thoughts
		if (href.at(0) == '#') {
			router.push(href);
			return;
		}

		navigate(href);
	};

	return (
		<Context.Provider value={{ pending, navigate, target }}>
			<div onClickCapture={onClick} className={className}>
				{children}
			</div>
		</Context.Provider>
	);
}

export function Animate({ children, className }: Props) {
	const { pending, target } = usePageTransition();

	return (
		<LazyMotion features={domAnimation}>
			<AnimatePresence>
				{!pending ? (
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={className}
					>
						{children}
					</m.div>
				) : (
					target.includes('thoughts/') && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 flex items-center justify-center"
						>
							<Loader />
						</m.div>
					)
				)}
			</AnimatePresence>
		</LazyMotion>
	);
}
