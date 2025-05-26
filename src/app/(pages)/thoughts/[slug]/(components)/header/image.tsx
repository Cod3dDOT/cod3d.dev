/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "@/lib/utils/cn";
import { imageToData } from "@/lib/utils/image";

export const HeroImage: React.FC<{
	src: string;
	srcDark?: string;
	alt: string;
}> = async ({ alt, src, srcDark }) => {
	const base64Light = await imageToData(src);
	const base64Dark = srcDark ? await imageToData(srcDark) : undefined;

	return (
		<figure className={cn("image-rendering-pixelated !m-0 xl:!my-6")}>
			<picture>
				<img
					src={base64Light}
					alt={alt}
					className={cn(
						"!m-0 aspect-video w-full object-cover md:rounded-lg lg:w-[25vw]",
						srcDark && "dark:hidden"
					)}
				/>
			</picture>
			{srcDark && (
				<picture>
					<img
						src={base64Dark}
						alt={alt}
						className="!m-0 hidden aspect-video w-full object-cover md:rounded-lg xl:w-[25vw] dark:block"
					/>
				</picture>
			)}
			<figcaption className="sr-only text-center md:text-left">
				{alt}
			</figcaption>
		</figure>
	);
};
