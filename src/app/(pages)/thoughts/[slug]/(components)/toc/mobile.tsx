/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { HeadingInfo } from "@/lib/markdown/pluginTOC";
import { TOCListItem } from "./desktop";

interface MobileTOCProps {
	headings: HeadingInfo[];
}

export const MobileTOC: React.FC<MobileTOCProps> = ({ headings }) => {
	return (
		<nav>
			<ul className="list-none font-light text-foreground/50 leading-relaxed">
				{headings.map((heading) => (
					<TOCListItem key={heading.id} heading={heading} isActive={false} />
				))}
			</ul>
		</nav>
	);
};
