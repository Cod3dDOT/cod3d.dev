import { Project } from "@/app/lib/pocketbase/types";
import GithubIcon from "../../icons/github";
import { ProjectBadge } from "./badge";

export const NavProject: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="relative flex sm:h-16 items-center overflow-hidden group transition-all rounded-md hover:shadow-xl">
            <ProjectBadge status={project.status} />
            <div className="flex flex-col flex-1 sm:pl-2 p-2 pl-0">
                <span className="text-xl">{project.name}</span>
                <span className="text-sm">{project.description}</span>
            </div>
            {project.repo && (
                <a
                    href={String(project.repo)}
                    className="cursor h-full transition-all lg:w-0 lg:mr-0 mr-2 lg:group-hover:w-14 sm:group-hover:ml-2 flex justify-center items-center overflow-hidden"
                >
                    <GithubIcon className="h-full aspect-square fill-[var(--foreground)]" />
                </a>
            )}
        </div>
    );
};
