import { pb } from "@/app/lib/pocketbase/config";
import { NavProjectsCarousel } from "./projects";

async function getProjects() {
    return (await pb.collection("projects").getList()).items;
}

export const NavProjectsShowcase: React.FC = async () => {
    const projects = await getProjects();
    return (
        <div>
            <h2 className="text-3xl mb-8">Projects</h2>

            <NavProjectsCarousel projects={projects} />
        </div>
    );
};
