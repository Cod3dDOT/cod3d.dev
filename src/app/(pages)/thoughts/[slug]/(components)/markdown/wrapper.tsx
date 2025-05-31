/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { markdownToReact } from "@/lib/markdown";
import { cn } from "@/lib/utils/cn";
import dynamic from "next/dynamic";
import { MobileTOC } from "../toc/mobile";
import { MarkdownCodeBlock, type MarkdownCodeBlockProps } from "./code";
import { MarkdownImage, type MarkdownImageProps } from "./image";

const DynamicDesktopTOC = dynamic(() =>
	import("../toc/desktop").then((mod) => mod.TableOfContents)
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
	const { markdown: markdownComponent, headings } = await markdownToReact(
		markdown,
		images,
		components
	);

	return (
		<section className="relative opacity-0 [--delay:500ms] motion-safe:animate-in md:px-10 xl:flex">
			<div className="relative mx-10 mb-10 overflow-hidden lg:hidden">
				<MobileTOC headings={headings} />
				<span className="-translate-y-1/2 -space-y-3 absolute top-1/2 right-0 flex flex-col items-center font-bold font-pixelify text-[5.5rem] leading-none opacity-20">
					<span>T</span>
					<span>O</span>
					<span>C</span>
				</span>
			</div>
			<div
				className={cn(
					"prose lg:prose-xl prose-neutral dark:prose-invert max-w-none",
					"prose-a:text-accent-blue dark:prose-a:text-accent-yellow",
					"prose-headings:font-light prose-h4:text-[larger]",
					"prose-a:transition-colors prose-a:hover:text-accent-blue",
					"prose-pre:text-foreground",
					"prose-inline-code:before:content-none prose-inline-code:after:content-none", // removes `` from inline code blocks
					"not-print:prose-inline-code:mx-1 prose-inline-code:rounded-md not-print:prose-inline-code:bg-container not-print:prose-inline-code:p-1 prose-inline-code:text-[smaller]",
					"md:prose-figure:mx-10",
					"md:first-letter:text-6xl xl:max-w-prose [&>*:not(figure)]:px-10"
				)}
			>
				{markdownComponent}
			</div>
			<div className="-translate-y-1/2 sticky top-1/2 left-1/2 mt-60 hidden translate-x-8 self-start overflow-hidden xl:block 2xl:translate-x-1/2">
				<DynamicDesktopTOC />
			</div>
		</section>
	);
};
