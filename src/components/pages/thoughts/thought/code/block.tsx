import { clsx } from 'clsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import CopyIcon from '@/components/icons/copy';
import parse from 'html-react-parser';

export type CodeProps = {
	code: string;
	language?: string;
	filename?: string;
};

const formatToLanguage = {
	swift: 'swift',
	kt: 'kotlin',
	rs: 'rust',
	yaml: 'yaml',
	go: 'go',
	cpp: 'cpp',
	md: 'markdown',
	py: 'python',
	ts: 'typescript',
	js: 'javascript',
	jsx: 'javascript',
	tsx: 'typescript',
	json: 'json',
	java: 'java'
};

const getLanguageFromFilename = (filename: string) => {
	const extPattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;
	const match = (filename || '').match(extPattern);
	return match?.length == 2 && match[1] in formatToLanguage
		? formatToLanguage[match[1] as keyof typeof formatToLanguage]
		: 'typescript';
};

export const CodeBlock: React.FC<CodeProps> = ({
	code,
	language,
	filename
}) => {
	const lang = language ? language : getLanguageFromFilename(filename || '');

	const highlighted = hljs.highlightAuto(code, [lang]).value;

	return (
		<figure>
			<figcaption className="px-4 bg-background-dark border border-neutral-700 rounded-t-lg">
				<p className="text-foreground !my-3 font-mono">{filename}</p>
			</figcaption>
			<pre className="flex !rounded-t-none border border-neutral-700">
				<ol className="!my-0 mx-3 lg:!text-[0.904em]">
					{highlighted.split('\n').map((_, i) => (
						<li key={_.substring(2) + i} className="!m-0" />
					))}
				</ol>
				<code className={`language-${lang}`}>{parse(highlighted)}</code>
			</pre>
		</figure>
	);
};
