import Image from 'next/image';

import SadTogepi from '@/../public/togepi-sad.svg';
import clsx from 'clsx';

type MarkdownImageProps = {
	src: string;
	alt?: string;
	className?: string;
};

export const MarkdownImage: React.FC<MarkdownImageProps> = ({
	src,
	alt,
	className
}) => {
	return (
		<div className={clsx('relative overflow-hidden', className)}>
			{new Array(5).fill(0).map((_, index) => (
				<span
					key={index}
					className="absolute -inset-y-1 w-[22%] bg-background animate-out ease-in-out-expo slide-out-to-bottom-full fill-mode-forwards duration-2000"
					style={{ left: `${index * 20}%`, animationDelay: `${index * 100}ms` }}
				/>
			))}
			<Image
				src={src}
				alt={alt || ''}
				width={1920}
				height={1080}
				className="!m-0 md:rounded-lg xl:rounded-none"
			/>
		</div>
	);
};

export const MarkdownImageFailed: React.FC = () => {
	return (
		<div className="p-4 flex w-full aspect-video bg-background-dark rounded-lg items-center justify-center">
			<div>
				<span>This was supposed to be an image. </span>
				<br className="hidden md:block" />
				<span>Oh well.</span>
				<br className="hidden md:block" />
				<span className="hidden md:block">:dev sobbing in the back:</span>
			</div>
			<Image
				src={SadTogepi}
				alt="Sad Togepi"
				className="m-0 rounded-lg w-20 md:w-72"
			/>
		</div>
	);
};
