"use client";

import { useDeviceDetection } from "@/lib/hooks/useDeviceDetection";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState } from "react";

// needs to be a client component for the date to work
export const SyncedRotationWrapper: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [seconds, setSeconds] = useState(1);

	const { isReducedMotion } = useDeviceDetection();
	const animationDuration = isReducedMotion ? 3600 : 60;

	useEffect(() => {
		setSeconds((new Date().getSeconds() % animationDuration) * -1);
	}, [animationDuration]);

	return (
		<div
			className={cn(
				seconds !== 1 ? "opacity-100" : "opacity-0",
				"-inset-full -z-10 fixed flex animate-in-reduced items-center justify-center overflow-hidden transition-opacity duration-200 lg:inset-0"
			)}
		>
			<style>{`svg { --delay: calc(${seconds.toString()}s); }`}</style>
			{children}
		</div>
	);
};
