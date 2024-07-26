import { MarkdownCodeBlock } from './elements/code';
import { MarkdownImage, MarkdownImageFailed } from './elements/image';

import Markdown from 'react-markdown';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkHeadingId from 'remark-heading-id';

import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';

import { MarkdownTitle } from './elements/title';
import { HeroImage } from './elements/heroImage';
import { TableOfContents } from './toc';

type ThoughtBodyProps = {
	title: string;
	description: string;
	hero: string;

	markdown: string;
	images: string[];
};

// <TableOfContents className="not-prose mt-[20rem] sticky top-[50vh] -translate-y-1/2 self-start h-auto" />

export const ThoughtMarkdown: React.FC<ThoughtBodyProps> = async ({
	title,
	description,
	hero,

	images,
	markdown
}) => {
	return (
		<>
			<MarkdownTitle title={title} />
			<p className="px-10">{description}</p>
			<HeroImage src={hero} alt={'Hero image'} />

			<section className="relative xl:flex">
				<Markdown
					className="max-w-prose [&>*:not(figure)]:px-10"
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
							const content = props.children?.toString() || '';
							const regex = new RegExp('\\[\\[(.+?)\\]\\]');
							const match = content.match(regex);
							if (!match || !match?.at(1)) {
								return <p>{props.children}</p>;
							}

							try {
								const name = match.at(1) || '';
								const [filename, extension] = name.split('.');
								const url = images.find((url) => url.includes(filename)) || '';
								return <MarkdownImage src={url} alt={content} />;
							} catch (error) {
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
