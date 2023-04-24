/* eslint-disable react/no-array-index-key */
import React, {
	createRef,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react';

interface TextSwapProps {
	words: string[];
	animationOptions?: {
		randomStartMin: number;
		randomStartMax: number;
		randomReverseMin: number;
		randomReverseMax: number;
		loopAnimation: number;
		waitToStart: number;
		transitionDuration: number;
		timingFunction: number;
	};
	className: string;
}

interface LetterAnimation {
	id: string; // for a unique key
	letter: string; // the displayed letter
	playing: boolean; // if this letter is animating to the destination

	// the source location, starting place and letter
	src: {
		letter: string;
		offsetLeft: number;
		offsetTop: number;
	};
	// the destination location and letter
	dest: {
		letter: string;
		offsetLeft: number;
		offsetTop: number;
	};
}

const ltrs = (word: string) => [...word];

const randomMinMax = (min = 0, max = 100): number =>
	Math.floor(Math.random() * (max - min)) + min;

const uuidv4 = (): string => {
	return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const TextSwap: React.FC<TextSwapProps> = ({
	words = ['', ''],
	animationOptions = {
		randomStartMin: 0,
		randomStartMax: 1000,
		randomReverseMin: 6000,
		randomReverseMax: 9000,
		loopAnimation: 12000,
		waitToStart: 0,
		transitionDuration: 1000,
		timingFunction: 'ease-in-out'
	},
	className = ''
}) => {
	const word = words[0];
	const next = words[1];

	if (!word || !next) throw new Error('Can not find the next word');

	const [swapAnimations, setAnimations] = useState<
		Array<Partial<LetterAnimation>>
	>([]);
	const wordRefs = useRef(ltrs(word).map(() => createRef<HTMLSpanElement>()));
	const nextRefs = useRef(ltrs(next).map(() => createRef<HTMLSpanElement>()));

	const updateAnimation = useCallback(
		(i: number, update = {}) => {
			setAnimations((prevState) => {
				const newState = [...prevState];
				newState[i] = {
					...prevState[i],
					...update
				};
				return newState;
			});
		},
		[setAnimations]
	);

	const {
		randomStartMin,
		randomStartMax,
		randomReverseMin,
		randomReverseMax,
		loopAnimation,
		waitToStart,
		transitionDuration,
		timingFunction
	} = animationOptions;

	useEffect(() => {
		const swaps: LetterAnimation[] = [];
		const destLettersPaired: boolean[] = ltrs(next).map(() => false);

		ltrs(word).forEach((srcLetter, srcIndex) => {
			const destLetterIdx = ltrs(next).findIndex((destLetter, index) => {
				return (
					destLetter.toLowerCase() === srcLetter.toLowerCase() &&
					!destLettersPaired[index]
				);
			});

			if (destLetterIdx === -1) {
				return;
				throw new Error(`All source letters were already paired.`);
			} else {
				destLettersPaired[destLetterIdx] = true;
			}

			const wordSpanRef = wordRefs.current[srcIndex]?.current;
			const nextSpanRef = nextRefs.current[destLetterIdx]?.current;

			if (!wordSpanRef || !nextSpanRef) return;

			const swap: LetterAnimation = {
				id: uuidv4(),
				letter: srcLetter,
				playing: false,

				src: {
					letter: word[srcIndex]!,
					offsetLeft: wordSpanRef.offsetLeft,
					offsetTop: wordSpanRef.offsetTop
				},

				dest: {
					letter: next[destLetterIdx]!,
					offsetLeft: nextSpanRef.offsetLeft,
					offsetTop: nextSpanRef.offsetTop
				}
			};
			swaps.push(swap);
		});

		setAnimations(swaps);

		console.log(swaps[3]);

		const animateFunc = () => {
			swaps.forEach((swap, i) => {
				const forwardStartTime = randomMinMax(
					randomStartMin,
					randomStartMax
				);
				setTimeout(() => {
					updateAnimation(i, { playing: true });
				}, forwardStartTime);

				// const reverseStartTime = randomMinMax(
				// 	randomReverseMin,
				// 	randomReverseMax
				// );
				// setTimeout(() => {
				// 	updateAnimation(i, { playing: false });
				// }, reverseStartTime);
			});

			setTimeout(() => {
				animateFunc();
			}, loopAnimation);
		};

		setTimeout(() => {
			animateFunc();
		}, waitToStart);
	}, [
		wordRefs,
		nextRefs,
		loopAnimation,
		updateAnimation,
		randomReverseMax,
		randomReverseMin,
		randomStartMax,
		randomStartMin,
		waitToStart,
		transitionDuration,
		timingFunction,
		words,
		word,
		next
	]);

	return (
		<div
			className={`relative [margin:0_auto] p-0 self-center text-left uppercase flex flex-col flex-[0_0_auto] ${className}`}
		>
			<div className="absolute invisible">
				{ltrs(word).map((letter, i) => {
					return (
						<span
							ref={wordRefs.current[i]}
							className="whitespace-pre z-10 inline-block relative left-0 top-0 transition:[left_2s_ease-in-out,top_2s_ease-in-out;]"
							key={`${i}${letter}`}
						>
							{letter}
						</span>
					);
				})}
			</div>
			<div className="absolute invisible">
				{ltrs(next).map((letter, i) => {
					return (
						<span
							ref={nextRefs.current[i]}
							className="whitespace-pre z-10 inline-block relative left-0 top-0 transition:[left_2s_ease-in-out,top_2s_ease-in-out;]"
							key={`${i}${letter}`}
						>
							{letter}
						</span>
					);
				})}
			</div>
			<div className="relative">
				{swapAnimations.map((renderedLetter) => {
					const { id, letter, playing, src, dest } = renderedLetter;

					if (!dest || !src) return;

					const letterStyles: React.CSSProperties = {
						transition: `left ${transitionDuration}ms ${timingFunction}, top ${transitionDuration}ms ${timingFunction}`,
						left: playing
							? `${dest.offsetLeft - src.offsetLeft}px`
							: undefined,
						top: playing
							? `${dest.offsetTop - src.offsetTop}px`
							: undefined
					};

					return (
						<span
							key={id}
							className="whitespace-pre z-10 inline-block relative left-0 top-0 transition:[left_2s_ease-in-out,top_2s_ease-in-out;]"
							style={letterStyles}
						>
							{letter}
						</span>
					);
				})}
			</div>
		</div>
	);
};
