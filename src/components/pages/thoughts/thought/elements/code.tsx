import 'highlight.js/styles/atom-one-dark.css';
import { CustomElementProps } from '.';

type Data = {
	meta?: string;
};

export const MarkdownCodeBlock: React.FC<CustomElementProps> = ({
	children,
	node
}) => {
	const filename = (node?.children[0].data as Data)?.meta;

	return (
		<figure>
			{filename && (
				<figcaption className="px-4 bg-background-dark border border-neutral-700 rounded-t-lg">
					<p className="text-foreground !my-3 font-mono">{filename}</p>
				</figcaption>
			)}

			<pre className="border border-neutral-700">{children}</pre>
		</figure>
	);
};
