'use client';

import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

const bytes = (str: string) => str.split('').map((c) => c.charCodeAt(0));
const str = (bytes: number[]) =>
	bytes.map((b) => String.fromCharCode(b)).join('');
const byte_xor = (b1: number[], b2: number[]) => b1.map((b, i) => b ^ b2[i]);
const ebytes = [0, 0, 0, 0, 0, 110, 7, 10, 18, 51, 100, 46, 100, 101, 118];

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
	protectedBytes?: number[];
}> = ({ children, text, href, protectedBytes }) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (!linkRef.current || !protectedBytes) return;
		linkRef.current.addEventListener('click', (e) => {
			e.preventDefault();

			let host = bytes(location.hostname);
			let email = str(byte_xor(ebytes, host));
			window.location.href = 'mailto:' + email;
		});
	}, [protectedBytes]);

	return (
		<Link hrefLang="en" ref={linkRef} className={style} href={href}>
			{children}
			<span>{text}</span>
		</Link>
	);
};
