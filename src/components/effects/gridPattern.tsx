"use client";

import React, { createContext, memo, useContext, useId, useMemo } from "react";

type GridPatternContextType = {
	size: number;
	offsetX: number;
	offsetY: number;
};

type Position = {
	x: number;
	y: number;
};

type GridProps = {
	size?: number;
	offsetX?: number;
	offsetY?: number;
	children?: React.ReactNode;
	className?: string;
};

type BlockProps = {
	row?: number;
	column?: number;
	className?: string;
	style?: React.CSSProperties;
};

const GridPatternContext = createContext<GridPatternContextType | undefined>(
	undefined
);

const getPosition = (
	row: number,
	column: number,
	{ size, offsetX, offsetY }: GridPatternContextType
): Position => ({
	x: column * size + offsetX + 1,
	y: row * size + offsetY + 1,
});

const Block = memo(function Block({
	row = 0,
	column = 0,
	className,
	style,
}: BlockProps): React.JSX.Element {
	const context = useContext(GridPatternContext);

	if (!context) {
		throw new Error("Block must be used within a Grid");
	}

	const position = useMemo(
		() => getPosition(row, column, context),
		[row, column, context]
	);

	return (
		<rect
			className={className}
			strokeWidth="0"
			width={context.size - 1}
			height={context.size - 1}
			x={position.x}
			y={position.y}
			style={style}
		/>
	);
});

const Grid = memo(function Grid({
	size = 64,
	offsetX = -1,
	offsetY = -1,
	children,
	className,
}: GridProps): React.JSX.Element {
	const id = useId();

	const context = useMemo(
		() => ({ size, offsetX, offsetY }),
		[size, offsetX, offsetY]
	);

	const patternProps = useMemo(
		() => ({
			id,
			viewBox: "0 0 64 64",
			width: size,
			height: size,
			patternUnits: "userSpaceOnUse",
			x: offsetX,
			y: offsetY,
		}),
		[id, size, offsetX, offsetY]
	);

	return (
		<GridPatternContext.Provider value={context}>
			<svg className={className}>
				<defs>
					<pattern {...patternProps}>
						<path d="M64 0H0V64" fill="none" />
					</pattern>
				</defs>
				<rect
					width="100%"
					height="100%"
					strokeWidth="0"
					fill={`url(#${id})`}
				/>
				{children}
			</svg>
		</GridPatternContext.Provider>
	);
});

export const GridPattern = Object.assign(Grid, { Block });
export { getPosition };
export type { BlockProps, GridPatternContextType, GridProps, Position };
