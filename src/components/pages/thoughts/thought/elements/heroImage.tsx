'use client';

import { useLenis } from '@/lib/lenis';
import { MarkdownImage } from './image';
import { useState } from 'react';
import { remapRange } from '@/lib/utils/math';
import { useWindowSize } from 'react-use';

type HeroImageProps = {
	src: string;
	alt: string;
};

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
	const [progress, setProgress] = useState(0);
	useLenis(({ progress }) => {
		setProgress(remapRange(progress, 0, 0.5, 0, 1));
	}, []);

	const { width } = useWindowSize();
	console.log(width);

	return (
		<div
			className="xl:absolute xl:w-2/3 xl:top-0 2xl:-translate-y-1/2 xl:right-0 xl:rounded-none
            2xl:w-1/2 2xl:top-[50vh]
            -z-10 md:px-10"
			style={{
				opacity: width > 1280 ? 0.5 - progress : 'unset',
				translate: width > 1280 ? `0 ${progress * 50}%` : 'unset'
			}}
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
