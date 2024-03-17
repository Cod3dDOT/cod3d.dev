import { pb } from "@/app/lib/pocketbase/config";
import { NavProjectsList } from "./projects";

async function getProjects() {
    return (await pb.collection("projects").getList()).items;
}

export const NavProjectsShowcase: React.FC = async () => {
    const projects = await getProjects();
    return (
        <div>
            <h2 className="text-5xl mb-4">Projects</h2>

            <NavProjectsList projects={projects} />
        </div>
    );
};
