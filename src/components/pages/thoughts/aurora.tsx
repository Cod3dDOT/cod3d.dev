interface AuroraBackgroundProps {
	color: string;
	slug: string;
	children: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
	children,
}) => {
	return children;
};
