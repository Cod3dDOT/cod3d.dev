import { memo, useRef } from "react";
import { useLenis } from "lenis/react";

export const ProgressBar: React.FC = memo(() => {
	const progressBarRef = useRef<HTMLSpanElement>(null);

	useLenis(({ progress }) => {
		const newProgress = -80 + progress * 100;
		progressBarRef.current?.style.setProperty(
			"translate",
			`0% ${newProgress.toString()}%`
		);
	}, []);

	return (
		<span
			className="bg-foreground/50 fixed top-0 left-16 z-10 !mb-0 hidden h-full w-1 rounded-md 2xl:block"
			ref={progressBarRef}
		/>
	);
});

ProgressBar.displayName = "ProgressBar";
