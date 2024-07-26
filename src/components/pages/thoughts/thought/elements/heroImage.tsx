'use client';

import { useLenis } from '@/lib/lenis';
import { useState } from 'react';
import { remapRange } from '@/lib/utils/math';
import { useWindowSize } from 'react-use';
import Image from 'next/image';

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

	return (
		<div
			className="print:hidden xl:absolute xl:w-2/3 xl:top-0 2xl:-translate-y-1/2 xl:right-0 xl:rounded-none
            2xl:w-1/2 2xl:top-[50vh]
            -z-10 md:px-10"
			style={{
				opacity: width > 1280 ? 0.5 - progress : 'unset',
				translate: width > 1280 ? `0 ${progress * 50}%` : 'unset'
			}}
		>
			<figure className="relative overflow-hidden w-full h-full">
				{new Array(5).fill(0).map((_, index) => (
					<span
						key={index + '-markdown-image'}
						className="absolute -inset-y-1 w-[22%] bg-background animate-out ease-in-out-expo slide-out-to-bottom-full fill-mode-forwards duration-2000"
						style={{
							left: `${index * 20}%`,
							animationDelay: `${index * 100}ms`
						}}
					/>
				))}
				<Image
					priority
					alt={alt}
					src={src}
					width={1920}
					height={1080}
					className="!m-0 md:rounded-lg xl:rounded-none"
				/>
				<figcaption className="sr-only">{alt}</figcaption>
			</figure>
		</div>
	);
};
