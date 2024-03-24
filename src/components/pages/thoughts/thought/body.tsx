import parse, {
	DOMNode,
	domToReact,
	Element,
	HTMLReactParserOptions,
	Text
} from 'html-react-parser';

import { Thought } from '@/lib/pocketbase/types';

import { Code } from './code';

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

		if (['h1', 'h2', 'h3', 'h4', 'h5'].includes(domNode.tagName)) {
			const child = domNode.firstChild;
			if (child instanceof Element && child.tagName == 'a') {
				domNode.attribs.id = child.attribs.href.substring(1);
				return domNode;
			}
			return domNode;
		}

		if (domNode.tagName == 'a') {
			const parent = domNode.parent;
			if (
				parent instanceof Element &&
				['h1', 'h2', 'h3', 'h4', 'h5'].includes(parent.tagName)
			) {
				return (
					<span>{domToReact(domNode.children as DOMNode[], options)}</span>
				);
			}
			return domNode;
		}
	}
};

type ThoughtBodyProps = {
	thought: Thought;
};

export const ThoughtBody: React.FC<ThoughtBodyProps> = ({ thought }) => {
	return parse(thought.body, options);
};
