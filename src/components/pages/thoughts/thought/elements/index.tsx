import { ClassAttributes, HTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

export type CustomElementProps = ClassAttributes<HTMLPreElement> &
	HTMLAttributes<HTMLPreElement> &
	ExtraProps;
