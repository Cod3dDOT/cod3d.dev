'use client';

import { usePathname } from 'next/navigation';

export const PrintFooter: React.FC = () => {
	const pathName = usePathname();

	return (
		<p className="hidden print:block border-t-2 border-t-foreground">
			<span>This is a print out from </span>
			<a href={`https://cod3d.dev`}>https://cod3d.dev</a>
			<br />
			<span>You can check out this particular thought at </span>
			<a href={`https://cod3d.dev${pathName}`}>https://cod3d.dev${pathName}</a>
			<br />
			<span>Thank you for reading.</span>
		</p>
	);
};
