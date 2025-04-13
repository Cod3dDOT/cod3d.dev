import { ClassAttributes, HTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";

import { cn } from "@/lib/utils/cn";
import { splitmix32, stringToUniqueId } from "@/lib/utils/crypto";
import { CopyButton } from "./copyButton";

type Props = ClassAttributes<HTMLPreElement> &
	HTMLAttributes<HTMLPreElement> &
	ExtraProps;

type Data =
	| {
			meta?: string;
	  }
	| undefined;

const extensionToColor = {
	js: "bg-[#FFEA61]",
	css: "bg-[#8EB0FF]",
	html: "bg-[#FF7957]",
	json: "bg-[#b7b7b7]",
	ts: "bg-[#39B0FF]",
	tsx: "bg-[#39B0FF]",
	py: "bg-[#FFDE57]",
};

export const MarkdownCodeBlock: React.FC<Props> = ({ children, node }) => {
	const data = node?.children[0].data as Data;

	const filename = data?.meta;
	const name = filename?.slice(0, filename.lastIndexOf(".")) || "";
	const extension = filename?.split(".").at(-1) || "js";

	const random = stringToUniqueId(splitmix32().toString()).toString();
	const id = `code-${name}-${random}`;

	return (
		<figure className="bg-container border-neutral-700 md:rounded-lg md:border">
			{filename && (
				<figcaption className="relative !mt-0 flex items-center justify-between overflow-hidden border-b border-neutral-700 px-4 font-mono">
					<span className="text-foreground space-x-3 print:space-x-0">
						<span>{name}</span>
						<span
							className={cn(
								"dark:text-background-dark inline-block px-3 py-3",
								"print:bg-transparent print:p-0",
								extensionToColor[
									extension as keyof typeof extensionToColor
								]
							)}
						>
							.{extension}
						</span>
					</span>
					<CopyButton
						id={id}
						contentName={filename}
						className="h-6 w-6"
					/>
				</figcaption>
			)}

			<pre
				className={cn(
					"text-foreground scrollbar-thin scrollbar-track-background-dark scrollbar-thumb-foreground bg-transparent",
					"max-h-[70vh] md:max-h-none [&>code]:border-none [&>code]:p-0"
				)}
				id={id}
			>
				{children}
			</pre>
		</figure>
	);
};
