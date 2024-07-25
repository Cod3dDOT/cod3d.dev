import Image from 'next/image';
import { MarkdownImage } from './image';

type HeroImageProps = {
	src: string;
	alt: string;
};

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
	return (
		<div
			className="xl:absolute xl:w-2/3 xl:opacity-50 xl:aspect-video xl:top-[30vh] xl:-translate-y-1/2 xl:right-0 xl:rounded-none
            2xl:w-1/2 2xl:top-[50vh]
            -z-10 rounded-lg"
		>
			<MarkdownImage src={src} alt={alt} className="w-full h-full" />
		</div>
	);
};
