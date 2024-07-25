type Props = {
	title: string;
};

export const MarkdownTitle: React.FC<Props> = ({ title }) => {
	const words = title.split(' ');
	const spans = words.map((word, index) => (
		<span
			key={index}
			className="inline-block animate-blog-in opacity-0 fill-mode-forwards"
			style={{ animationDelay: `${500 + index * 100}ms` }}
		>
			{word}
			&nbsp;
		</span>
	));
	// bg-gradient-to-br from-foreground via-foreground to-background bg-clip-text text-transparent
	return (
		<h1 className="px-10 md:px-0 xl:w-2/3 2xl:!text-9xl xl:!text-8xl relative">
			{spans}
		</h1>
	);
};
