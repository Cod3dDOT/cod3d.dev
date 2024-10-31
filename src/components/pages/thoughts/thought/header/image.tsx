import { clsx } from 'clsx';

export const HeroImage: React.FC<{
	src: string;
	srcDark?: string;
	alt: string;
}> = ({ alt, src, srcDark }) => {
	return (
		<figure className={clsx('pixelated !m-0 xl:!my-6')}>
			<img
				fetchPriority="high"
				loading="eager"
				src={src}
				alt={alt}
				className={clsx(
					'!m-0 md:rounded-lg w-full aspect-video object-cover lg:w-[25vw]',
					srcDark && 'dark:hidden'
				)}
			/>
			{srcDark && (
				<img
					fetchPriority="high"
					loading="eager"
					src={srcDark}
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
