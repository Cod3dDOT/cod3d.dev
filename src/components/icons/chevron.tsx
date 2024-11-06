import React from 'react';

import { IconProps } from '.';

const ChevronIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ className, ...props }, ref) => (
		<svg
			ref={ref}
			{...props}
			className={className}
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			shapeRendering="crispEdges"
			aria-hidden="true"
		>
			<path d="M4 1h1v1H4zM5 1h1v1H5zM5 2h1v1H5zM6 2h1v1H6zM6 3h1v1H6zM7 3h1v1H7zM7 4h1v1H7zM8 4h1v1H8zM8 5h1v1H8zM9 5h1v1H9zM9 6h1v1H9zM10 6h1v1h-1zM10 7h1v1h-1zM11 7h1v1h-1zM10 8h1v1h-1zM11 8h1v1h-1zM9 9h1v1H9zM10 9h1v1h-1zM8 10h1v1H8zM9 10h1v1H9zM7 11h1v1H7zM8 11h1v1H8zM6 12h1v1H6zM7 12h1v1H7zM5 13h1v1H5zM6 13h1v1H6zM4 14h1v1H4zM5 14h1v1H5z" />
		</svg>
	)
);

ChevronIcon.displayName = 'Chevron';
export default React.memo(ChevronIcon);
