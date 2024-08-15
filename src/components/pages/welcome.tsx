'use client';

import { useWindowSize } from 'react-use';
import { GridPattern } from '../effects/gridPattern';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import Pokeball from '@/../public/pokeball.png';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

const I = (x: number, y: number) => [
	[x, y],
	[x, y + 1],
	[x, y + 2],
	[x, y - 1],
	[x, y - 2]
];

const B = (x: number, y: number) =>
	[...C(x, y - 1), ...C(x, y + 1), [x + 1, y + 1], [x + 1, y - 1]].filter(
		(e) => e[0] != x + 1 || e[1] != y - 2
	);
const L = (x: number, y: number) => I(x, y);
const O = (x: number, y: number) => [...C(x, y), [x + 1, y]];
const G = (x: number, y: number) => [
	...O(x, y),
	[x + 1, y + 2],
	[x + 1, y + 3],
	[x, y + 3],
	[x - 1, y + 3]
];

const H = (x: number, y: number) => [
	[x, y],
	[x + 1, y],
	[x + 1, y + 1],
	[x + 1, y - 1],
	[x - 1, y],
	[x - 1, y + 1],
	[x - 1, y - 1]
];
const M = (x: number, y: number) => [
	[x, y],
	[x + 1, y - 1],
	[x - 1, y - 1],
	[x + 2, y],
	[x - 2, y],
	[x + 2, y + 1],
	[x - 2, y + 1],
	[x + 2, y - 1],
	[x - 2, y - 1]
];
const E = (x: number, y: number) => C(x, y);

const C = (x: number, y: number, flip: boolean = false) => [
	[x + 1, y + 1],
	[x, y + 1],
	[x - 1, y + 1],
	[x - 1, y],
	[x - 1, y - 1],
	[x, y - 1],
	[x + 1, y - 1]
];

const BLOG = (x: number, y: number) =>
	B(x - 4, y)
		.concat(L(x - 1, y))
		.concat(O(x + 2, y + 1))
		.concat(G(x + 6, y + 1));

const HOME = (x: number, y: number) =>
	H(x - 6, y)
		.concat(O(x - 2, y))
		.concat(M(x + 3, y))
		.concat(E(x + 8, y));

const columns = 30;

const getBlocks = (pathname: string, center: { x: number; y: number }) => {
	switch (pathname) {
		case '/thoughts':
			return BLOG(center.x, center.y);
		default:
			return HOME(center.x, center.y);
	}
};

export const Welcome = () => {
	const pathname = usePathname();

	const { width, height } = useWindowSize(1920, 1080);

	const [blockSize, setBlockSize] = useState<number | undefined>(undefined);
	const [opacity, setOpacity] = useState(0);

	const [center, setCenter] = useState({
		x: Math.round(columns / 2),
		y: Math.round(0)
	});

	const [blocks, setBlocks] = useState<number[][]>([]);

	useEffect(() => {
		const blockSize = width / columns;
		const rows = Math.round(height / blockSize);
		const c = { x: Math.round(columns / 2), y: Math.round(rows / 2) };

		setBlockSize(width / columns);
		setCenter(c);

		setOpacity(1);
	}, [width]);

	useEffect(() => {
		setBlocks(getBlocks(pathname, center));
	}, [center]);

	useEffect(() => {
		setBlocks(getBlocks(pathname, center));
	}, [pathname]);

	return (
		<div className="bg-background [perspective:2000px] transition-opacity overflow-hidden duration-1000 w-full h-screen">
			<GridPattern
				size={blockSize}
				className="w-full h-full [transform:rotateX(50deg)_rotateY(-5deg)_rotateZ(20deg)_translateX(-10%)_translateY(-10%)_scale(1.25)] stroke-foreground stroke-1
                [mask-image:radial-gradient(white,transparent_90%)]"
			>
				{blocks.map(([column, row], index) => (
					<GridPattern.Block
						v-for="([row, column], index) in blocks"
						key={index}
						row={row}
						column={column}
						className={clsx(
							'relative z-10 fill-foreground transition-transform -translate-y-3 -translate-x-3 hover:translate-x-0 hover:translate-y-0'
						)}
					/>
				))}
			</GridPattern>
			<Image
				className="absolute left-1/2 top-1/2 [transform:rotateX(50deg)_rotateY(-5deg)_rotateZ(20deg)_translateZ(-10%)_scale(1.25)]"
				src={Pokeball}
				alt="Sad Togepi"
				width={blockSize}
				height={blockSize}
			/>
			<p
				className="md:hidden absolute [transform:rotateX(50deg)_rotateY(-5deg)_rotateZ(20deg)] "
				style={{ fontSize: blockSize + 'px' }}
			>
				Home
			</p>
		</div>
	);
};
