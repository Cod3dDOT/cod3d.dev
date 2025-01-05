import { clsx } from 'clsx';

type GlitchTextProps = {
	text: string;
	className?: string;
};

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
	return (
		<span className={clsx(className, 'glitch')} data-text={text}>
			<>{text}</>
		</span>
	);
};
