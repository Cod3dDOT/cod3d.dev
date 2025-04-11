"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";

export const PrintFooter: React.FC = memo(() => {
	const pathName = usePathname();

	return (
		<p className="border-t-foreground bg-background relative hidden border-t-2 px-10 py-8 md:px-24 print:block">
			<span>This is a print out from </span>
			<a href={`https://cod3d.dev${pathName}`}>
				https://cod3d.dev{pathName}
			</a>
			<br />
			<span>Thank you for reading.</span>
		</p>
	);
});

PrintFooter.displayName = "PrintFooter";
