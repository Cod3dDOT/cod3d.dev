import { clsx } from 'clsx';

import '@/app/styles/glitch.css';

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
			{text}
		</As>
	);
};
