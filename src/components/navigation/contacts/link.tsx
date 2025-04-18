"use client";

import Link from "next/link";
import { type ReactNode, useCallback, useEffect, useRef } from "react";

const bytes = (str: string) => str.split("").map((c) => c.charCodeAt(0));
const str = (bytes: number[]) =>
	bytes.map((b) => String.fromCharCode(b)).join("");
const byte_xor = (b1: number[], b2: number[]) => b1.map((b, i) => b ^ b2[i]);

const style =
	"relative flex group h-12 p-2 px-4 items-center justify-center space-x-3 bg-container rounded-md overflow-hidden cursor-pointer";

export const ContactButton: React.FC<{
	children: ReactNode;
	text: string;
	copy: string;
}> = ({ children, text, copy }) => {
	const ref = useRef<HTMLButtonElement>(null);

	const copyCallback = useCallback(() => {
		// TODO: add feedback
		void navigator.clipboard.writeText(copy);
	}, [copy]);

	useEffect(() => {
		const current = ref.current;
		if (!current) return;
		current.addEventListener("click", copyCallback);
		return () => current.removeEventListener("click", copyCallback);
	}, [copyCallback]);

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
		linkRef.current.addEventListener("click", (e) => {
			e.preventDefault();

			const host = bytes(location.hostname);
			const email = str(byte_xor(protectedBytes, host));
			window.location.href = `mailto:${email}`;
		});
	}, [protectedBytes]);

	return (
		<Link hrefLang="en" ref={linkRef} className={style} href={href}>
			{children}
			<span>{text}</span>
		</Link>
	);
};
