import { clsx } from 'clsx';
import { CopyButton } from './copyButton';
import { ClassAttributes, HTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

type Props = ClassAttributes<HTMLPreElement> &
	HTMLAttributes<HTMLPreElement> &
	ExtraProps;

type Data = {
	meta?: string;
};

const extensionToColor = {
	js: 'bg-[#f1e05a]',
	css: 'bg-[#563d7c]',
	html: 'bg-[#e34c26]',
	json: 'bg-[#b7b7b7]',
	ts: 'bg-[#2b7489]',
	tsx: 'bg-[#2b7489]',
	py: 'bg-[#3572A5]'
};

export const MarkdownCodeBlock: React.FC<Props> = ({ children, node }) => {
	const filename = (node?.children[0].data as Data)?.meta;
	const name = filename?.split('.').at(0) || '';
	const extension = filename?.split('.').at(1) || 'js';

	return (
		<figure className="bg-background-dark border border-neutral-700 rounded-lg">
			{filename && (
				<figcaption className="relative overflow-hidden items-center font-mono flex justify-between px-4 border-b border-neutral-700 !mt-0">
					<span className="text-foreground space-x-3">
						<span>{name}</span>
						<span
							className={clsx(
								'py-3 px-3 inline-block dark:text-background',
								extensionToColor[extension as keyof typeof extensionToColor]
							)}
						>
							.{extension}
						</span>
					</span>
					<CopyButton className="w-6 h-6" />
				</figcaption>
			)}

			<pre className="bg-transparent text-foreground">{children}</pre>
		</figure>
	);
};
