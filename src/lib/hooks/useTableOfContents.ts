/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import type { HeadingInfo } from "../markdown/pluginTOC";

export interface DynamicHeadingInfo extends HeadingInfo {
	offsetTop: number;
}

export function useTableOfContents({
	selector = "h1, h2, h3",
	observeChanges = true
} = {}) {
	const [headings, setHeadings] = useState<DynamicHeadingInfo[]>([]);

	useEffect(() => {
		const collectHeadings = () => {
			const elements = Array.from(
				document.querySelectorAll<HTMLElement>(selector)
			);
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
			const observer = new MutationObserver(() => {
				collectHeadings();
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});

			return () => observer.disconnect();
		}
	}, [selector, observeChanges]);

	return headings;
}
