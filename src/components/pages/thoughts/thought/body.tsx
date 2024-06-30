import parse, {
	Element,
	HTMLReactParserOptions,
	Text
} from 'html-react-parser';

import { Thought } from '@/lib/pocketbase/types';

import { CodeBlock } from './code/block';
import { CodeInline } from './code/inline';

const options: HTMLReactParserOptions = {
	replace(domNode) {
		if (!(domNode instanceof Element) || !domNode.attribs) return;

		if (domNode.tagName == 'pre') {
			const children = domNode.children
				.filter((child) => child instanceof Text)
				.map((child) => (child as Text).data);
			const filename = children.shift();
			const code = children.join('\n');
			return <CodeBlock code={code} filename={filename} />;
		}

		if (domNode.tagName == 'code') {
			const children = domNode.children
				.filter((child) => child instanceof Text)
				.map((child) => (child as Text).data);
			const code = children.join('');
			return <CodeInline code={code} />;
		}
	}
};

type ThoughtBodyProps = {
	thought: Thought;
};

export const ThoughtBody: React.FC<ThoughtBodyProps> = async ({ thought }) => {
	return parse(thought.body, options);
};
