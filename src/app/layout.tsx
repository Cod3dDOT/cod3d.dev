import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles/globals.css";
import "./styles/grainy.css";
import "./styles/glitch.css";
import { ThemeProvider } from "next-themes";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "400", "800"],
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
