import Image from 'next/image';

type MarkdownImageProps = {
	src: string;
	alt?: string;
};

export const MarkdownImage: React.FC<MarkdownImageProps> = ({ src, alt }) => {
	return (
		<Image
			src={src}
			alt={alt || ''}
			width={1920}
			height={1080}
			className="m-0 rounded-lg"
		/>
	);
};
