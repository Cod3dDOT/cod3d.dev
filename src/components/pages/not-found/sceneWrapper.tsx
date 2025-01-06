'use client';

import dynamic from 'next/dynamic';

export const DynamicNotFoundScene = dynamic(() => import('./scene.tsx'), {
	ssr: false,
	loading: () => <LoadingFallback />
});

const LoadingFallback = () => (
	<span className="text-[300px] text-foreground">404</span>
);
