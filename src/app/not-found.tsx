/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "@/lib/utils/cn";

export default function NotFoundPage() {
	return (
		<div
			className={cn(
				"relative mx-auto flex h-screen flex-col items-center justify-center overflow-hidden"
			)}
		>
			<h1 className="flex flex-col text-[8rem] leading-none md:text-[10rem] xl:text-[14rem]">
				<span className="flex flex-col-reverse justify-between lg:flex-row">
					<span>404</span>
					<picture className="image-rendering-pixelated mx-auto my-auto inline-block aspect-square h-48 lg:mx-0 lg:h-full">
						<img
							loading="eager"
							src="/img/sad-togepi.webp"
							className="aspect-square h-full"
							alt="Sad togepi pokemon"
						/>
					</picture>
				</span>
				<span className="sr-only">: </span>
				<span className="text-[2rem] lg:text-[10rem] xl:text-[14rem]">
					Da way?
				</span>
			</h1>
		</div>
	);
}
