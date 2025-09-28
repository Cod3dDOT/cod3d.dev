/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

const bytes = (str: string) => str.split("").map((c) => c.charCodeAt(0));
const str = (bytes: number[]) =>
	bytes.map((b) => String.fromCharCode(b)).join("");
const byte_xor = (b1: number[], b2: number[]) => b1.map((b, i) => b ^ b2[i]);

const style =
	"relative group/link hover:rounded-xl transition-all text-left duration-300 flex px-6 h-18 items-center rounded-lg overflow-hidden cursor-pointer";

const Contents: React.FC<{
	children: React.ReactNode;
	text: string;
	subtext: string;
	active?: boolean;
}> = ({ children, text, subtext, active = false }) => {
	return (
		<>
			<div
				className={cn(
					"-z-20 -translate-y-1/2 -inset-1/2 absolute top-1/2 aspect-square animate-spin bg-linear-to-b from-accent-yellow to-accent-blue opacity-0 transition-opacity group-hover/link:opacity-100",
					active && "opacity-100"
				)}
			/>
			<div
				className={cn(
					"-z-10 absolute inset-0 rounded-lg bg-container transition-all group-hover/link:inset-1",
					active && "inset-full!"
				)}
			/>
			{children}
			<div className="ml-4 flex flex-col justify-center space-y-1 transition-transform duration-300 group-hover/link:translate-x-1">
				<span className="font-medium text-lg leading-none">{text}</span>
				<span className="leading-none">{subtext}</span>
			</div>
		</>
	);
};

export const ContactButton: React.FC<{
	children: React.ReactNode;
	text: string;
	subtext: string;
	copy: string;
	className?: string;
}> = ({ children, text, subtext, copy, className }) => {
	const ref = useRef<HTMLButtonElement>(null);
	const [active, setActive] = useState(false);

	const copyCallback = useCallback(() => {
		setActive(true);
		navigator.clipboard.writeText(copy);

		setTimeout(() => {
			setActive(false);
		}, 1000);
	}, [copy]);

	useEffect(() => {
		const current = ref.current;
		if (!current) return;
		current.addEventListener("click", copyCallback);
		return () => current.removeEventListener("click", copyCallback);
	}, [copyCallback]);

	return (
		<button ref={ref} className={cn(style, className)} type="button">
			<Contents text={text} subtext={subtext} active={active}>
				{children}
			</Contents>
		</button>
	);
};

export const ContactLink: React.FC<{
	children: React.ReactNode;
	text: string;
	subtext: string;
	href: string;
	protectedBytes?: number[];
	className?: string;
}> = ({ children, text, subtext, href, protectedBytes, className }) => {
	const [active, setActive] = useState(false);
	const linkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (!linkRef.current || !protectedBytes) return;
		linkRef.current.addEventListener("click", (e) => {
			e.preventDefault();

			setActive(true);

			const host = bytes(location.hostname);
			const email = str(byte_xor(protectedBytes, host));
			window.location.href = `mailto:${email}`;

			setTimeout(() => {
				setActive(false);
			}, 1000);
		});
	}, [protectedBytes]);

	return (
		<a hrefLang="en" ref={linkRef} className={cn(style, className)} href={href}>
			<Contents text={text} subtext={subtext} active={active}>
				{children}
			</Contents>
		</a>
	);
};
