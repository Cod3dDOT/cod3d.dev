import { clsx } from 'clsx';
import { ClassAttributes, HTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

import { splitmix32, stringToUniqueId } from '@/lib/utils/crypto';

import { CopyButton } from './copyButton';

type Props = ClassAttributes<HTMLPreElement> &
	HTMLAttributes<HTMLPreElement> &
	ExtraProps;

type Data = {
	meta?: string;
};

const extensionToColor = {
	js: 'bg-[#FFEA61]',
	css: 'bg-[#8EB0FF]',
	html: 'bg-[#FF7957]',
	json: 'bg-[#b7b7b7]',
	ts: 'bg-[#39B0FF]',
	tsx: 'bg-[#39B0FF]',
	py: 'bg-[#FFDE57]'
};

export const MarkdownCodeBlock: React.FC<Props> = ({ children, node }) => {
	const filename = (node?.children[0].data as Data)?.meta;
	const name = filename?.slice(0, filename.lastIndexOf('.')) || '';
	const extension = filename?.split('.').at(-1) || 'js';

	const random = stringToUniqueId(splitmix32().toString());
	const id = `code-${name}-${random}`;

	return (
		<figure className="bg-background-dark md:border border-neutral-700 md:rounded-lg">
			{filename && (
				<figcaption className="relative overflow-hidden items-center font-mono flex justify-between px-4 border-b border-neutral-700 !mt-0">
					<span className="text-foreground space-x-3 print:space-x-0">
						<span>{name}</span>
						<span
							className={clsx(
								'py-3 px-3 inline-block dark:text-background-dark',
								'print:p-0 print:bg-transparent',
								extensionToColor[extension as keyof typeof extensionToColor]
							)}
						>
							.{extension}
						</span>
					</span>
					<CopyButton id={id} contentName={filename} className="w-6 h-6" />
				</figcaption>
			)}

			<pre
				className={clsx(
					'bg-transparent text-foreground scrollbar-thin scrollbar-track-background-dark scrollbar-thumb-foreground',
					'[&>code]:p-0 [&>code]:border-none max-h-[70vh] md:max-h-none'
				)}
				id={id}
			>
				{children}
			</pre>
		</figure>
	);
};
