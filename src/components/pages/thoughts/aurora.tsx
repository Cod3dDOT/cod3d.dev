import { AuroraBackgroundProvider } from '@nauverse/react-aurora-background';

import { shuffleArray } from '@/lib/utils/math';

interface AuroraBackgroundProps {
	slug: string;
	children: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
	slug,
	children
}) => {
	const color = 'rgb(96,165,250)';
	const [r, g, b] = color.replace('rgb(', '').replace(')', '').split(',');

	const colors = Array.from(
		{ length: 6 },
		(_, i) => `rgba(${r}, ${g}, ${b}, ${(1 - i * 0.2).toString()})`
	).concat(['rgba(0,0,0,0)']);

	const notSoRandom = shuffleArray(colors, slug);

	return (
		<AuroraBackgroundProvider
			animDuration={20}
			colors={
				notSoRandom as `rgba(${number}, ${number}, ${number}, ${number})`[]
			}
			blurAmount={100}
			bgColor="#00000000"
			numBubbles={6}
			className=" relative block pt-8 md:pt-24"
		>
			{children}
		</AuroraBackgroundProvider>
	);
};
