import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./styles/globals.css";
import "./styles/grainy.css";
import "./styles/glitch.css";
import { ThemeProvider } from "next-themes";

const font = Pixelify_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "cod3d's den",
    description: "Probably trying to hack you. Or sleepin. Or both.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={font.className}>
                <ThemeProvider attribute="class">{children}</ThemeProvider>
            </body>
        </html>
    );
}
