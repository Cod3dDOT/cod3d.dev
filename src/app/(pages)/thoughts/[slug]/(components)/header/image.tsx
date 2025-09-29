/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { imageToData } from "@/lib/utils/image";

export const HeroImage: React.FC<{
	src: string;
	srcDark?: string;
	alt: string;
}> = async ({ alt, src, srcDark }) => {
	const base64Light = await imageToData(src);
	const base64Dark = srcDark ? await imageToData(srcDark) : undefined;

	return (
		<figure className="image-rendering-pixelated relative m-0! xl:my-auto!">
			<picture className={srcDark && "transition-opacity dark:opacity-0"}>
				<img
					src={base64Light}
					alt={alt}
					className="m-0! aspect-video w-full object-cover md:rounded-lg lg:w-[40vw]"
				/>
			</picture>
			{srcDark && (
				<picture className="absolute inset-0 z-10 opacity-0 transition-opacity dark:opacity-100">
					<img
						src={base64Dark}
						alt={alt}
						className="m-0! aspect-video w-full object-cover md:rounded-lg lg:w-[40vw]"
					/>
				</picture>
			)}
			<figcaption className="sr-only text-center md:text-left">
				{alt}
			</figcaption>
		</figure>
	);
};
