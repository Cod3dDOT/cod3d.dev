"use client";

import { useDeviceDetection } from "@/lib/hooks/useDeviceDetection";
import { useEffect, useState } from "react";

// needs to be a client component for the date to work
export const SyncedRotationWrapper: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [seconds, setSeconds] = useState(0);

	const { isReducedMotion } = useDeviceDetection();
	const animationDuration = isReducedMotion ? 512 : 32;

	useEffect(() => {
		setSeconds((new Date().getSeconds() % animationDuration) * -1);
	}, [animationDuration]);

	return (
		<div className="-inset-full -z-10 fixed flex animate-in-reduced items-center justify-center overflow-hidden lg:inset-0">
			<style>{`svg { --delay: calc(${seconds.toString()}s); }`}</style>
			{children}
		</div>
	);
};
