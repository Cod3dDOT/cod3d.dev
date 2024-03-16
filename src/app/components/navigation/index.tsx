"use client";

import clsx from "clsx";
import { useState } from "react";
import { NavProjectsShowcase } from "./projects";
import { ThemeSwitchRef } from "../themeSwitch";

type NavigationProps = {
    className?: string;
};

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
    const [opened, setOpened] = useState(false);
    return (
        <div
            className={clsx(
                "fixed flex transition-transform right-0 top-0 h-full backdrop-blur-lg w-1/2 shadow-lg",
                opened ? "translate-x-0" : "translate-x-[calc(100%-4rem)]"
            )}
        >
            <div className="flex flex-col h-full py-8">
                <ThemeSwitchRef className="clickable mx-auto w-8 h-8" />
                <button
                    className="flex items-center justify-center w-16 gap-2 my-auto"
                    onClick={() => setOpened(!opened)}
                >
                    <span className="w-1 h-16 bg-[var(--foreground)]" />
                    <span className="w-1 h-16 bg-[var(--foreground)]" />
                </button>
            </div>
            <div className="flex flex-col p-24">
                <NavProjectsShowcase />
            </div>
        </div>
    );
};
