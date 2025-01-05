'use client';

import dynamic from 'next/dynamic';

export const DynamicHomeScene = dynamic(() => import('./scene'), {
	ssr: false,
	loading: () => <LoadingFallback />
});

const LoadingFallback = () => (
	<span className="absolute left-[77px] top-1/2 -translate-y-1/2 text-[300px] text-foreground">
		cod3d
	</span>
);
