import React from 'react';

export const GrainyBackground: React.FC = () => {
	return (
		<svg className="fixed inset-0 -z-30">
			<filter id="noiseFilter">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.6"
					stitchTiles="stitch"
				/>
				<feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
				<feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
			</filter>
		</svg>
	);
};
