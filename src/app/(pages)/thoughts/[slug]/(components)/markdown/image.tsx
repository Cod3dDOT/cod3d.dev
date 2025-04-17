import { cn } from "@/lib/utils/cn";
import type { ComponentProps } from "react";

type MarkdownImageProps = ComponentProps<"img"> & {
	className?: string;
	hideCaption?: boolean;
	allImages: string[];
};

export function findImagePaths(src: ComponentProps<"img">["src"], paths: string[]) {
	if (!src) {
		return { lightImage: undefined, darkImage: undefined };
	}

	const baseName = src.split(".")[0]; // ignore extension

	let lightImage: string | undefined;
	let darkImage: string | undefined;

	for (const path of paths) {
		if (path.includes(`${baseName}_dark`)) {
			darkImage = path;
		} else if (path.includes(baseName)) {
			lightImage = path;
		}

		if (lightImage && darkImage) break;
	}

	return { lightImage, darkImage };
}

export const MarkdownImageFailed: React.FC = () => {
	return (
		<div className="flex aspect-video w-full items-center justify-center rounded-lg bg-container p-4">
			<div>
				<span>This was supposed to be an image. </span>
				<br className="hidden md:block" />
				<span>Oh well.</span>
				<br className="hidden md:block" />
				<span className="hidden md:block">:dev sobbing in the back:</span>
			</div>
			<picture>
				<img
					loading="lazy"
					decoding="async"
					src="/img/togepi-sad.svg"
					alt="Sad Togepi"
					className="m-0 w-20 rounded-lg md:w-72"
				/>
			</picture>
		</div>
	);
};

export const MarkdownImage: React.FC<MarkdownImageProps> = ({
	src,
	alt = "",
	className,
	hideCaption = false,

	allImages,

	width = 1080,
	height = 1080
}) => {
	const { lightImage, darkImage } = findImagePaths(src || "", allImages);

	if (!lightImage || !darkImage) {
		return <MarkdownImageFailed />;
	}

	return (
		<figure className={className}>
			<picture>
				<img
					src={lightImage}
					fetchPriority="low"
					loading="lazy"
					decoding="async"
					alt={alt}
					width={width}
					height={height}
					className="!m-0 max-h-[70vh] object-contain md:rounded-lg dark:hidden"
				/>
			</picture>
			{darkImage && (
				<picture>
					<img
						src={darkImage}
						fetchPriority="low"
						loading="lazy"
						decoding="async"
						alt={alt}
						width={width}
						height={height}
						className="!m-0 hidden max-h-[70vh] object-contain md:rounded-lg dark:block"
					/>
				</picture>
			)}
			<figcaption
				className={cn({ "sr-only": hideCaption }, "text-center md:text-left")}
			>
				{alt}
			</figcaption>
		</figure>
	);
};
