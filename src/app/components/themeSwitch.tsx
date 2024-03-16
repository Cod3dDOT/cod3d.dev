"use client";

import { useTheme } from "next-themes";

interface ThemeSwitchProps {
    className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
    className,
}: ThemeSwitchProps) => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}
            className={`aspect-square rounded-full touch-manipulation ${className}`}
            aria-label="Theme switch"
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable={false}>
                <mask className="origin-center" id="moon-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <circle
                        cx="24"
                        cy="10"
                        r="6"
                        className="transition-[cx] origin-center duration-250
                            dark:[cx:17] dark:delay-[250ms] dark:duration-500 dark:translate-x-0 dark:translate-y-0"
                    />
                </mask>
                <circle
                    className="transition-all origin-center peer duration-500 fill-black hover:fill-[var(--foreground)]
                                dark:scale-[1.75] dark:duration-[250ms] dark:fill-gray-300 dark:hover:fill-white"
                    cx="12"
                    cy="12"
                    r="6"
                    mask="url(#moon-mask)"
                />
                <g
                    className="transition-all origin-center stroke-2 [stroke-linecap:round] duration-500 stroke-black peer-hover:stroke-[var(--foreground)]
                    dark:-rotate-45 dark:duration-150 dark:opacity-0 dark:stroke-white"
                >
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
            </svg>
        </button>
    );
};
