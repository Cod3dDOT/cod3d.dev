import { GlitchText } from '@/components/effects/glitchText';
import { Thought } from '@/lib/pocketbase/types';

import { ThoughtLink } from './thoughtLink';

type ThoughtsBodyProps = {
	thoughts: Thought[];
};

export const ThoughtsBody: React.FC<ThoughtsBodyProps> = ({ thoughts }) => {
	return (
		<>
			<h1 className="lg:text-6xl md:text-4xl text-2xl">
				Archiving thoughts
				<br />
				<span className="text-[smaller]">
					so that my brain doesn&apos;t have to...
				</span>
			</h1>
			<div className="sm:mt-48 mt-24 space-y-2">
				<h2 className="flex items-center justify-between">
					<span className="xl:text-9xl md:text-8xl sm:text-6xl text-4xl font-pixelify font-semibold bg-gradient-to-b from-foreground to-background text-transparent bg-clip-text">
						2024
					</span>
					<div className="xl:text-5xl lg:text-3xl md:text-2xl text-sm font-thin">
						<span>Those who sacrifice liberty for security</span>
						<br />
						<GlitchText text="deserve neither" as="span" />
					</div>
				</h2>

				<div>
					{thoughts.map((th) => {
						return <ThoughtLink key={th.id + '-link'} thought={th} />;
					})}
				</div>
			</div>
		</>
	);
};
