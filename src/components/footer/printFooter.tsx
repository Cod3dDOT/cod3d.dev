"use client";

import { usePathname } from "next/navigation";
import { memo } from "react";

export const PrintFooter: React.FC = memo(() => {
	const pathName = usePathname();

	return (
		<p className="relative hidden border-t-2 border-t-foreground bg-background px-10 py-8 md:px-24 print:block">
			<span>This is a print out from </span>
			<a href={`https://cod3d.dev${pathName}`}>https://cod3d.dev{pathName}</a>
			<br />
			<span>Thank you for reading.</span>
		</p>
	);
});

PrintFooter.displayName = "PrintFooter";
