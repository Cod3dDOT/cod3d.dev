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
		<figure className="border-y-2 font-mono md:rounded-lg md:border-2">
			{filename && (
				<figcaption className="relative !mt-0 flex h-14 items-center justify-between overflow-hidden border-b">
					<span className="text-foreground h-full text-center">
						<span className="mx-4 print:mx-0">{name}</span>
						<span
							className={cn(
								"dark:text-background-dark inline-grid h-full items-center not-print:aspect-square",
								"print:bg-transparent",
								extensionToColor[
									extension as keyof typeof extensionToColor
								]
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
				className="max-h-[70vh] md:max-h-none print:max-h-none print:px-0!"
				id={id}
			>
				{children}
			</pre>
		</figure>
	);
};
