import parse, {
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
	}
};

type ThoughtBodyProps = {
	thought: Thought;
};

export const ThoughtBody: React.FC<ThoughtBodyProps> = ({ thought }) => {
	return parse(thought.body, options);
};
