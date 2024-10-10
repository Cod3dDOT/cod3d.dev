import clsx from 'clsx';
import Image from 'next/image';

import SadTogepi from '@/../public/img/togepi-sad.svg';

type MarkdownImageProps = {
	src: string;
	alt?: string;
	className?: string;
	hideCaption?: boolean;
	priority?: boolean;
	sizes?: string;
};

export const MarkdownImage: React.FC<MarkdownImageProps> = ({
	src,
	alt,
	className,
	hideCaption = false,
	priority = false,
	sizes = '100vw'
}) => {
	return (
		<figure className={className}>
			<Image
				priority={priority}
				src={src}
				alt={alt || ''}
				width={1920}
				height={1080}
				quality={100}
				sizes={sizes}
				className="!m-0 md:rounded-lg xl:rounded-none"
			/>
			<figcaption className={clsx({ 'sr-only': hideCaption })}>
				{alt}
			</figcaption>
		</figure>
	);
};

export const MarkdownImageFailed: React.FC = () => {
	return (
		<div className="p-4 flex w-full aspect-video bg-background-dark rounded-lg items-center justify-center">
			<div>
				<span>This was supposed to be an image. </span>
				<br className="hidden md:block" />
				<span>Oh well.</span>
				<br className="hidden md:block" />
				<span className="hidden md:block">:dev sobbing in the back:</span>
			</div>
			<Image
				src={SadTogepi}
				alt="Sad Togepi"
				className="m-0 rounded-lg w-20 md:w-72"
			/>
		</div>
	);
};
