'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';

import { GlitchText } from '@/components/effects/glitchText';
import { getGroupedBy } from '@/lib/array';
import { Thought } from '@/lib/pocketbase/types';

import { ThoughtsYear } from './year';

type ThoughtsYearsProps = {
	thoughts: Thought[];
};

const starAnimations: {
	[K: number]: string[];
} = {
	'-1': [
		'stars [animation:animateLeft_50s_linear_infinite]',
		'stars2 [animation:animateLeft_100s_linear_infinite]',
		'stars3 [animation:animateLeft_150s_linear_infinite]'
	],
	1: [
		'stars [animation:animateRight_50s_linear_infinite]',
		'stars2 [animation:animateRight_100s_linear_infinite]',
		'stars3 [animation:animateRight_150s_linear_infinite]'
	]
};

export const Years: React.FC<ThoughtsYearsProps> = ({ thoughts }) => {
	const [active, setActive] = useState(2024);
	const [offset, setOffset] = useState(0);

	const thoughtsByYears = getGroupedBy(
		thoughts.map((th) => {
			return { ...th, year: new Date(th.created).getFullYear() };
		}),
		'year'
	);

	const onSwitchCallback = (off: number) => {
		if (offset != 0) return;

		const DURATION = 2000;

		setOffset(off);

		setTimeout(() => {
			setActive(active + off);
		}, DURATION / 2);

		setTimeout(() => {
			setOffset(0);
		}, DURATION);
	};

	const disableButton = (off: number) => {
		// allows one year into the past / future
		return !(active + off in thoughtsByYears || active in thoughtsByYears);
	};

	return (
		<div
			className="font-pixelify relative flex overflow-hidden h-[calc(100vh-10rem)] rounded-lg w-full
                        xl:flex-row flex-col"
		>
			<div className="xl:w-32 xl:h-full w-full h-32 flex xl:flex-col">
				<div
					className="text-3xl grid xl:grid-rows-3 xl:grid-cols-1 grid-cols-3 text-center
                md:flex-auto flex-1"
				>
					<button
						className=" disabled:opacity-20"
						onClick={() => onSwitchCallback(1)}
						disabled={disableButton(1)}
					>
						+
					</button>
					<div className="flex xl:[writing-mode:vertical-rl] xl:[text-orientation:upright]">
						<span className="m-auto self-center">{active}</span>
					</div>
					<button
						className=" disabled:opacity-20"
						onClick={() => onSwitchCallback(-1)}
						disabled={disableButton(-1)}
					>
						-
					</button>
				</div>
			</div>
			<div className="relative w-full h-full">
				<AnimatePresence>
					{offset != 0 && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="z-10 absolute inset-0 bg-background"
						>
							<div className="relative w-full h-full flex items-center justify-center bg-grainy">
								<div className="*:absolute *:inset-0">
									<div className={starAnimations[offset][0]} />
									<div className={starAnimations[offset][1]} />
									<div className={starAnimations[offset][2]} />
								</div>

								<m.span
									initial={{ x: -100 * offset }}
									animate={{ x: 0 }}
									exit={{ x: 100 * offset }}
									transition={{ duration: 1 }}
									className="text-8xl"
								>
									{active}
								</m.span>
							</div>
						</m.div>
					)}
				</AnimatePresence>
				{active in thoughtsByYears ? (
					<ThoughtsYear thoughts={thoughtsByYears[active]} year={active} />
				) : active - 1 in thoughtsByYears ? (
					<div
						className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center
                    lg:text-8xl md:text-6xl text-3xl text-center"
					>
						<span>Welcome back to the</span>
						<GlitchText text="future" as="span" />
					</div>
				) : (
					<div
						className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center
                                lg:text-8xl md:text-6xl text-3xl text-center"
					>
						<span>You told me once to forget the</span>
						<GlitchText text="past" as="span" />
					</div>
				)}
			</div>
		</div>
	);
};