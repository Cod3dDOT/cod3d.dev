import { Thought } from '@/lib/pocketbase/types';

import { ThoughtLink } from './thoughtLink';
import { Year } from './year';

type ThoughtsBodyProps = {
	thoughts: Thought[];
};

export const ThoughtsBody: React.FC<ThoughtsBodyProps> = ({ thoughts }) => {
	return (
		<>
			<h1 className="lg:text-6xl md:text-4xl text-2xl">
				Archiving thoughts
				<br />
				<span
					className="text-[smaller] lg:text-background
    lg:[text-shadow:-1px_-1px_0_var(--foreground),1px_-1px_0_var(--foreground),-1px_1px_0_var(--foreground),1px_1px_0_var(--foreground)]"
				>
					so that my brain doesn&apos;t have to...
				</span>
			</h1>
			<div className="sm:mt-48 mt-24 space-y-16">
				<Year year={2024} memo="We will see what I come up with...">
					{thoughts
						.filter((th) => new Date(th.created).getFullYear() == 2024)
						.map((th) => {
							return <ThoughtLink key={th.id + '-link'} thought={th} />;
						})}
				</Year>
				<Year
					year={2023}
					memo="Those who sacrifice liberty for security deserve neither."
				>
					{thoughts
						.filter((th) => new Date(th.created).getFullYear() == 2023)
						.map((th) => {
							return <ThoughtLink key={th.id + '-link'} thought={th} />;
						})}
				</Year>
				<Year year={2022} memo="Winning is a curse.">
					{thoughts
						.filter((th) => new Date(th.created).getFullYear() == 2022)
						.map((th) => {
							return <ThoughtLink key={th.id + '-link'} thought={th} />;
						})}
				</Year>
			</div>
		</>
	);
};
