import clsx from 'clsx';
import { CodeProps } from './block';

export const CodeInline: React.FC<CodeProps> = ({ code, language }) => {
	return (
		<code
			className={clsx(
				'after:contents before:contents py-1 px-2 bg-background-dark rounded-md font-mono'
			)}
		>
			{code}
		</code>
	);
};
