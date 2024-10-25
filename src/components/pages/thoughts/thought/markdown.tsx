import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';
import rehypeKatex from 'rehype-katex';
import remarkFrontmatter from 'remark-frontmatter';
import remarkHeadingId from 'remark-heading-id';
import remarkMath from 'remark-math';
import remarkCallout from '@r4ai/remark-callout';

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
						h1() {
							return <></>;
						},
						pre(props) {
							return <MarkdownCodeBlock {...props} />;
						},
						img(props) {
							const src = props.src;
							if (!src || src === '')
								return (
									<div className="flex w-full aspect-video">
										This was supposed to be an image. Oh well :dev sobbing in
										the back:
									</div>
								);
							const url = images.find((image) =>
								image.includes(src.split('.')[0])
							);
							if (!url) return <MarkdownImageFailed />;
							return <MarkdownImage src={url} alt={props.alt} />;
						},
						p(props) {
							if (!props.children) return <></>;

							const type = props.node?.children[0].type;
							if (type === 'element') {
								if (props.node?.children[0].tagName === 'img') {
									return <>{props.children}</>;
								}
							}
							return <p>{props.children}</p>;
						}
					}}
					remarkPlugins={[
						remarkFrontmatter,
						remarkMath,
						remarkCallout,
						[remarkHeadingId, { defaults: true }]
					]}
					rehypePlugins={[
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
				<div className="hidden xl:block not-prose overflow-hidden sticky -translate-y-1/2 top-1/2 left-1/2 translate-x-8 2xl:translate-x-1/2 mt-60 self-start">
					<TableOfContents markdown={markdown} />
				</div>
			</section>
		</>
	);
};
