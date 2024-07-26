'use client';

import { useLenis } from '@/lib/lenis';
import { MarkdownImage } from './image';
import { useState } from 'react';
import { remapRange } from '@/lib/utils/math';

type HeroImageProps = {
	src: string;
	alt: string;
};

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
	const [progress, setProgress] = useState(0);
	useLenis(({ progress }) => {
		setProgress(remapRange(progress, 0, 0.5, 0, 1));
	}, []);

	return (
		<div
			className="xl:absolute xl:w-2/3 xl:opacity-50 xl:top-0 2xl:-translate-y-1/2 xl:right-0 xl:rounded-none
            2xl:w-1/2 2xl:top-[50vh]
            -z-10 md:px-10"
			style={{ opacity: 0.5 - progress, translate: `0 ${progress * 50}%` }}
		>
			<MarkdownImage
				src={src}
				alt={alt}
				className="w-full h-full"
				hideCaption
			/>
		</div>
	);
};
