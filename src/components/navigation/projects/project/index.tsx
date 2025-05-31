/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Project } from "@pocketbase/types";

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
			aria-label={`Github link to the source code of ${project.name}`}
			rel="noreferrer"
			className="group relative flex items-center overflow-hidden rounded-md transition-shadow hover:shadow-xl focus:shadow-xl sm:h-16"
		>
			<ProjectBadge status={project.status} />
			<div className="flex flex-1 flex-col p-2 sm:w-fit sm:flex-initial">
				<span className="text-2xl">{project.name}</span>
				<span>{project.description}</span>
			</div>
			<div className="hidden flex-1 sm:block" aria-hidden="true">
				<MemoProjectGridEffect project={project} />
			</div>

			{project.repo && (
				<GithubIcon focusable="false" className="h-8 w-8 fill-foreground" />
			)}
		</a>
	);
};

export const NavProjectSkeleton: React.FC = () => {
	return (
		<div
			className={cn(
				"relative flex items-center justify-between overflow-hidden rounded-md transition-shadow sm:h-16",
				"before:-translate-x-full before:absolute before:inset-0 before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent"
			)}
		>
			<div className="flex flex-1 flex-col space-y-1 p-2 sm:w-fit sm:flex-initial">
				<span className="h-[1lh] w-24 rounded-md bg-foreground/10 text-2xl shadow-sm" />
				<span className="h-[1lh] w-48 rounded-md bg-foreground/10 shadow-sm" />
			</div>

			<span className="mr-4 h-8 w-8 rounded-full bg-foreground/10" />
		</div>
	);
};
