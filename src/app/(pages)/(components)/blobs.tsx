import { cn } from "@/lib/utils/cn";

export const ColorfulBlobs: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 200 200"
			className={cn(
				"relative aspect-square [animation-delay:var(--delay)]",
				"animate-spin will-change-transform motion-safe:[animation-duration:60s] motion-reduce:[animation-duration:3600s]",
				"*:h-[35rem] *:w-[35rem] sm:*:h-[42rem] sm:*:w-[42rem]"
			)}
		>
			<title>Colorful Blobs</title>
			<defs>
				<filter id="GaussianBlur" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="10" in="SourceGraphic" result="blur" />
				</filter>
				<filter id="GrainyTexture" x="-50%" y="-50%" width="200%" height="200%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="15"
						numOctaves="6"
						result="noise"
						stitchTiles="stitch"
					/>
					<feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
				</filter>
			</defs>
			<ellipse
				rx="35"
				ry="35"
				cx="60"
				cy="60"
				filter="url(#GaussianBlur)"
				className="fill-info"
			/>
			<ellipse
				rx="35"
				ry="35"
				cx="140"
				cy="140"
				filter="url(#GaussianBlur)"
				className="fill-warn"
			/>
		</svg>
	);
};
