import React from "react";

import { IconProps } from ".";

const MatrixIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ className, ...props }, ref) => (
		<svg
			ref={ref}
			{...props}
			className={className}
			width="24"
			height="24"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path d="M0 0h1v1H0zm1 0h1v1H1zm1 0h1v1H2zm15 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zM0 1h1v1H0zm19 0h1v1h-1zM0 2h1v1H0zm19 0h1v1h-1zM0 3h1v1H0zm19 0h1v1h-1zM0 4h1v1H0zm19 0h1v1h-1zM0 5h1v1H0zm19 0h1v1h-1zM0 6h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm2 0h1v1H7zm1 0h1v1H8zm1 0h1v1H9zm3 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm5 0h1v1h-1zM0 7h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm1 0h1v1H6zm2 0h1v1H8zm1 0h1v1H9zm1 0h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 8h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm4 0h1v1H9zm1 0h1v1h-1zm4 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 9h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm4 0h1v1H9zm1 0h1v1h-1zm4 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 10h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm4 0h1v1H9zm1 0h1v1h-1zm4 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 11h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm4 0h1v1H9zm1 0h1v1h-1zm4 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 12h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm4 0h1v1H9zm1 0h1v1h-1zm4 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 13h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm4 0h1v1H9zm1 0h1v1h-1zm4 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 14h1v1H0zm4 0h1v1H4zm1 0h1v1H5zm4 0h1v1H9zm1 0h1v1h-1zm4 0h1v1h-1zm1 0h1v1h-1zm4 0h1v1h-1zM0 15h1v1H0zm19 0h1v1h-1zM0 16h1v1H0zm19 0h1v1h-1zM0 17h1v1H0zm19 0h1v1h-1zM0 18h1v1H0zm19 0h1v1h-1zM0 19h1v1H0zm1 0h1v1H1zm1 0h1v1H2zm15 0h1v1h-1zm1 0h1v1h-1zm1 0h1v1h-1z" />
		</svg>
	)
);

MatrixIcon.displayName = "Matrix";
export default React.memo(MatrixIcon);
