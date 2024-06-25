'use client';

import Link from 'next/link';
import { ReactNode, useCallback } from 'react';

const style = `relative flex items-center space-x-2
	rounded-full border-foreground border-2 p-4 overflow-hidden
    `;

export const ContactButton: React.FC<{
	children: ReactNode;
	text: string;
	copy: string;
}> = ({ children, text, copy }) => {
	const copyCallback = useCallback(() => {
		navigator.clipboard.writeText(copy);
	}, [copy]);

	return (
		<button className={style} onClick={copyCallback} type="button">
			{children}
			<span>{text}</span>
		</button>
	);
};

export const ContactLink: React.FC<{
	children: ReactNode;
	text: string;
	href: string;
	id?: string;
}> = ({ children, text, href, id }) => {
	return (
		<Link className={style} href={href} id={id}>
			{children}
			<span>{text}</span>
		</Link>
	);
};
