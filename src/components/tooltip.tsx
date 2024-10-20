interface TooltipProps {
	id: string;
	position?: 'top' | 'bottom' | 'left' | 'right';
	content: string;
	children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
	children,
	content,
	position = 'top'
}) => {
	const positionClasses = {
		top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
	};

	return (
		<div className="relative inline-block group">
			{children}

			{/* Tooltip Content */}
			<div
				id="tooltip"
				role="tooltip"
				className={`absolute invisible opacity-0 group-hover:visible group-focus-within:visible group-focus-within:opacity-100 group-hover:opacity-100
                    peer-focus:visible peer-focus:opacity-100 normal-case whitespace-nowrap
                    transition-opacity duration-200 ease-in-out p-2 text-foreground bg-background-dark border-foreground rounded shadow-lg ${positionClasses[position]}`}
			>
				{content}
			</div>
		</div>
	);
};
