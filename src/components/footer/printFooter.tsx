"use client";

import { memo, useEffect, useState } from "react";

export const PrintFooter: React.FC = memo(() => {
	const [url, setUrl] = useState("");

	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	return (
		<p className="relative hidden border-t-2 border-t-foreground bg-background px-10 py-8 md:px-24 print:block">
			<span>This is a print out from </span>
			<a href={url}>{url}</a>
			<br />
			<span>Thank you for reading.</span>
		</p>
	);
});

PrintFooter.displayName = "PrintFooter";
