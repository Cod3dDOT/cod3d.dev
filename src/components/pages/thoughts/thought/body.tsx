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
			const classAttr =
				'class' in domNode.attribs ? domNode.attribs['class'] : '';
			const titleAttr =
				'title' in domNode.attribs ? domNode.attribs['title'] : '';

			const language = classAttr.substring(9) || 'text';
			const filename = titleAttr;

			const codeBlock = domNode.firstChild;
			const code = ((codeBlock as Element).firstChild as Text)?.data;

			if (!code) return;
			return <CodeBlock code={code} language={language} filename={filename} />;
		}

		if (domNode.tagName == 'code') {
			if ((domNode.parent as Element).tagName === 'pre') return;

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
