/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId } from "react";
import { cn } from "@/lib/utils/cn";

interface TooltipProps {
	position?: "top" | "bottom" | "left" | "right";
	content: string;
	children: (id: string) => React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
	children,
	content,
	position = "top"
}) => {
	const id = useId();

	const positionClasses = {
		top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
		bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
		left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
		right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
	};

	return (
		<div className="group relative inline-block">
			{children(id)}

			<div
				id={id}
				role="tooltip"
				className={cn(
					"invisible absolute opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100",
					"whitespace-nowrap normal-case peer-focus:visible peer-focus:opacity-100",
					"rounded border-foreground bg-container p-2 text-foreground shadow-lg transition-opacity duration-200 ease-in-out",
					positionClasses[position]
				)}
			>
				{content}
			</div>
		</div>
	);
};
