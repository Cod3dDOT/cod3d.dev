import { Project } from "@pocketbase/types";

import { cn } from "@/lib/utils/cn";

type ProjectBadgeProps = {
	status: Project["status"];
};

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({ status }) => {
	let color = "";
	switch (status) {
		case "stale":
			color = "bg-yellow-400";
			break;
		case "dev":
			color = "bg-green-500";
			break;
		case "idea":
			color = "bg-blue-500";
			break;
	}
	return (
		<div
			className={cn(
				color,
				"hidden h-full w-0 items-center justify-center overflow-hidden transition-all group-hover:w-16 motion-reduce:w-16 sm:flex",
				"text-foreground dark:text-background"
			)}
		>
			{status}
		</div>
	);
};
