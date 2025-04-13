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
	// Use refs instead of state for values that don't need to trigger re-renders
	const timeoutRef = useRef<NodeJS.Timeout>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	// Only copied state needs to trigger re-renders for visual feedback
	const [copyState, setCopyState] = useState<CopyState>(null);

	// Memoized copy handler
	const handleCopy = async (content: string) => {
		try {
			await navigator.clipboard.writeText(content).catch(() => {});

			setCopyState("success");
		} catch {
			setCopyState("error");
		}

		// Clear previous timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Reset copy state after animation
		timeoutRef.current = setTimeout(() => {
			setCopyState(null);
		}, 1000);
	};

	// Set up content and event listener
	useEffect(() => {
		// If we have direct content or no id, skip
		if (initialContent || !id) return;

		const element = document.getElementById(id);
		if (!element) return;

		// Set content once
		const c = element.textContent || "";
		const ref = buttonRef.current;
		ref?.addEventListener("click", () => void handleCopy(c));

		// Clean up timeout on unmount
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
				className={cn(
					"stroke-foreground absolute inset-0 h-full w-full stroke-2 transition-all",
					{
						"stroke-error": copyState === "error",
						"stroke-success": copyState === "success",
					}
				)}
			/>
			{/* Animation ping effect */}
			<span
				className={cn(
					"bg-success/20 absolute top-0 right-0 h-20 w-20 translate-x-full -translate-y-full rounded-full opacity-0 transition-opacity duration-200",
					"group-[.copied]:animate-ping group-[.copied]:opacity-100"
				)}
			/>
		</button>
	);
};
