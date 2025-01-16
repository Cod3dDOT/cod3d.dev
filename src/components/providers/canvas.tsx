'use client';

import { GlobalCanvas } from '@14islands/r3f-scroll-rig';
import { Suspense } from 'react';

export function GlobalCanvasProvider() {
	return (
		<GlobalCanvas globalRender={false} scaleMultiplier={1} frameloop="demand">
			{(globalChildren) => (
				<Suspense fallback={null}>{globalChildren}</Suspense>
			)}
		</GlobalCanvas>
	);
}
