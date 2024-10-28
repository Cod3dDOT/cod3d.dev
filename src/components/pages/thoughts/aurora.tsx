import { shuffleArray } from '@/lib/utils/math';
import { AuroraBackgroundProvider } from '@nauverse/react-aurora-background';

interface AuroraBackgroundProps {
	slug: string;
	children: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
	slug,
	children
}) => {
	const notSoRandomlyShuffled = shuffleArray(
		[
			'#00000000',
			'#60a5fa',
			'#00000000',
			'#00000000',
			'#00000000',
			'#60a5fa',
			'#00000000',
			'#00000000'
		],
		slug
	);

	return (
		<AuroraBackgroundProvider
			animDuration={20}
			colors={notSoRandomlyShuffled as `#${string}`[]}
			blurAmount={100}
			bgColor="#00000000"
			className=" relative block pt-8 md:pt-24"
		>
			{children}
		</AuroraBackgroundProvider>
	);
};
