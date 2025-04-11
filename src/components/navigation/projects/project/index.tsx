import { Project } from "@pocketbase/types";

import GithubIcon from "@/components/icons/github";
import { cn } from "@/lib/utils/cn";
import { ProjectBadge } from "./badge";
import { MemoProjectGridEffect } from "./gridEffect";

export const NavProject: React.FC<{
	project: Project;
}> = ({ project }) => {
	return (
		<a
			href={project.repo}
			target="_blank"
			aria-label={"Github link to the source code of " + project.name}
			rel="noreferrer"
			className="group relative flex items-center overflow-hidden rounded-md transition-shadow hover:shadow-xl focus:shadow-xl sm:h-16"
		>
			<ProjectBadge status={project.status} />
			<div className="flex flex-1 flex-col space-y-1 p-2 sm:w-fit sm:flex-initial">
				<span className="text-xl">{project.name}</span>
				<span className="text-sm">{project.description}</span>
			</div>
			<div className="hidden flex-1 sm:block" aria-hidden="true">
				<MemoProjectGridEffect project={project} />
			</div>

			{project.repo && (
				<GithubIcon
					focusable="false"
					className="fill-foreground h-8 w-8"
				/>
			)}
		</a>
	);
};

export const NavProjectSkeleton: React.FC = () => {
	return (
		<div
			className={cn(
				"relative flex items-center justify-between overflow-hidden rounded-md transition-shadow sm:h-16",
				"before:via-foreground/10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:to-transparent"
			)}
		>
			<div className="flex flex-1 flex-col space-y-1 p-2 sm:w-fit sm:flex-initial">
				<span className="bg-foreground/10 h-[1lh] w-24 rounded-md text-xl shadow-sm" />
				<span className="bg-foreground/10 h-[1lh] w-48 rounded-md text-sm shadow-sm" />
			</div>

			<span className="bg-foreground/10 mr-4 h-8 w-8 rounded-full" />
		</div>
	);
};
