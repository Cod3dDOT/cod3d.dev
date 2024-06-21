'use client';

import { clsx } from 'clsx';
import copy from 'copy-to-clipboard';
import dynamic from 'next/dynamic';

import CopyIcon from '@/components/icons/copy';

const DynamicHighlight = dynamic(() =>
	import('prism-react-renderer').then((mod) => mod.Highlight)
);

type CodeProps = {
	code: string;
	language?: string;
	filename?: string;
};

const formatToLanguage = {
	swift: 'swift',
	kt: 'kotlin',
	m: 'objectivec',
	'': 'js-extras',
	re: 'reason',
	rs: 'rust',
	graphql: 'graphql',
	yaml: 'yaml',
	go: 'go',
	cpp: 'cpp',
	md: 'markdown',
	py: 'python'
};

const getLanguageFromFilename = (filename: string) => {
	const extPattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;
	const match = (filename || '').match(extPattern);
	return match?.length == 2 && match[1] in formatToLanguage
		? formatToLanguage[match[1] as keyof typeof formatToLanguage]
		: 'tsx';
};

export const Code: React.FC<CodeProps> = ({ code, language, filename }) => {
	const lang = language ? language : getLanguageFromFilename(filename || '');

	const onCopyClick = () => copy(code);

	return (
		<div className="*:m-0 border-2 dark:border-background-dark border-foreground rounded-lg">
			<div className="flex justify-between p-4">
				<p className="m-0">{filename}</p>
				<button onClick={onCopyClick}>
					<CopyIcon
						aria-hidden="true"
						focusable="false"
						className="fill-foreground h-full aspect-square"
					/>
					<span className="sr-only">Copy contents of {filename}</span>
				</button>
			</div>
			<DynamicHighlight code={code} language={lang}>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre style={style} className={className}>
						{tokens.map((line, i) => {
							const props = getLineProps({ line });
							return (
								<div
									className={clsx(props.className, 'hover:mix-blend-lighten')}
									key={i}
									style={props.style}
								>
									<span className="mr-4 select-none">{i + 1}</span>
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token })} />
									))}
								</div>
							);
						})}
					</pre>
				)}
			</DynamicHighlight>
		</div>
	);
};
