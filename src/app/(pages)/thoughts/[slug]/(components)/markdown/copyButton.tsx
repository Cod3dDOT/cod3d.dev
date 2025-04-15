"use client";

import { useEffect, useRef, useState } from "react";

import CopyIcon from "@/components/icons/copy";
import { cn } from "@/lib/utils/cn";

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
			className={cn(
				"group relative z-10 transition-all duration-200 hover:scale-110",
				className
			)}
			title="Copy to clipboard"
			aria-label={`Copy ${contentName} to clipboard`}
		>
			<CopyIcon
				showCheck={copyState === "success"}
				className={cn("stroke-2 stroke-foreground transition-all", {
					"stroke-error": copyState === "error",
					"stroke-success": copyState === "success"
				})}
			/>
			<span
				className={cn(
					"-translate-y-full absolute top-0 right-0 h-20 w-20 translate-x-full rounded-full bg-success/20 opacity-0 transition-opacity duration-200",
					"group:animate-ping group:opacity-100"
				)}
			/>
		</button>
	);
};
