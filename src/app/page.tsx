import Image from 'next/image';

import Blue from '@/../public/blue.webp';
import Yellow from '@/../public/yellow.webp';
import { GlitchText } from '@/components/effects/glitchText';

export default function Home() {
	return (
		<main className="h-full flex flex-col justify-center my-auto md:pl-24 sm:pl-16 pl-8">
			<h1>cod3d.dev</h1>

			<p className="whitespace-pre">
				<span>Probably trying to hack you. </span>
				<br className="sm:hidden" />
				<span>Or sleeping.</span>
				<br />
				<GlitchText as="span" text="Or both." />
			</p>

			<div className="absolute inset-0 right-0 -z-10 overflow-hidden">
				<div
					className="relative h-full aspect-square sm:ml-auto
                    animate-spin [animation-duration:32s]
                    sm:*:h-[42rem] sm:*:w-[42rem] *:h-[35rem] *:w-[35rem]"
				>
					<Image
						priority
						src={Blue}
						width={256}
						height={256}
						alt="Blue blob"
						className="absolute -left-16 -top-16"
					/>
					<Image
						src={Yellow}
						width={256}
						height={256}
						alt="Yellow blob"
						className="absolute -right-16 -bottom-16"
					/>
				</div>
			</div>
		</main>
	);
}
