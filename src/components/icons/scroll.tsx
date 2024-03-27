import React from 'react';

import { IconProps } from '.';

const ScrollIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ className, ...props }, ref) => (
		<svg
			ref={ref}
			{...props}
			className={className}
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M27 10.32v2.06a12 12 0 1 1-4-.33v12l-2.19-2.19-1.41 1.42 3.53 3.54a1.48 1.48 0 0 0 2.06.05l.06-.05 3.54-3.54-1.41-1.41-.18.18-2 2V8h-2v2.05a13.93 13.93 0 1 0 4 .27Z" />
		</svg>
	)
);

ScrollIcon.displayName = 'ScrollIcon';
export default ScrollIcon;
