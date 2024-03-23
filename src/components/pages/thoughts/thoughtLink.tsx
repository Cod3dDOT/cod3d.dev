import Link from 'next/link';

import { Thought } from '@/lib/pocketbase/types';

export const ThoughtLink: React.FC<{ thought: Thought }> = ({ thought }) => {
	return (
		<Link
			href={'/thoughts/' + thought.slug}
			className="block py-4 border-b-2 border-foreground"
		>
			<p>{thought.name}</p>
		</Link>
	);
};
