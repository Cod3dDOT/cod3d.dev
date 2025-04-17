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
				dark = path;
			} else {
				light = path;
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
	options: RehypeFixesOptions
): VisitorResult => {
	if (index === undefined || parent === undefined) return;

	// fix img in <p></p> tags, which is invalid html
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

const codeVisitor = (node: Element): VisitorResult => {};

export const rehypeFixes: Plugin<RehypeFixesOptions[], Root> = (options) => {
	return (ast: Root) => {
		visit(ast, "element", (node, index, parent) => {
			switch (node.tagName) {
				case "p":
					paragraphVisitor(node, index, parent as Parent, options);
					break;
				case "img":
					imageVisitor(node, options);
					break;
				case "code":
					codeVisitor(node);
					break;
			}
		});
		// Remove h1 as both in RSS and in the blog we have a custom title,
		// but want to preserve the title in the markdown
		remove(ast, { tagName: "h1" });
	};
};
