import remarkCallout from '@r4ai/remark-callout';
import { clsx } from 'clsx';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';
import rehypeKatex from 'rehype-katex';
import remarkFrontmatter from 'remark-frontmatter';
import remarkHeadingId from 'remark-heading-id';
import remarkMath from 'remark-math';

import { TableOfContents } from '../tableOfContents';
import { MarkdownCodeBlock } from './code';
import { findImagePaths, MarkdownImage, MarkdownImageFailed } from './image';

type MarkdownWrapperProps = {
	markdown: string;
	images: string[];
};

export const MarkdownWrapper: React.FC<MarkdownWrapperProps> = ({
	images,
	markdown
}) => {
	return (
		<section
			className={clsx(
				'prose lg:prose-xl prose-neutral prose-amber max-w-none dark:prose-invert',
				'prose-headings:font-light prose-h4:text-[larger]',
				'hover:prose-a:text-blue-500 prose-a:transition-colors',
				'prose-code:before:content-none prose-code:after:content-none prose-code:bg-background-dark prose-code:p-2 prose-code:rounded-md prose-code:border prose-code:border-neutral-700',
				'relative xl:flex md:px-10 md:prose-figure:mx-10'
			)}
		>
			<Markdown
				className="xl:max-w-prose [&>*:not(figure)]:px-10 md:first-letter:text-6xl prose-p:first:!mt-0 py-10"
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
									This was supposed to be an image. Oh well :dev sobbing in the
									back:
								</div>
							);
						const { lightImage, darkImage } = findImagePaths(src, images);
						if (!lightImage) return <MarkdownImageFailed />;
						return (
							<MarkdownImage
								src={lightImage}
								srcDark={darkImage}
								alt={props.alt}
							/>
						);
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
			<div className="hidden xl:block not-prose overflow-hidden sticky -translate-y-1/2 top-1/2 mt-60 left-1/2 translate-x-8 2xl:translate-x-1/2 self-start">
				<TableOfContents />
			</div>
		</section>
	);
};
