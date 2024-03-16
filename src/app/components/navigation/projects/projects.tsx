import { getFileUrl } from "@/app/lib/pocketbase/config";
import { Project } from "@/app/lib/pocketbase/types";
import Image from "next/image";

type NavProjectsCarouselProps = {
    projects: Project[];
};

export const NavProjectsCarousel: React.FC<NavProjectsCarouselProps> = ({
    projects,
}) => {
    return (
        <div>
            {projects.map((project) => {
                return <NavProject project={project} key={project.id} />;
            })}
        </div>
    );
};

const NavProject: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="relative flex h-16 items-center overflow-hidden group">
            <span
                className="h-full w-0 transition-all group-hover:w-2"
                style={{ backgroundColor: project.color }}
            />
            <div className="flex flex-col flex-1 p-2">
                <span className="text-base">{project.name}</span>
                <span className="text-sm">{project.shortDescription}</span>
            </div>
            <Image
                width={720}
                height={480}
                src={getFileUrl(project, project.images[0])}
                alt={project.name + " hero image"}
                className="object-contain h-full w-auto p-2 aspect-square"
            />
        </div>
    );
};
