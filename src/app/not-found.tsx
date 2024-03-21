import { clsx } from 'clsx';

import { GlitchText } from '@/components/glitchText';

const NotFoundPage: React.FC = () => {
	return (
		<>
			<div
				className={clsx(
					'flex flex-col mx-auto h-screen overflow-hidden justify-center items-center text-center'
				)}
			>
				<GlitchText
					as="h1"
					text="4 0 4"
					className="xl:text-[50vh] sm:text-[30vw] text-9xl font-semibold break-all mb-16 w-16 sm:w-full"
				/>
				<p className="w-1/2">
					Be careful when looking for something that never existed
				</p>
			</div>
		</>
	);
};

export default NotFoundPage;
