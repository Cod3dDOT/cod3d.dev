import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { Pixelify_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Transitions, { Animate } from "./components/transitions";
import { Navigation } from "./components/navigation";

import "./styles/globals.css";
import "./styles/grainy.css";
import "./styles/glitch.css";

const NavBlogShowcase = dynamic(() => import("./components/navigation/blog"));
const NavContactsShowcase = dynamic(
    () => import("./components/navigation/contacts")
);
const NavProjectsShowcase = dynamic(
    () => import("./components/navigation/projects")
);

const Cursor = dynamic(() => import("./components/cursor"));

const font = Pixelify_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "cod3d's den",
    description: "Probably trying to hack you. Or sleeping. Or both.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={font.className}>
                <Cursor showSystemCursor={false} />
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
            </body>
        </html>
    );
}
