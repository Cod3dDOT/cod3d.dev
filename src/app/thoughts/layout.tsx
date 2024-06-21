import { clsx } from 'clsx';
import { Poppins, Roboto } from 'next/font/google';

import { Footer } from '@/components/footer';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	display: 'swap',
	variable: '--font-roboto'
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	display: 'swap',
	variable: '--font-poppins'
});

export default function ThoughtsLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main
				className={clsx(
					roboto.variable,
					poppins.variable,
					'relative bg-background md:px-24 px-10'
				)}
			>
				{children}
			</main>
			<Footer />
		</>
	);
}
