import remarkCallout from "@r4ai/remark-callout";
import React from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeLines from "rehype-highlight-code-lines";
import rehypeKatex from "rehype-katex";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkHeadingId from "remark-heading-id";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
// import matter from "gray-matter";
import { unified } from "unified";
import rehypeSanitize from "rehype-sanitize";

interface Result {
    content: string;
    meta: object;
}

export async function markdownToHtml(markdown: string): Promise<string> {
    // const { data: meta, content } = matter(markdown);

    // 1) HTML string for RSS
    const vfile = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkMath)
        .use(remarkCallout)
        .use(remarkHeadingId, { defaults: true })
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeKatex, { output: "mathml" })
        .use(rehypeHighlight)
        .use(rehypeCodeLines, { showLineNumbers: true })
        .use(rehypeStringify)
        .process(markdown);

    return vfile.toString();
}

export async function markdownToReact(
    markdown: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    components: any
): Promise<React.ReactNode> {
    // const { data: meta, content } = matter(markdown);

    const vfile = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkMath)
        .use(remarkCallout)
        .use(remarkHeadingId, { defaults: true })
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeKatex, { output: "mathml" })
        .use(rehypeHighlight)
        .use(rehypeCodeLines, { showLineNumbers: true })
        .use(rehypeReact, {
            createElement: React.createElement,
            fragment: React.Fragment,
            components: components,
        })
        .process(markdown);

    const r = vfile.result as React.ReactElement<HTMLDivElement>;

    return r.props.children as React.ReactNode;
}
