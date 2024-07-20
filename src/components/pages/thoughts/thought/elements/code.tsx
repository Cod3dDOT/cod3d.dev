import { ClassAttributes, HTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

type Props = ClassAttributes<HTMLPreElement> &
	HTMLAttributes<HTMLPreElement> &
	ExtraProps;

type Data = {
	meta?: string;
};

export const MarkdownCodeBlock: React.FC<Props> = ({ children, node }) => {
	const filename = (node?.children[0].data as Data)?.meta;

	return (
		<figure className="rounded-lg">
			{filename && (
				<figcaption className="px-4 border-b border-neutral-700 !mt-0">
					<p className="text-foreground !my-3 font-mono">{filename}</p>
				</figcaption>
			)}

			<pre>{children}</pre>
		</figure>
	);
};
