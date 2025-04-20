import { cn } from "@/lib/utils/cn";

const asBase64 = async (src: string) => {
	const res = await fetch(src);
	const buffer = await res.arrayBuffer();
	const base64 = Buffer.from(buffer).toString("base64");
	return `data:image/webp;base64,${base64}`;
};

export const HeroImage: React.FC<{
	src: string;
	srcDark?: string;
	alt: string;
}> = async ({ alt, src, srcDark }) => {
	const base64Light = await asBase64(src);
	const base64Dark = srcDark ? await asBase64(srcDark) : undefined;

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
