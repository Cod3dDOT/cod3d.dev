import Placeholder from "@/../public/placeholder.png";
import Image from "next/image";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

export const NavProjectsShowcase = () => {
    return (
        <div>
            <h2 className="text-3xl mb-8">Projects</h2>
            <div className="w-full flex overflow-auto">
                <NavProject />
                <NavProject />
                <NavProject />
                <NavProject />
                <NavProject />
            </div>
        </div>
    );
};

const NavProject = () => {
    return (
        <div className="w-72">
            <span className="text-xl">Project 1</span>
            <LinkPreview
                url="https://www.npmjs.com/package/@dhaiwat10/react-link-preview"
                width="400px"
            />
        </div>
    );
};
