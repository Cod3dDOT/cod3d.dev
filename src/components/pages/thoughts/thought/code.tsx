import { clsx } from 'clsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import CopyIcon from '@/components/icons/copy';
import parse, {
	Element,
	HTMLReactParserOptions,
	Text
} from 'html-react-parser';

type CodeProps = {
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

	// const onCopyClick = () => copy(code);

	return (
		<div className="*:m-0 border-2 dark:border-background-dark border-foreground rounded-lg">
			<div className="flex justify-between p-4">
				<p className="m-0">{filename}</p>
				<button>
					<CopyIcon
						aria-hidden="true"
						focusable="false"
						className="fill-foreground h-full aspect-square"
					/>
					<span className="sr-only">Copy contents of {filename}</span>
				</button>
			</div>
			<pre>
				<code className={`language-${lang}`}>
					{parse(hljs.highlightAuto(code, [lang]).value)}
				</code>
			</pre>
		</div>
	);
};

export const CodeInline: React.FC<CodeProps> = ({ code, language }) => {
	return (
		<code
			className={clsx(
				'after:contents before:contents py-1 px-2 bg-background-dark rounded-md'
			)}
		>
			{code}
		</code>
	);
};
