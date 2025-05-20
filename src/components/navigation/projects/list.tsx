/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getProjects } from "@pocketbase/req";
import type { Project } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";

import { NavProject, NavProjectSkeleton } from "./project";

export const NavProjectsList: React.FC = async () => {
	const projectResponse = await getProjects(1, 3);
	if (isError(projectResponse)) {
		return <p>Error: {projectResponse.message}</p>;
	}

	const projects = projectResponse as Project[];

	return (
		<div className="space-y-2">
			{projects.map((project) => {
				return (
					<NavProject project={project} key={`nav-project-${project.id}`} />
				);
			})}
		</div>
	);
};

export const NavProjectsListSkeleton: React.FC = () => {
	return (
		<div className="space-y-2">
			{[1, 2, 3].map((project) => {
				return <NavProjectSkeleton key={`nav-skeleton-project-${project}`} />;
			})}
		</div>
	);
};
