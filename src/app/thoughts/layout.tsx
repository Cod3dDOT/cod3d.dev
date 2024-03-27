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
		<div>
			<main className={clsx(roboto.variable, poppins.variable)}>
				{children}
			</main>
			<Footer />
		</div>
	);
}
