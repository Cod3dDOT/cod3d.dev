import { clsx } from 'clsx';
import { Suspense } from 'react';

import { DynamicNotFoundScene } from '@/components/pages/not-found/sceneWrapper';

const NotFoundPage: React.FC = () => {
	return (
		<div
			className={clsx(
				'flex flex-col mx-auto h-screen overflow-hidden justify-center items-center text-center'
			)}
		>
			<Suspense>
				<DynamicNotFoundScene />
			</Suspense>
		</div>
	);
};

export default NotFoundPage;
