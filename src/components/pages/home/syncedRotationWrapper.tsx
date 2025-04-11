"use client";

import { useEffect, useState } from "react";

// needs to be a client component for the date to work
export const SyncedRotationWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		setSeconds((new Date().getSeconds() % 32) * -1);
	}, []);

	return (
		<div className="animate-in-reduced fixed -inset-full -z-10 flex items-center justify-center overflow-hidden lg:inset-0">
			<style>{`svg { --delay: calc(${seconds.toString()}s); }`}</style>
			{children}
		</div>
	);
};
