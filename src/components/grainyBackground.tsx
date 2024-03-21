import React from 'react';

export const GrainyBackground: React.FC = () => {
	return (
		<svg className="absolute inset-0 -z-10 left-0 top-0">
			<filter id="noiseFilter-dark">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.6"
					stitchTiles="stitch"
				/>
				<feColorMatrix
					in="colorNoise"
					type="matrix"
					values="1.0 0.3 0.3 0.0 0.0
                            0.3 1.0 0.3 0.0 0.0
                            0.3 0.3 1.0 0.0 0.0
                            0.0 0.0 0.0 0.1 0.0"
				/>
				<feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
				<feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
			</filter>
			<filter id="noiseFilter-light">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.6"
					stitchTiles="stitch"
				/>
				<feColorMatrix
					in="colorNoise"
					type="matrix"
					values="1.0 0.3 0.3 0.0 0.0
                            0.3 1.0 0.3 0.0 0.0
                            0.3 0.3 1.0 0.0 0.0
                            0.0 0.0 0.0 0.9 0.0"
				/>
				<feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
				<feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
			</filter>
		</svg>
	);
};
