import { MarkdownCodeBlock } from './elements/code';
import { MarkdownImage } from './elements/image';

import Markdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSanitize from 'rehype-sanitize';

import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';
import { MarkdownTitle } from './elements/title';

type ThoughtBodyProps = {
	images: string[];
	markdown: string;
};

// <TableOfContents className="not-prose mt-[20rem] sticky top-[50vh] -translate-y-1/2 self-start h-auto" />

export const ThoughtMarkdown: React.FC<ThoughtBodyProps> = async ({
	images,
	markdown
}) => {
	return (
		<Markdown
			components={{
				h1(props) {
					return <MarkdownTitle {...props} />;
				},
				pre(props) {
					return <MarkdownCodeBlock {...props} />;
				},
				img(props) {
					if (!props.src) return <div></div>;
					return <MarkdownImage src={props.src} alt={props.alt} />;
				},
				p(props) {
					const content = props.children?.toString() || '';
					const regex = new RegExp('\\[\\[(.+?)\\]\\]');
					const match = content.match(regex);
					if (match && match?.at(1)) {
						const name = match.at(1) || '';
						const [filename, extension] = name.split('.');
						const url = images.find((url) => url.includes(filename)) || '';
						return <MarkdownImage src={url} alt={content} />;
					}
					return <p>{props.children}</p>;
				}
			}}
			remarkPlugins={[remarkFrontmatter]}
			rehypePlugins={[
				rehypeSanitize,
				rehypeHighlight,
				[
					rehypeHighlightCodeLines,
					{
						showLineNumbers: true
					}
				]
			]}
		>
			{markdown}
		</Markdown>
	);
};
