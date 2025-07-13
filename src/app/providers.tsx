/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { ThemeProvider } from "next-themes";
import { NavigationProvider } from "@/lib/context/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class">
			<NavigationProvider>{children}</NavigationProvider>
		</ThemeProvider>
	);
}
