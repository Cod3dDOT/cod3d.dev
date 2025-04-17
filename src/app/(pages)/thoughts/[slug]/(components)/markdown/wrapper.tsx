import { markdownToReact } from "@/lib/markdown";
import { cn } from "@/lib/utils/cn";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { MarkdownImage } from "./image";
import { MarkdownCodeBlock } from "./code";

const DynamicToC = dynamic(() =>
    import("../tableOfContents").then((mod) => mod.TableOfContents)
);

type MarkdownWrapperProps = {
    markdown: string;
    images: string[];
};

export const MarkdownWrapper: React.FC<MarkdownWrapperProps> = async ({
    images,
    markdown,
}) => {
    const components = {
        // wrapper: (props: ComponentProps<"div">) => <>{props.children}</>,
        h1: () => <></>,
        p(props: ComponentProps<"p"> & { children: React.ReactElement }) {
            if (props.children?.key?.includes("img")) {
                return <>{props.children}</>;
            }

            return <p {...props}>{props.children}</p>;
        },
        pre: (props: ComponentProps<"pre">) => <MarkdownCodeBlock {...props} />,
        img: (props: ComponentProps<"img">) => (
            <MarkdownImage src={props.src} allImages={images} alt={props.alt} />
        ),
    };

    const markdownComponent = await markdownToReact(markdown, components);

    return (
        <section className="relative opacity-0 [--delay:500ms] motion-safe:animate-in md:px-10 xl:flex">
            <div
                className={cn(
                    "prose lg:prose-xl prose-neutral prose-amber dark:prose-invert max-w-none",
                    "prose-headings:font-light prose-h4:text-[larger]",
                    "prose-a:transition-colors prose-a:hover:text-accent-blue",
                    "prose-pre:bg-transparent prose-pre:text-foreground",
                    "prose-inline-code:before:content-none prose-inline-code:after:content-none", // removes `` from inline code blocks
                    "not-print:prose-inline-code:mx-1 prose-inline-code:rounded-md not-print:prose-inline-code:bg-container not-print:prose-inline-code:p-1 prose-inline-code:text-[smaller]",
                    "md:prose-figure:mx-10",
                    "md:first-letter:text-6xl xl:max-w-prose [&>*:not(figure)]:px-10"
                )}
            >
                {markdownComponent}
            </div>
            <div className="-translate-y-1/2 sticky top-1/2 left-1/2 mt-60 hidden translate-x-8 self-start overflow-hidden xl:block 2xl:translate-x-1/2">
                <DynamicToC />
            </div>
        </section>
    );
};
