'use client';

import React, { createContext, useContext, useId } from 'react';

interface GridPatternContextType {
	size: number;
	offsetX: number;
	offsetY: number;
}

const GridPatternContext = createContext<GridPatternContextType | undefined>(
	undefined
);

interface GridProps {
	size?: number;
	offsetX?: number;
	offsetY?: number;
	children?: React.ReactNode;
	className?: string;
}

function Grid({
	size = 64,
	offsetX = -1,
	offsetY = -1,
	children,
	className
}: GridProps): JSX.Element {
	const id = useId();

	const context: GridPatternContextType = {
		size,
		offsetX,
		offsetY
	};

	return (
		<GridPatternContext.Provider value={context}>
			<svg className={className}>
				<defs>
					<pattern
						id={id}
						viewBox="0 0 64 64"
						width={size}
						height={size}
						patternUnits="userSpaceOnUse"
						x={offsetX}
						y={offsetY}
					>
						<path d="M64 0H0V64" fill="none" />
					</pattern>
				</defs>

				<rect
					width="100%"
					height="100%"
					strokeWidth="0"
					fill={`url(#${id})`}
				></rect>

				{children}
			</svg>
		</GridPatternContext.Provider>
	);
}

interface BlockProps {
	row?: number;
	column?: number;
	className?: string;
}

function Block({ row = 0, column = 0, className }: BlockProps): JSX.Element {
	const context = useContext(GridPatternContext);

	if (!context) throw new Error('Block must be used within a Grid');

	return (
		<rect
			className={className}
			strokeWidth="0"
			width={context.size - 1}
			height={context.size - 1}
			x={column * context.size + context.offsetX + 1}
			y={row * context.size + context.offsetY + 1}
		/>
	);
}

export const GridPattern = Object.assign(Grid, { Block });
