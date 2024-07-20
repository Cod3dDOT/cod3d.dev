'use client';

import { ClassAttributes, HTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

type Props = ClassAttributes<HTMLHeadingElement> &
	HTMLAttributes<HTMLHeadingElement> &
	ExtraProps;

export const MarkdownTitle: React.FC<Props> = ({ children }) => (
	<h1 className="relative bg-gradient-to-br from-foreground via-foreground to-background bg-clip-text text-transparent">
		{children}
	</h1>
);
