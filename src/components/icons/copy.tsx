import React from 'react';

import { IconProps } from '.';

type Props = {
	showCheck?: boolean;
	checkColor?: string;
} & IconProps;

const CopyIcon = React.forwardRef<SVGSVGElement, Props>(
	({ className, showCheck = false, checkColor, ...props }, ref) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			ref={ref}
			{...props}
			className={className}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
			<path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
			<path
				d="M11 14l2 2l4 -4"
				stroke={checkColor}
				strokeWidth="1.5"
				strokeDasharray={100}
				strokeDashoffset={showCheck ? 0 : 100}
				className="transition-all duration-300 ease-in-out"
			/>
		</svg>
	)
);

CopyIcon.displayName = 'Copy';
export default CopyIcon;
