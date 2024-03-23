'use client';

import { clsx } from 'clsx';
import copy from 'copy-to-clipboard';
import { Highlight, Language, themes } from 'prism-react-renderer';

import CopyIcon from '@/components/icons/copy';

type CodeProps = {
	code: string;
	language?: Language;
	filename?: string;
};

export const Code: React.FC<CodeProps> = ({
	code,
	language = 'tsx',
	filename
}) => {
	const onCopyClick = () => copy(code);

	return (
		<div className="*:m-0 border-2 dark:border-background border-foreground rounded-lg">
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
			<Highlight theme={themes.vsDark} code={code} language={language}>
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
			</Highlight>
		</div>
	);
};
