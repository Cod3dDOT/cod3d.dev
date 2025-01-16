'use client';

import { SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';

import { NavigationProvider } from '@/lib/context/navigationContext';

export const DynamicCanvas = dynamic(
	() =>
		import('@/components/providers/canvas').then((x) => x.GlobalCanvasProvider),
	{
		ssr: false
	}
);

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DynamicCanvas />
			<SmoothScrollbar />
			<ThemeProvider attribute="class">
				<NavigationProvider>{children}</NavigationProvider>
			</ThemeProvider>
		</>
	);
}
