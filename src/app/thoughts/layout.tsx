import { Poppins } from 'next/font/google';

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
	return children;
}
