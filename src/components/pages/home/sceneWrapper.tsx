'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicHomeScene = dynamic(
	() => import('./scene').then((mod) => mod.HomeScene),
	{
		ssr: false,
		loading: () => <LoadingFallback />
	}
);

const LoadingFallback = () => (
	<span className="absolute left-[77px] top-1/2 -translate-y-1/2 text-[300px] text-foreground">
		cod3d
	</span>
);

// Main component that handles the dynamic loading
export const HomeSceneWrapper = () => {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<DynamicHomeScene />
		</Suspense>
	);
};
