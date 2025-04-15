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
		<section className="motion-safe:animate-in relative opacity-0 [--delay:500ms] md:px-10 xl:flex">
			<div
				className={cn(
					"prose lg:prose-xl prose-neutral prose-amber dark:prose-invert max-w-none",
					"prose-headings:font-light prose-h4:text-[larger]",
					"prose-a:hover:text-accent-blue prose-a:transition-colors",
					"prose-pre:bg-transparent prose-pre:text-foreground",
					"prose-inline-code:before:content-none prose-inline-code:after:content-none", // removes `` from inline code blocks
					"not-print:prose-inline-code:bg-container not-print:prose-inline-code:p-1 not-print:prose-inline-code:mx-1 prose-inline-code:rounded-md",
					"md:prose-figure:mx-10",
					"md:first-letter:text-6xl xl:max-w-prose [&>*:not(figure)]:px-10"
				)}
			>
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

							const child = props.node?.children[0];
							if (
								child?.type === "element" &&
								child?.tagName === "img"
							) {
								return <>{props.children}</>;
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
			<div className="sticky top-1/2 left-1/2 mt-60 hidden translate-x-8 -translate-y-1/2 self-start overflow-hidden xl:block 2xl:translate-x-1/2">
				<TableOfContents />
			</div>
		</section>
	);
};
