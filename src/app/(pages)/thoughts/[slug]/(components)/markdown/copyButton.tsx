/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import CopyIcon from "@/components/icons/copy";

type CopyState = null | "success" | "error";

export const CopyButton: React.FC<{
	id?: string;
	content?: string;
	contentName: string;
	className?: string;
}> = ({ id, content: initialContent = "", contentName, className }) => {
	const timeoutRef = useRef<NodeJS.Timeout>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [copyState, setCopyState] = useState<CopyState>(null);

	useEffect(() => {
		const handleCopy = async (content: string) => {
			try {
				await navigator.clipboard.writeText(content).catch(() => {});

				setCopyState("success");
			} catch {
				setCopyState("error");
			}

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				setCopyState(null);
			}, 1000);
		};

		if (initialContent || !id) return;

		const element = document.getElementById(id);
		if (!element) return;

		const c = element.textContent || "";
		const ref = buttonRef.current;
		ref?.addEventListener("click", () => void handleCopy(c));

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			ref?.removeEventListener("click", () => void handleCopy(c));
		};
	}, [id, initialContent]);

	return (
		<button
			ref={buttonRef}
			type="button"
			className={clsx(
				"group relative z-10 cursor-pointer transition-all duration-200",
				className
			)}
			title="Copy to clipboard"
			aria-label={`Copy ${contentName} to clipboard`}
		>
			<CopyIcon
				showCheck={copyState === "success"}
				className={clsx(
					"stroke-2 stroke-foreground transition-all group-hover:scale-110",
					{
						"stroke-error": copyState === "error",
						"stroke-success": copyState === "success"
					}
				)}
			/>
			<span
				className={clsx(
					"translate-full absolute top-0 right-0 h-40 w-40 rounded-full bg-success transition-all duration-200",
					copyState === "success" && "scale-200 animate-ping"
				)}
			/>
		</button>
	);
};
