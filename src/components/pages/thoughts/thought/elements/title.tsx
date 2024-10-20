import { MarkdownImage } from './image';

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
			className="inline-block motion-safe:animate-blog-in motion-reduce:animate-blog-in-reduced motion-reduce:!delay-0 opacity-0 fill-mode-forwards"
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
			<MarkdownImage
				priority
				src={hero}
				hideCaption
				alt="Hero image"
				className="relative max-h-[50vh] lg:max-h-full overflow-hidden sm:rounded-lg xl:absolute xl:w-2/3 xl:top-0 xl:left-1/3 xl:right-0 xl:h-full object-cover xl:!m-0 xl:mask-linear xl:mask-dir-to-l"
				sizes="(max-width: 1200px) 100vw, 50vw"
			/>
		</div>
	);
};
