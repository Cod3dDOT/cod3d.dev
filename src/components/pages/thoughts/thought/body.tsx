import parse, {
	DOMNode,
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
			const language = domNode.attribs['class'].substring(9);
			const filename = domNode.attribs['title'];
			const codeBlock = domNode.firstChild;
			const code = ((codeBlock as Element).firstChild as Text).data;
			return <CodeBlock code={code} language={language} filename={filename} />;
		}

		if (domNode.tagName == 'code') {
			const code = (domNode.firstChild as Text).data;
			return <CodeInline code={code} language="text" />;
		}
	}
};

type ThoughtBodyProps = {
	thought: Thought;
};

export const ThoughtBody: React.FC<ThoughtBodyProps> = async ({ thought }) => {
	return parse(thought.body, options);

	// return (await processor2.process(thought.body)).result;
};
