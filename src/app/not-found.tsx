import { clsx } from 'clsx';

import { NotFound404WebGL } from '@/components/pages/not-found/scene';

const NotFoundPage: React.FC = () => {
	return (
		<div
			className={clsx(
				'flex flex-col mx-auto h-screen overflow-hidden justify-center items-center text-center'
			)}
		>
			<NotFound404WebGL />
		</div>
	);
};

export default NotFoundPage;
