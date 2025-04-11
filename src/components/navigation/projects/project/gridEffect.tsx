"use client";

import { memo, useMemo } from "react";
import { Project } from "@pocketbase/types";

import { GridPattern } from "@/components/effects/gridPattern";
import { cn } from "@/lib/utils/cn";
import { stringToUniqueId } from "@/lib/utils/crypto";
import { randomIntFromIntervalPredicted } from "@/lib/utils/math";

const animationDelay = [
	"delay-0",
	"delay-100",
	"delay-200",
	"delay-300",
	"delay-500",
];

export const ProjectGridEffect: React.FC<{ id: Project["id"] }> = ({ id }) => {
	const idn = stringToUniqueId(id);

	const blocks = useMemo(
		() =>
			Array.from({ length: 60 }, (_, i) => [
				randomIntFromIntervalPredicted(0, 4, idn + i),
				randomIntFromIntervalPredicted(0, 30, idn - i),
			]),
		[idn]
	);

	return (
		<GridPattern
			offsetX={0}
			offsetY={-2}
			size={22}
			className="stroke-foreground h-full w-full [mask-image:radial-gradient(white,transparent_70%)] stroke-2 opacity-0 transition-opacity group-hover:opacity-100"
		>
			{blocks.map(([row, column], index) => {
				const blockClassName = cn(
					"fill-foreground",
					animationDelay[
						randomIntFromIntervalPredicted(0, 4, idn + index)
					]
				);

				return (
					<GridPattern.Block
						key={`block-${idn.toString()}-${index.toString()}`}
						row={row}
						column={column}
						className={blockClassName}
					/>
				);
			})}
		</GridPattern>
	);
};

export const MemoProjectGridEffect = memo(ProjectGridEffect);
