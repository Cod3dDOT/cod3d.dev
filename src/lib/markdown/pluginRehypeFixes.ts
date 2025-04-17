import type { ComponentProps } from "react";
import { visit } from "unist-util-visit";

export function findImagePaths(
    src: ComponentProps<"img">["src"],
    paths: string[]
) {
    if (!src) {
        return undefined;
    }

    if (typeof src !== "string") {
        return src;
    }

    const baseName = src.split(".")[0]; // ignore extension

    for (const path of paths) {
        if (path.includes(baseName)) {
            return path;
        }
    }

    return undefined;
}

interface Options {
    markdownImages: string[];
}

export default function rehypeRSSFixes(options: Options) {

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return (tree: any) => {
        visit(tree, "element", (node) => {
            if (node.tagName === "img") {
                const src = node.properties.src;
                const fullPath = findImagePaths(src, options.markdownImages);
                node.properties.src = fullPath || src;
            }
        })
    }
}
