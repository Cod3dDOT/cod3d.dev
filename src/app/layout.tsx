import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { Pixelify_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Transitions, { Animate } from "./components/transitions";
import { Navigation } from "./components/navigation";

import "./styles/globals.css";
import "./styles/grainy.css";
import "./styles/glitch.css";
import Cursor from "./components/cursor";

const NavBlogShowcase = dynamic(() => import("./components/navigation/blog"));
const NavContactsShowcase = dynamic(
    () => import("./components/navigation/contacts")
);
const NavProjectsShowcase = dynamic(
    () => import("./components/navigation/projects")
);

const font = Pixelify_Sans({
    subsets: ["latin"],
    variable: "--font-pixelify",
});

export const metadata: Metadata = {
    title: "cod3d's den",
    description: "Probably trying to hack you. Or sleeping. Or both.",
    creator: "cod3d",
    keywords: "blog, projects, coding",
    robots: "index, follow",
    openGraph: {
        type: "website",
        url: "https://cod3d.dev",
        title: "cod3d's den",
        description: "Probably trying to hack you. Or sleeping. Or both.",
        siteName: "cod3d's den",
        locale: "en_US",
        images: [
            {
                url: "/og.png",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={font.className}>
                <Cursor
                    interactables={[
                        { target: ".cursor", size: "both" },
                        {
                            target: ".cursor-width",
                            size: "width",
                        },
                        {
                            target: ".cursor-height",
                            size: "height",
                            snap: "vertical",
                        },
                    ]}
                    showSystemCursor={false}
                    snap="center"
                />
                <ThemeProvider attribute="class">
                    <Transitions>
                        <Animate>{children}</Animate>
                        <Navigation>
                            <NavBlogShowcase />
                            <NavProjectsShowcase />
                            <NavContactsShowcase />
                        </Navigation>
                    </Transitions>
                </ThemeProvider>
                <svg className="absolute left-0 top-0">
                    <filter id="noiseFilter-dark">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.6"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix
                            in="colorNoise"
                            type="matrix"
                            values="1.0 0.3 0.3 0.0 0.0
                                    0.3 1.0 0.3 0.0 0.0
                                    0.3 0.3 1.0 0.0 0.0
                                    0.0 0.0 0.0 0.1 0.0"
                        />
                        <feComposite
                            operator="in"
                            in2="SourceGraphic"
                            result="monoNoise"
                        />
                        <feBlend
                            in="SourceGraphic"
                            in2="monoNoise"
                            mode="screen"
                        />
                    </filter>
                    <filter id="noiseFilter-light">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.6"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix
                            in="colorNoise"
                            type="matrix"
                            values="1.0 0.3 0.3 0.0 0.0
                                    0.3 1.0 0.3 0.0 0.0
                                    0.3 0.3 1.0 0.0 0.0
                                    0.0 0.0 0.0 0.9 0.0"
                        />
                        <feComposite
                            operator="in"
                            in2="SourceGraphic"
                            result="monoNoise"
                        />
                        <feBlend
                            in="SourceGraphic"
                            in2="monoNoise"
                            mode="screen"
                        />
                    </filter>
                </svg>
            </body>
        </html>
    );
}
