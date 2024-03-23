import parse, {
	Element,
	HTMLReactParserOptions,
	Text
} from 'html-react-parser';
import Link from 'next/link';

import ChevronIcon from '@/components/icons/chevron';
import Code from '@/components/pages/thoughts/thought/code';
import { getThought } from '@/lib/pocketbase/req';

export async function generateMetadata({
	params
}: {
	params: { slug: string };
}) {
	const thought = await getThought(params.slug);

	return {
		title: "cod3d's thoughts",
		description: thought.name,
		openGraph: {
			type: 'website',
			url: 'https://cod3d.dev',
			title: "cod3d's thoughts",
			description: thought.name,
			siteName: "cod3d's den"
		}
	};
}

const options: HTMLReactParserOptions = {
	replace(domNode) {
		if (!(domNode instanceof Element) || !domNode.attribs) return;

		if (domNode.tagName == 'pre') {
			const children = domNode.children
				.filter((child) => child instanceof Text)
				.map((child) => (child as Text).data);
			const filename = children.shift();
			const code = children.join('\n');
			return <Code code={code} filename={filename} />;
		}

		if (domNode.tagName == 'a') {
			// update if relative to next/link
			return domNode;
		}
	}
};

export default async function Page({ params }: { params: { slug: string } }) {
	const thought = await getThought(params.slug);

	return (
		<div className="max-w-[100ch] mx-auto sm:mt-24 mt-8">
			<Link href={'/thoughts'} className="flex items-center space-x-2 mb-8">
				<ChevronIcon className="h-full aspect-square fill-foreground rotate-180" />
				<span>Back to thoughts</span>
			</Link>
			<article className="prose max-w-full dark:prose-invert prose-img:w-full">
				<h1 className="md:w-4/5">{thought.name}</h1>
				{parse(thought.body, options)}
			</article>
		</div>
	);
}
