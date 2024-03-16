"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { ThemeSwitch } from "../themeSwitch";

type NavigationProps = {
    children?: React.ReactNode;
};

export const Navigation: React.FC<NavigationProps> = ({ children }) => {
    const [opened, setOpened] = useState(false);
    return (
        <div
            className={clsx(
                "z-10 fixed flex transition-transform duration-300 right-0 top-0 h-full backdrop-blur-lg lg:w-1/2 w-full shadow-lg gap-8 pr-8",
                opened ? "translate-x-0" : "translate-x-[calc(100%-4rem)]"
            )}
        >
            <div className="flex flex-col items-center h-full py-8 flex-[0_0_4rem] w-16 shadow-inner">
                <ThemeSwitch className="clickable w-8 h-8" />
                <button
                    className="flex items-center justify-center w-full gap-2 my-auto cursor-none"
                    onClick={() => setOpened(!opened)}
                >
                    <span className="w-1 h-16 bg-[var(--foreground)]" />
                    <span className="w-1 h-16 bg-[var(--foreground)]" />
                </button>
            </div>
            <div className="w-[calc(100%-4rem-2rem)] py-8 space-y-8">
                {children}
            </div>
        </div>
    );
};
