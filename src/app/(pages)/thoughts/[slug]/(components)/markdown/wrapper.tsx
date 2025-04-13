import { JSX } from "react";
import remarkCallout from "@r4ai/remark-callout";
import Markdown, { ExtraProps } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import remarkFrontmatter from "remark-frontmatter";
import remarkHeadingId from "remark-heading-id";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils/cn";
import { TableOfContents } from "../tableOfContents";
import { MarkdownCodeBlock } from "./code";
import { MarkdownImage } from "./image";

type MarkdownWrapperProps = {
	markdown: string;
	images: string[];
};

export const MarkdownWrapper: React.FC<MarkdownWrapperProps> = ({
	images,
	markdown,
}) => {
	return (
		<section
			className={cn(
				"prose lg:prose-xl prose-neutral prose-amber dark:prose-invert max-w-none",
				"prose-headings:font-light prose-h4:text-[larger]",
				"hover:prose-a:text-blue-500 prose-a:transition-colors",
				"prose-code:before:content-none prose-code:after:content-none prose-code:bg-container prose-code:p-2 prose-code:rounded-md prose-code:border prose-code:border-neutral-700",
				"md:prose-figure:mx-10 relative md:px-10 xl:flex"
			)}
		>
			<div className="prose-p:first:!mt-0 py-10 md:first-letter:text-6xl xl:max-w-prose [&>*:not(figure)]:px-10">
				<Markdown
					components={{
						h1() {
							return <></>;
						},
						pre(props: JSX.IntrinsicElements["pre"] & ExtraProps) {
							return <MarkdownCodeBlock {...props} />;
						},
						img(props: JSX.IntrinsicElements["img"] & ExtraProps) {
							const src = props.src;

							return (
								<MarkdownImage
									src={src}
									allImages={images}
									alt={props.alt}
								/>
							);
						},
						p(props: JSX.IntrinsicElements["p"] & ExtraProps) {
							if (!props.children) return <></>;

							const type = props.node?.children[0].type;
							if (type === "element") {
								if (props.node?.children[0].tagName === "img") {
									return <>{props.children}</>;
								}
							}
							return <p>{props.children}</p>;
						},
					}}
					remarkPlugins={[
						remarkFrontmatter,
						remarkMath,
						remarkCallout,
						[remarkHeadingId, { defaults: true }],
					]}
					rehypePlugins={[
						[rehypeKatex, { output: "mathml" }],
						rehypeHighlight,
						[
							rehypeHighlightCodeLines,
							{
								showLineNumbers: true,
							},
						],
					]}
				>
					{markdown}
				</Markdown>
			</div>
			<div className="not-prose sticky top-1/2 left-1/2 mt-60 hidden translate-x-8 -translate-y-1/2 self-start overflow-hidden xl:block 2xl:translate-x-1/2">
				<TableOfContents />
			</div>
		</section>
	);
};
