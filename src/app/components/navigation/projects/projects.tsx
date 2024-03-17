"use client";

import { getFileUrl } from "@/app/lib/pocketbase/config";
import { Project } from "@/app/lib/pocketbase/types";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavProjectsListProps = {
    projects: Project[];
};

export const NavProjectsList: React.FC<NavProjectsListProps> = ({
    projects,
}) => {
    const pathname = usePathname();
    return (
        <div>
            {projects.map((project) => {
                return (
                    <NavProject
                        project={project}
                        key={project.id}
                        pathname={pathname}
                    />
                );
            })}
        </div>
    );
};

const NavProject: React.FC<{ project: Project; pathname: string }> = ({
    project,
    pathname,
}) => {
    const path = `/projects/${project.name}`;
    return (
        <Link
            href={path}
            className="cursor-height relative flex h-16 items-center overflow-hidden group transition-all rounded-md hover:shadow-xl"
        >
            <span
                className={clsx(
                    "h-full w-0 transition-all group-hover:w-2 group-hover:mr-2",
                    pathname == path && "w-2 mr-2"
                )}
                style={{ backgroundColor: project.color }}
            />
            <div className="flex flex-col flex-1 py-2">
                <span className="text-xl">{project.name}</span>
                <span className="text-sm">{project.shortDescription}</span>
            </div>
            <Image
                width={720}
                height={480}
                src={getFileUrl(project, project.images[0])}
                alt={project.name + " hero image"}
                className="object-contain h-full w-auto p-2 aspect-square"
            />
        </Link>
    );
};
