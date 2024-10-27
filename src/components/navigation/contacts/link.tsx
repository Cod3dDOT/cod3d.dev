'use client';

import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

const bytes = (str: string) => str.split('').map((c) => c.charCodeAt(0));
const str = (bytes: number[]) =>
	bytes.map((b) => String.fromCharCode(b)).join('');
const byte_xor = (b1: number[], b2: number[]) => b1.map((b, i) => b ^ b2[i]);

const style = `relative flex group w-full h-12 p-2 items-center space-x-2 bg-background rounded-md overflow-hidden`;

export const ContactButton: React.FC<{
	children: ReactNode;
	text: string;
	copy: string;
}> = ({ children, text, copy }) => {
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		ref.current?.addEventListener('click', copyCallback);
		return () => ref.current?.removeEventListener('click', copyCallback);
	}, [copy]);

	const copyCallback = useCallback(() => {
		navigator.clipboard.writeText(copy);
	}, [copy]);

	return (
		<button ref={ref} className={style} type="button">
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

			const host = bytes(location.hostname);
			const email = str(byte_xor(protectedBytes, host));
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
