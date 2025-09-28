/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export type MarkdownImageProps = ComponentProps<"img"> & {
	className?: string;
	"data-dark-src"?: string;
};

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
					src="/img/sad-togepi.webp"
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

	width = 1080,
	height = 1080,

	"data-dark-src": darkSrc = ""
}) => {
	return (
		<figure className={cn("relative", className)}>
			<picture>
				<img
					src={src}
					fetchPriority="low"
					loading="lazy"
					decoding="async"
					alt={alt}
					width={width}
					height={height}
					className="m-0! max-h-[70vh] object-contain"
				/>
			</picture>
			{darkSrc && (
				<picture className="absolute inset-0 opacity-0 transition-opacity dark:opacity-100">
					<img
						src={darkSrc}
						fetchPriority="low"
						loading="lazy"
						decoding="async"
						alt={alt}
						width={width}
						height={height}
						className="m-0! max-h-[70vh] object-contain md:rounded-lg"
					/>
				</picture>
			)}
			<figcaption className={"text-center md:text-left"}>{alt}</figcaption>
		</figure>
	);
};
