/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import type { HeadingInfo } from "../markdown/pluginTOC";

export interface DynamicHeadingInfo extends HeadingInfo {
	offsetTop: number;
}

interface Options {
	selector?: string; // e.g. 'h1, h2, h3'
	container?: string | HTMLElement | null;
	observeChanges?: boolean;
}

export function useTableOfContents({
	selector = "h1, h2, h3",
	container,
	observeChanges = true
}: Options = {}) {
	const [headings, setHeadings] = useState<DynamicHeadingInfo[]>([]);
	const observerRef = useRef<MutationObserver | null>(null);

	useEffect(() => {
		const getContainer = (): HTMLElement => {
			if (typeof container === "string") {
				return document.querySelector(container) ?? document.body;
			}
			if (container instanceof HTMLElement) {
				return container;
			}
			return document.body;
		};

		const collectHeadings = () => {
			const root = getContainer();
			const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));

			const headingData = elements.map((el) => {
				const id =
					el.id ||
					el.textContent
						?.toLowerCase()
						.replace(/\s+/g, "-")
						.replace(/[^\w-]+/g, "") ||
					"";
				if (!el.id) el.id = id; // ensure it can be linked to

				return {
					id,
					text: el.innerText || "",
					level: Number.parseInt(el.tagName.replace("H", ""), 10),
					offsetTop: el.offsetTop
				};
			});
			setHeadings(headingData);
		};

		collectHeadings();

		if (observeChanges) {
			const root = getContainer();

			observerRef.current = new MutationObserver(() => {
				collectHeadings();
			});

			observerRef.current.observe(root, {
				childList: true,
				subtree: true
			});

			return () => {
				observerRef.current?.disconnect();
			};
		}
	}, [selector, container, observeChanges]);

	return headings;
}
