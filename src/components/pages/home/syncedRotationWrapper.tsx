"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

// needs to be a client component for the date to work
export const SyncedRotationWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [opacity, setOpacity] = useState("opacity-0");
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		setSeconds((new Date().getSeconds() % 32) * -1);
		setOpacity("opacity-100");
	}, []);

	return (
		<div
			className={cn(
				"fixed -inset-full -z-10 flex items-center justify-center overflow-hidden transition-opacity duration-1000 lg:inset-0",
				opacity
			)}
		>
			<style>{`svg { --delay: calc(${seconds.toString()}s); }`}</style>
			{children}
		</div>
	);
};
