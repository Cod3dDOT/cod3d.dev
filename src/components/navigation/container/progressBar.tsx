import { memo, useRef } from 'react';

import { useLenis } from '@/lib/lenis';

export const ProgressBar: React.FC = memo(() => {
	const progressBarRef = useRef<HTMLSpanElement>(null);

	useLenis(({ progress }) => {
		const newProgress = -80 + progress * 100;
		progressBarRef.current?.style.setProperty(
			'translate',
			`0% ${newProgress.toString()}%`
		);
	}, []);

	return (
		<span
			className="hidden 2xl:block fixed w-1 z-10 top-0 left-16 h-full bg-foreground/50 rounded-md !mb-0"
			ref={progressBarRef}
		/>
	);
});
