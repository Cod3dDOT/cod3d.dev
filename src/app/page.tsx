import Image from 'next/image';

import Blue from '@/../public/img/blue.webp';
import Yellow from '@/../public/img/yellow.webp';
import { GlitchText } from '@/components/effects/glitchText';
import { GrainyBackground } from '@/components/effects/grainyBackground';

// export const experimental_ppr = true;
export const revalidate = 3600;

export default function Home() {
	return (
		<main className="h-screen flex flex-col justify-center my-auto bg-grainy md:px-24 px-10">
			<GrainyBackground />
			<h1 className="md:text-[8rem] sm:text-[5.65rem] text-[4rem]">
				cod3d.dev
			</h1>

			<p className="whitespace-pre">
				<span>Probably trying to hack you. </span>
				<br className="sm:hidden" />
				<span>Or sleeping.</span>
				<br />
				<GlitchText as="span" text="Or both." />
			</p>

			<div className="absolute inset-0 right-0 -z-10 overflow-hidden flex lg:justify-center lg:items-center">
				<div
					className="relative h-full aspect-square sm:ml-auto min-h-[62rem]
                    animate-spin [animation-duration:32s]
                    sm:*:h-[42rem] sm:*:w-[42rem] *:h-[35rem] *:w-[35rem]"
				>
					<Image
						priority
						src={Blue}
						width={32}
						height={32}
						alt="Blue blob"
						className="absolute -left-16 -top-16"
						style={{
							color: '' // This is required to prevent the inline style of `next/image`
						}}
					/>
					<Image
						src={Yellow}
						width={32}
						height={32}
						alt="Yellow blob"
						className="absolute -right-16 -bottom-16"
						style={{
							color: '' // This is required to prevent the inline style of `next/image`
						}}
					/>
				</div>
			</div>
		</main>
	);
}
