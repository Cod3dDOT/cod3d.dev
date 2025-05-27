/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "@/lib/utils/cn";
import { splitmix32, stringToUniqueId } from "@/lib/utils/crypto";
import type { ComponentProps } from "react";
import { CopyButton } from "./copyButton";

export type MarkdownCodeBlockProps = ComponentProps<"pre">;

const extensionToColor = {
	js: "bg-[#FFEA61]",
	css: "bg-[#8EB0FF]",
	html: "bg-[#FF7957]",
	json: "bg-[#b7b7b7]",
	ts: "bg-[#39B0FF]",
	tsx: "bg-[#39B0FF]",
	py: "bg-[#FFDE57]"
};

export const MarkdownCodeBlock: React.FC<MarkdownCodeBlockProps> = ({
	children
}) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const filename = (children as any).props["data-filename"] as
		| string
		| undefined;
	const name = filename?.slice(0, filename.lastIndexOf(".")) || "";
	const extension = filename?.split(".").at(-1) || "js";

	const random = stringToUniqueId(splitmix32().toString()).toString();
	const id = `code-${name}-${random}`;

	return (
		<figure
			className={cn(
				"overflow-hidden border-container border-y-4 font-mono md:rounded-lg md:border-4",
				filename && "!border-t-0"
			)}
		>
			{filename && (
				<figcaption className="!mt-0 relative flex h-14 items-center justify-between overflow-hidden border-b bg-container">
					<span className="h-full text-center text-foreground">
						<span className="mx-4 print:mx-0">{name}</span>
						<span
							className={cn(
								"inline-grid h-full items-center not-print:px-3 dark:text-container",
								"print:bg-transparent",
								extensionToColor[extension as keyof typeof extensionToColor]
							)}
						>
							{"."}
							{extension}
						</span>
					</span>
					<CopyButton
						id={id}
						contentName={filename}
						className="aspect-square h-full p-4 md:p-3 print:hidden"
					/>
				</figcaption>
			)}

			<pre
				className="max-h-[70vh] cursor-text bg-container/40 py-2! md:max-h-none print:max-h-none print:px-0!"
				id={id}
			>
				{children}
			</pre>
		</figure>
	);
};
