/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Element, Parent, Root } from "hast";
import type { Plugin } from "unified";
import { remove } from "unist-util-remove";
import { SKIP, type VisitorResult, visit } from "unist-util-visit";

export interface RehypeFixesOptions {
	mode: "RSS" | "React";
	markdownImages: string[];
}

export function findImageVariants(
	src: string | undefined,
	paths: string[]
): { light?: string; dark?: string } {
	if (!src) return {};

	const baseName = src.split(".")[0];
	const name = baseName.replace(/_light|_dark$/, ""); // normalize if named already

	let light: string | undefined;
	let dark: string | undefined;

	for (const path of paths) {
		if (path.includes(name)) {
			if (/[_-]dark/i.test(path)) {
				// since images are exposed to the public,
				// hide the host url using rewrites (check next.config.ts)
				dark = path.replace(
					`https://${process.env.POCKETBASE_HOST}`,
					process.env.SITE_URL
				);
			} else {
				light = path.replace(
					`https://${process.env.POCKETBASE_HOST}`,
					process.env.SITE_URL
				);
			}
		}
	}

	return { light, dark };
}

const imageVisitor = (
	node: Element,
	options: RehypeFixesOptions
): VisitorResult => {
	const src = node.properties.src?.toString();
	const { light, dark } = findImageVariants(src, options.markdownImages);

	if (light) {
		node.properties.src = light;
	}

	if (dark) {
		node.properties["data-dark-src"] = dark;
	}
};

const paragraphVisitor = (
	node: Element,
	index: number | undefined,
	parent: Parent | undefined,
	_options: RehypeFixesOptions
): VisitorResult => {
	if (index === undefined || parent === undefined) return;

	if (
		node.children.length === 1 &&
		node.children[0].type === "element" &&
		node.children[0].tagName === "img"
	) {
		if (parent && Array.isArray(parent.children)) {
			parent.children[index] = node.children[0];
		}
		return SKIP;
	}
};

const chopOffMeta = (ast: Root) => {
	const children = ast.children;
	const index = children.findIndex(
		(node) => node.type === "element" && node.tagName === "hr"
	);

	if (index !== -1) {
		// Remove everything up to and including the <hr>
		ast.children = children.slice(index + 1);
	}
};

export const rehypeFixes: Plugin<RehypeFixesOptions[], Root> = (options) => {
	return (ast: Root) => {
		// remove everything before the first horizontal divider
		chopOffMeta(ast);

		visit(ast, "element", (node, index, parent) => {
			switch (node.tagName) {
				case "p":
					// fix img in <p></p> tags, which is invalid html
					paragraphVisitor(node, index, parent as Parent, options);
					break;
				case "img":
					// transform local markdown images to proper paths
					imageVisitor(node, options);
					break;
				case "code":
					node.properties["data-filename"] = node.data?.meta;
			}
		});
		// Remove h1 as both in RSS and in the blog we have a custom title,
		// but want to preserve the title in the markdown
		remove(ast, { tagName: "h1" });
	};
};
