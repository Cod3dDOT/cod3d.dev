'use client';

export const SyncedRotationWrapper: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	// needs to be a client component for the date to work
	const seconds = new Date().getSeconds();

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden flex lg:justify-center lg:items-center animate-out fade-out-100 fade-in-0">
			<style>
				{`svg {
                    --delay: calc(${seconds} * -1s);
                }`}
			</style>
			{children}
		</div>
	);
};
