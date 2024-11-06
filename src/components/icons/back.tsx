import React from 'react';

import { IconProps } from '.';

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
			className={className}
		>
			<path d="M3 19V5"></path>
			<path d="m13 6-6 6 6 6"></path>
			<path d="M7 12h14"></path>
		</svg>
	)
);

BackIcon.displayName = 'Back';
export default React.memo(BackIcon);
