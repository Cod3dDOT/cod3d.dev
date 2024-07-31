import Image from 'next/image';

type Props = {
	title: string;
	hero: string;
	description: string;
};

export const MarkdownTitle: React.FC<Props> = ({
	title,
	hero,
	description
}) => {
	const words = title.split(' ');
	const spans = words.map((word, index) => (
		<span
			key={index + '-markdown-title'}
			className="inline-block animate-blog-in opacity-0 fill-mode-forwards"
			style={{ animationDelay: `${500 + index * 100}ms` }}
		>
			{word}
			&nbsp;
		</span>
	));
	// bg-gradient-to-br from-foreground via-foreground to-background bg-clip-text text-transparent
	return (
		<div className="relative my-8 xl:pt-16">
			<h1 className="2xl:!text-9xl xl:!text-8xl xl:w-2/3 !m-0 px-10 xl:px-0 xl:pb-10">
				{spans}
			</h1>
			<p className="px-10 xl:pb-12">{description}</p>
			<Image
				src={hero}
				alt="Hero image"
				width={1920}
				height={1080}
				className="relative sm:rounded-lg xl:absolute xl:w-2/3 xl:top-0 xl:left-1/3 xl:right-0 h-full object-cover xl:!m-0 xl:mask-linear xl:mask-dir-to-l"
			/>
		</div>
	);
};
