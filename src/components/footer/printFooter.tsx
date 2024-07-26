'use client';

import { usePathname } from 'next/navigation';

export const PrintFooter: React.FC = () => {
	const pathName = usePathname();

	return (
		<div className="hidden print:block border-t-2 border-t-foreground">
			This is a print out from{' '}
			<a href={`https://cod3d.dev`}>https://cod3d.dev</a> <br />
			You can check out this particular thought
			<a href={`https://cod3d.dev${pathName}`}>
				https://cod3d.dev${pathName}
			</a>{' '}
			<br />
			Thank you for reading.
		</div>
	);
};
