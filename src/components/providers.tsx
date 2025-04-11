"use client";

import { ThemeProvider } from "next-themes";

import { NavigationProvider } from "@/lib/context/navigationContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class">
			<NavigationProvider>{children}</NavigationProvider>
		</ThemeProvider>
	);
}
