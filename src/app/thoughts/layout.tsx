import { clsx } from 'clsx';
import { Roboto } from 'next/font/google';

import { Footer } from '@/components/footer';

const font = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	display: 'swap',
	variable: '--font-roboto'
});

export default function ThoughtsLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="overflow-hidden">
			<section
				className={clsx(
					font.variable,
					'font-roboto container mx-auto sm:py-64 py-24 pl-4 sm:pr-16 pr-12'
				)}
			>
				{children}
			</section>
			<Footer />
		</div>
	);
}
