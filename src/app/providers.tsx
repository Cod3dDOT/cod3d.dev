"use client";

import { NavigationProvider } from "@/lib/context/navigation";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class">
			<NavigationProvider>{children}</NavigationProvider>
		</ThemeProvider>
	);
}
