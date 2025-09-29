/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import clsx from "clsx";
import React from "react";
import type { IconProps } from ".";

const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ className, ...props }, ref) => (
		<svg
			ref={ref}
			{...props}
			className={clsx("transition-[fill]", className)}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
		</svg>
	)
);

HomeIcon.displayName = "Home";
export default React.memo(HomeIcon);
