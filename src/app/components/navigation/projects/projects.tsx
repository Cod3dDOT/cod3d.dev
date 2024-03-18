import { Project } from "@/app/lib/pocketbase/types";
import { NavProject } from "./project";

type NavProjectsListProps = {
    projects: Project[];
};

export const NavProjectsList: React.FC<NavProjectsListProps> = ({
    projects,
}) => {
    return (
        <div className="space-y-2">
            {projects.map((project) => {
                return <NavProject project={project} key={project.id} />;
            })}
        </div>
    );
};
