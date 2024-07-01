import { clsx } from 'clsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import parse from 'html-react-parser';

export type CodeProps = {
	code: string;
	language: string;
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

export const CodeBlock: React.FC<CodeProps> = async ({
	code,
	language,
	filename
}) => {
	const highlighted = hljs.highlight(code, { language }).value;

	return (
		<figure>
			{filename && (
				<figcaption className="px-4 bg-background-dark border border-neutral-700 rounded-t-lg">
					<p className="text-foreground !my-3 font-mono">{filename}</p>
				</figcaption>
			)}
			<pre
				className={clsx(
					'flex border border-neutral-700',
					filename && '!rounded-t-none'
				)}
			>
				<ol className="!my-0 mx-3 lg:!text-[0.904em]">
					{highlighted.split('\n').map((_, i) => (
						<li key={_.substring(2) + i} className="!m-0" />
					))}
				</ol>
				<code>{parse(highlighted)}</code>
			</pre>
		</figure>
	);
};
