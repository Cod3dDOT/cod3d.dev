import Image from 'next/image';
import { CustomElementProps } from '.';

type MarkdownImageProps = {
	src: string;
	alt?: string;
};

export const MarkdownImage: React.FC<MarkdownImageProps> = ({ src, alt }) => {
	return <Image src={src} alt={alt || ''} width={1920} height={1080} />;
};
