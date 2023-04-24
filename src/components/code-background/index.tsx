import { useEffect, useState } from 'react';
import { TextSwap } from '../text-swap';
import { before } from 'node:test';

const jsMap = {
	cod3d: `([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[!+[]+!+[]]+[!+[]+!+[]+!+[]]+([][[]]+[])[!+[]+!+[]]`,
	'(': `([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[+!+[]+[!+[]+!+[]+!+[]]]`,
	')': `([+[]]+![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[!+[]+!+[]+[+[]]]`,
	'.': `(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]`,
	dot: `([][[]]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+[]]`
} as const;

interface Variant {
	before: (keyof typeof jsMap)[];
	colored: (keyof typeof jsMap)[];
	after: (keyof typeof jsMap)[];
}

interface Generated {
	before: string;
	colored: string;
	after: string;
}

const variations: Array<Variant> = [
	{ before: ['cod3d', '('], colored: ['dot'], after: [')'] },
	{ before: ['cod3d', '('], colored: ['.'], after: [')'] },
	{ before: ['cod3d'], colored: ['dot'], after: [] }
];

const generated: Array<Generated> = variations.map((v) => {
	return {
		before: v.before.map((x) => jsMap[x]).join(),
		colored: v.colored.map((x) => jsMap[x]).join(),
		after: v.after.map((x) => jsMap[x]).join()
	};
});

export const CodeBackground: React.FC = () => {
	const [index, setIndex] = useState(0);

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		setIndex(index === variations.length - 1 ? 0 : index + 1);
	// 	}, 3000);
	// 	return () => clearTimeout(intervalId);
	// }, [index]);

	const { before, colored, after } = generated[index]!;

	return (
		<div className="text-6xl font-mono font-black leading-relaxed h-screen overflow-hidden">
			<span className="opacity-5">{before}</span>
			{/* <TextSwap
				words={generated.map((x) => x.colored)}
				className="text-yellow-400"
			></TextSwap> */}
			<span className="text-yellow-400 opacity-50">{colored}</span>
			<span className="opacity-5">{after}</span>
		</div>
	);
};
