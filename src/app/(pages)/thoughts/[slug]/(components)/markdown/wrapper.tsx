/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { markdownToReact } from "@/lib/markdown";
import { cn } from "@/lib/utils/cn";
import dynamic from "next/dynamic";
import { MarkdownCodeBlock, type MarkdownCodeBlockProps } from "./code";
import { MarkdownImage, type MarkdownImageProps } from "./image";

const DynamicToC = dynamic(() =>
	import("../tableOfContents").then((mod) => mod.TableOfContents)
);

type MarkdownWrapperProps = {
	markdown: string;
	images: string[];
};

const components = {
	pre: (props: MarkdownCodeBlockProps) => <MarkdownCodeBlock {...props} />,
	img: (props: MarkdownImageProps) => <MarkdownImage {...props} />
};

export const MarkdownWrapper: React.FC<MarkdownWrapperProps> = async ({
	images,
	markdown
}) => {
	const markdownComponent = await markdownToReact(markdown, images, components);

	return (
		<section className="relative opacity-0 [--delay:500ms] motion-safe:animate-in md:px-10 xl:flex">
			<div
				className={cn(
					"prose lg:prose-xl prose-neutral prose-amber dark:prose-invert max-w-none",
					"prose-headings:font-light prose-h4:text-[larger]",
					"prose-a:transition-colors prose-a:hover:text-accent-blue",
					"prose-pre:bg-transparent prose-pre:text-foreground",
					"prose-inline-code:before:content-none prose-inline-code:after:content-none", // removes `` from inline code blocks
					"not-print:prose-inline-code:mx-1 prose-inline-code:rounded-md not-print:prose-inline-code:bg-container not-print:prose-inline-code:p-1 prose-inline-code:text-[smaller]",
					"md:prose-figure:mx-10",
					"md:first-letter:text-6xl xl:max-w-prose [&>*:not(figure)]:px-10"
				)}
			>
				{markdownComponent}
			</div>
			<div className="-translate-y-1/2 sticky top-1/2 left-1/2 mt-60 hidden translate-x-8 self-start overflow-hidden xl:block 2xl:translate-x-1/2">
				<DynamicToC />
			</div>
		</section>
	);
};
