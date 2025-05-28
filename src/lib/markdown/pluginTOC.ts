/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Element, Root } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export interface HeadingInfo {
	id: string;
	text: string;
	level: number;
}

export interface RehypeCollectHeadingsOptions {
	minDepth?: number;
	maxDepth?: number;
}

export const rehypeCollectHeadings: Plugin<
	[RehypeCollectHeadingsOptions?],
	Root
> = (options = {}) => {
	const { minDepth = 2, maxDepth = 6 } = options;

	return (tree: Root, file: { data: { toc: HeadingInfo[] } }) => {
		const headings: HeadingInfo[] = [];

		visit(tree, "element", (node: Element) => {
			const tag = node.tagName;
			if (/^h[1-6]$/.test(tag)) {
				const level = Number.parseInt(tag[1], 10);
				if (level < minDepth || level > maxDepth) return;

				const text = hastToString(node);
				let id = node.properties?.id?.toString();
				if (!id) {
					id = text.toLowerCase().replace(/\s+/g, "-");
					node.properties = { ...node.properties, id };
				}

				headings.push({ id, text, level });
			}
		});

		// Attach to vfile so you can access it from your processor
		file.data.toc = headings;
	};
};
