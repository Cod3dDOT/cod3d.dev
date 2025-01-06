import { AuroraBackgroundProvider } from '@nauverse/react-aurora-background';

import { shuffleArray } from '@/lib/utils/math';

interface AuroraBackgroundProps {
	color: string;
	slug: string;
	children: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
	color,
	slug,
	children
}) => {
	const [r, g, b] = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/g
		.exec(color)
		?.splice(1)
		.map(String) ?? ['0', '0', '0'];

	const colors = Array.from(
		{ length: 6 },
		(_, i) => `rgba(${r}, ${g}, ${b}, ${(1 - i * 0.2).toString()})`
	);

	const notSoRandom = shuffleArray(colors, slug);

	return (
		<AuroraBackgroundProvider
			animDuration={60}
			colors={
				notSoRandom as `rgba(${number}, ${number}, ${number}, ${number})`[]
			}
			blurAmount={100}
			bgColor="#00000000"
			numBubbles={6}
			className=" bg-grainy relative block pt-8 md:pt-24 [&>*:first-child]:hidden [&>*:first-child]:md:block"
		>
			{children}
		</AuroraBackgroundProvider>
	);
};
