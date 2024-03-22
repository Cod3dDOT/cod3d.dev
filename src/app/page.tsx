import Image from 'next/image';

import Blue from '@/../public/blue.png';
import Yellow from '@/../public/yellow.png';
import { GlitchText } from '@/components/glitchText';

export default function Home() {
	return (
		<main className="flex h-screen flex-col justify-center lg:px-24 px-16">
			<h1 className="lg:mb-8 md:mb-6 mb-4">cod3d.dev</h1>
			<p className="whitespace-pre">
				<span>Probably trying to hack you. </span>
				<br className="sm:hidden" />
				<span>Or sleeping.</span>
			</p>
			<GlitchText as="p" text="Or both." />
			<div className="absolute inset-0 right-0 -z-10 overflow-hidden">
				<div
					className="animate-spin [animation-duration:32s] relative h-full aspect-square ml-32 sm:ml-auto
                sm:*:h-[42rem] sm:*:w-[42rem] *:h-[35rem] *:w-[35rem]"
				>
					<Image
						src={Blue}
						alt="Blue blob"
						className="absolute -left-16 -top-16"
					/>
					<Image
						src={Yellow}
						alt="Yellow blob"
						className="absolute -right-16 -bottom-16"
					/>
				</div>
			</div>
		</main>
	);
}
