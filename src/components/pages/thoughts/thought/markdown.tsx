import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize from 'rehype-sanitize';
import remarkFrontmatter from 'remark-frontmatter';
import remarkHeadingId from 'remark-heading-id';
import remarkMath from 'remark-math';

import { MarkdownCodeBlock } from './elements/code';
import { MarkdownImage, MarkdownImageFailed } from './elements/image';
import { MarkdownTitle } from './elements/title';
import { TableOfContents } from './toc';

type ThoughtBodyProps = {
	title: string;
	description: string;
	hero: string;

	markdown: string;
	images: string[];
};

export const ThoughtMarkdown: React.FC<ThoughtBodyProps> = async ({
	title,
	description,
	hero,

	images,
	markdown
}) => {
	return (
		<>
			<MarkdownTitle title={title} hero={hero} description={description} />

			<section className="relative xl:flex">
				<Markdown
					className="max-w-prose [&>*:not(figure)]:px-10 md:first-letter:text-6xl"
					components={{
						pre(props) {
							return <MarkdownCodeBlock {...props} />;
						},
						img(props) {
							if (!props.src)
								return (
									<div className="flex w-full aspect-video">
										This was supposed to be an image. Oh well :dev sobbing in
										the back:
									</div>
								);
							return <MarkdownImage src={props.src} alt={props.alt} />;
						},
						p(props) {
							if (!props.children) return <></>;
							const content = props.children.toString() || '';
							const regex = new RegExp('\\[\\[(.+?)\\]\\]');
							const match = content.match(regex);
							if (!match || !match?.at(1)) {
								return <p>{props.children}</p>;
							}

							try {
								const name = match.at(1) || '';
								const [filename] = name.split('.');
								const url = images.find((url) => url.includes(filename)) || '';
								return <MarkdownImage src={url} alt={content} />;
							} catch {
								return <MarkdownImageFailed />;
							}
						}
					}}
					remarkPlugins={[
						remarkFrontmatter,
						remarkMath,
						[remarkHeadingId, { defaults: true }]
					]}
					rehypePlugins={[
						rehypeSanitize,
						[rehypeKatex, { output: 'mathml' }],
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

				<TableOfContents markdown={markdown} />
			</section>
		</>
	);
};
