import { clsx } from 'clsx';

type GlitchTextProps = {
	text: string;
	className?: string;
	as: React.ElementType;
};

export const GlitchText: React.FC<GlitchTextProps> = ({
	text,
	className,
	as
}) => {
	const As = as;
	return (
		<As className={clsx(className, 'glitch')} data-text={text}>
			<span>{text}</span>
		</As>
	);
};
