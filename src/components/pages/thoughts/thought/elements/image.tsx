import clsx from 'clsx';
import Image from 'next/image';

type MarkdownImageProps = {
	src: string;
	srcDark?: string;
	alt?: string;
	className?: string;
	hideCaption?: boolean;
	priority?: boolean;
	sizes?: string;
};

export function findImagePaths(imageName: string, paths: string[]) {
	// Extract the base name (without extension) from the input image name
	const baseName = imageName.split('.')[0]; // "something"

	// Initialize variables to store the found paths
	let lightImage: string | undefined;
	let darkImage: string | undefined;

	// Search through the paths for matching light and dark images
	for (const path of paths) {
		if (path.includes(`${baseName}_dark`)) {
			darkImage = path;
		} else if (path.includes(baseName)) {
			lightImage = path;
		}

		// Break early if both images are found
		if (lightImage && darkImage) break;
	}

	// Return the found paths or null if not found
	return { lightImage, darkImage };
}

export const MarkdownImage: React.FC<MarkdownImageProps> = ({
	src,
	srcDark,
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
				className="!m-0 md:rounded-lg object-contain dark:hidden"
			/>
			{srcDark && (
				<Image
					priority={priority}
					src={srcDark}
					alt={alt || ''}
					width={1920}
					height={1080}
					quality={100}
					sizes={sizes}
					className="!m-0 md:rounded-lg object-contain dark:block hidden"
				/>
			)}
			<figcaption
				className={clsx({ 'sr-only': hideCaption }, 'text-center md:text-left')}
			>
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
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				loading="lazy"
				src="/img/togepi-sad.svg"
				alt="Sad Togepi"
				className="m-0 rounded-lg w-20 md:w-72"
			/>
		</div>
	);
};
