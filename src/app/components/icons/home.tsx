import React from "react";
import { IconProps } from ".";

const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, ...props }, ref) => (
        <svg
            ref={ref}
            {...props}
            className={className}
            width="24"
            height="24"
            viewBox="1 1 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
        >
            <path d="M7 2h1v1H7zM8 2h1v1H8zM11 2h1v1h-1zM6 3h1v1H6zM7 3h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM11 3h1v1h-1zM5 4h1v1H5zM6 4h1v1H6zM7 4h1v1H7zM8 4h1v1H8zM9 4h1v1H9zM10 4h1v1h-1zM11 4h1v1h-1zM4 5h1v1H4zM5 5h1v1H5zM6 5h1v1H6zM7 5h1v1H7zM8 5h1v1H8zM9 5h1v1H9zM10 5h1v1h-1zM11 5h1v1h-1zM3 6h1v1H3zM4 6h1v1H4zM5 6h1v1H5zM6 6h1v1H6zM7 6h1v1H7zM8 6h1v1H8zM9 6h1v1H9zM10 6h1v1h-1zM11 6h1v1h-1zM12 6h1v1h-1zM2 7h1v1H2zM3 7h1v1H3zM4 7h1v1H4zM5 7h1v1H5zM6 7h1v1H6zM7 7h1v1H7zM8 7h1v1H8zM9 7h1v1H9zM10 7h1v1h-1zM11 7h1v1h-1zM12 7h1v1h-1zM13 7h1v1h-1zM3 8h1v1H3zM4 8h1v1H4zM5 8h1v1H5zM6 8h1v1H6zM7 8h1v1H7zM8 8h1v1H8zM9 8h1v1H9zM10 8h1v1h-1zM11 8h1v1h-1zM12 8h1v1h-1zM3 9h1v1H3zM4 9h1v1H4zM5 9h1v1H5zM6 9h1v1H6zM7 9h1v1H7zM8 9h1v1H8zM9 9h1v1H9zM10 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM3 10h1v1H3zM4 10h1v1H4zM5 10h1v1H5zM6 10h1v1H6zM7 10h1v1H7zM8 10h1v1H8zM9 10h1v1H9zM10 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM3 11h1v1H3zM4 11h1v1H4zM5 11h1v1H5zM6 11h1v1H6zM7 11h1v1H7zM8 11h1v1H8zM9 11h1v1H9zM10 11h1v1h-1zM11 11h1v1h-1zM12 11h1v1h-1zM3 12h1v1H3zM4 12h1v1H4zM5 12h1v1H5zM6 12h1v1H6zM7 12h1v1H7zM8 12h1v1H8zM9 12h1v1H9zM10 12h1v1h-1zM11 12h1v1h-1zM12 12h1v1h-1zM4 13h1v1H4zM5 13h1v1H5zM6 13h1v1H6zM7 13h1v1H7zM8 13h1v1H8zM9 13h1v1H9zM10 13h1v1h-1zM11 13h1v1h-1z" />
        </svg>
    )
);

HomeIcon.displayName = "Home";
export default HomeIcon;
