/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import clsx from "clsx";
import React from "react";
import type { IconProps } from ".";

const BackIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ className, ...props }, ref) => (
		<svg
			ref={ref}
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={clsx("transition-[fill]", className)}
		>
			<path d="M3 19V5" />
			<path d="m13 6-6 6 6 6" />
			<path d="M7 12h14" />
		</svg>
	)
);

BackIcon.displayName = "Back";
export default React.memo(BackIcon);
