'use client';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

// needs to be a client component for the date to work
export const SyncedRotationWrapper: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [opacity, setOpacity] = useState('opacity-0');
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		setSeconds(new Date().getSeconds());
		setOpacity('opacity-100');
	}, []);

	return (
		<div
			className={clsx(
				'fixed inset-0 -z-10 overflow-hidden flex lg:justify-center lg:items-center transition-opacity duration-1000',
				opacity
			)}
		>
			<style>
				{`svg {
                    --delay: calc(${seconds} * -1s);
                }`}
			</style>
			{children}
		</div>
	);
};
