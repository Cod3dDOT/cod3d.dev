import Image from 'next/image';

type HeroImageProps = {
	src: string;
	alt: string;
};

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
	return (
		<figure
			className="xl:absolute xl:w-2/3 xl:top-0 xl:right-0 xl:rounded-none
            2xl:w-1/2
            md:px-10 relative block xl:-z-10 aspect-[3/2] print:hidden"
		>
			<div className="relative overflow-hidden w-full h-full">
				{new Array(5).fill(0).map((_, index) => (
					<span
						key={index + '-markdown-image'}
						className="absolute -inset-y-1 w-[22%] bg-background animate-out ease-in-out-expo slide-out-to-bottom-full fill-mode-forwards duration-2000"
						style={{
							left: `${index * 20}%`,
							animationDelay: `${index * 100}ms`
						}}
					/>
				))}
			</div>

			<Image
				src={src}
				alt={alt}
				width={1000}
				height={1000 * 0.75}
				className="m-0 rounded-lg"
			/>

			<figcaption className="sr-only">{alt}</figcaption>
		</figure>
	);
};
