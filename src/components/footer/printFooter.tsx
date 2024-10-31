'use client';

import { usePathname } from 'next/navigation';

import { HOST } from '@/lib/constants';

export const PrintFooter: React.FC = () => {
	const pathName = usePathname();

	return (
		<p className="hidden print:block border-t-2 border-t-foreground relative md:px-24 px-10 py-8 bg-background">
			<span>This is a print out from </span>
			<a href={HOST + pathName}>
				{HOST}
				{pathName}
			</a>
			<br />
			<span>Thank you for reading.</span>
		</p>
	);
};
