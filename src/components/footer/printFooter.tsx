'use client';

import { usePathname } from 'next/navigation';

export const PrintFooter: React.FC = () => {
	const pathName = usePathname();

	return (
		<p className="hidden print:block border-t-2 border-t-foreground relative md:px-24 px-10 py-8 bg-background">
			<span>This is a print out from </span>
			<a href={`https://cod3d.dev${pathName}`}>https://cod3d.dev{pathName}</a>
			<br />
			<span>Thank you for reading.</span>
		</p>
	);
};
