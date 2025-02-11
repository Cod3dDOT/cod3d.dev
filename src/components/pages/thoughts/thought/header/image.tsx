import { clsx } from 'clsx';

const asBase64 = async (src: string) => {
	const res = await fetch(new URL(src, 'https://cod3d.dev'));
	const buffer = await res.arrayBuffer();
	const base64 = Buffer.from(buffer).toString('base64');
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
		<figure className={clsx('image-rendering-pixelated !m-0 xl:!my-6')}>
			<img
				src={base64Light}
				alt={alt}
				className={clsx(
					'!m-0 md:rounded-lg w-full aspect-video object-cover lg:w-[25vw]',
					srcDark && 'dark:hidden'
				)}
			/>
			{srcDark && (
				<img
					src={base64Dark}
					alt={alt}
					className="!m-0 md:rounded-lg w-full aspect-video hidden dark:block object-cover xl:w-[25vw]"
				/>
			)}
			<figcaption className="sr-only text-center md:text-left">
				{alt}
			</figcaption>
		</figure>
	);
};
