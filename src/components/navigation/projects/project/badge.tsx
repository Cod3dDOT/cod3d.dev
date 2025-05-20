/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Project } from "@pocketbase/types";

import { cn } from "@/lib/utils/cn";

type ProjectBadgeProps = {
	status: Project["status"];
};

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({ status }) => {
	let color = "";
	switch (status) {
		case "stale":
			color = "bg-warn";
			break;
		case "dev":
			color = "bg-success";
			break;
		case "idea":
			color = "bg-info";
			break;
	}
	return (
		<div
			className={cn(
				color,
				"hidden h-full w-0 items-center justify-center overflow-hidden transition-all group-hover:w-16 group-focus:w-16 motion-reduce:w-16 sm:flex",
				"text-foreground dark:text-background"
			)}
		>
			{status}
		</div>
	);
};
