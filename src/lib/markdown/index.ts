import remarkCallout from "@r4ai/remark-callout";
import {
	type ComponentProps,
	Fragment,
	type ReactNode,
	createElement
} from "react";

import { jsxDEV } from "react/jsx-dev-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import rehypeReact from "rehype-react";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkHeadingId from "remark-heading-id";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
// import matter from "gray-matter";
import { unified } from "unified";
import { type RehypeFixesOptions, rehypeFixes } from "./pluginRehypeFixes";

export interface CodeData {
	meta: string;
}

export async function markdownToHtml(
	markdown: string,
	images: string[]
): Promise<string> {
	// const { data: meta, content } = matter(markdown);

	const vfile = await unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkMath)
		.use(remarkCallout)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeKatex, { output: "mathml" })
		.use(rehypeFixes, {
			mode: "RSS",
			markdownImages: images
		} as RehypeFixesOptions)
		.use(rehypeStringify)
		.process(markdown);

	return vfile.toString();
}

export async function markdownToReact(
	markdown: string,
	images: string[],
	components: ComponentProps<typeof rehypeReact>["components"]
): Promise<ReactNode> {
	// const { data: meta, content } = matter(markdown);

	const vfile = await unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkMath)
		.use(remarkCallout)
		.use(remarkHeadingId, { defaults: true })
		.use(remarkRehype)
		// .use(rehypeSanitize)
		.use(rehypeKatex, { output: "mathml" })
		.use(rehypeHighlight)
		.use(rehypeCodeLines, { showLineNumbers: true })
		.use(rehypeFixes, {
			mode: "React",
			markdownImages: images
		})
		.use(rehypeReact, {
			createElement: createElement,
			Fragment: Fragment,
			jsx: jsx,
			jsxs: jsxs,
			jsxDEV: jsxDEV,
			components: components
		})
		.process(markdown);

	return vfile.result;
}
